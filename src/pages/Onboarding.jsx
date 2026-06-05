import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { doc, getDoc, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { au, db } from '../firebase.js';

const initialForm = {
	fullName: '',
	bio: '',
	photo: '',
	branch: '',
	year: '',
	usn: '',
	hometownCity: '',
	hometownState: '',
	travelFrequency: [],
	travelModes: [],
};

export default function Onboarding() {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [step, setStep] = useState(1);
	const [checking, setChecking] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState('');
	const [photoPreview, setPhotoPreview] = useState('');
	const [form, setForm] = useState(initialForm);

	const branchOptions = useMemo(
		() => [
			'CSE', 'CSBS', 'CSDS', 'AIML', 'AIDS', 'ISE',
			'Mechanical', 'Civil', 'Aeronautical', 'EEE', 'ECE', 'VLSI',
		],
		[]
	);

	const yearOptions = useMemo(() => ['1', '2', '3', '4'], []);
	const travelFrequencyOptions = useMemo(
		() => ['Weekly', 'Monthly', 'Each semester', 'Only during breaks', 'Rarely'],
		[]
	);
	const travelModeOptions = useMemo(
		() => ['Bus', 'Train', 'Carpool', 'Metro', 'Flight'],
		[]
	);

	useEffect(() => {
		let mounted = true;

		const unsubscribe = onAuthStateChanged(au, async (currentUser) => {
			if (!mounted) return;

			if (!currentUser) {
				navigate('/signup', { replace: true });
				return;
			}

			try {
				const ref = doc(db, 'users', currentUser.uid);
				const snapshot = await getDoc(ref);
				const data = snapshot.exists() ? snapshot.data() : {};

				if (data.profileComplete === true) {
					navigate('/app', { replace: true });
					return;
				}

				const nextForm = {
					...initialForm,
					fullName: data.name || currentUser.displayName || '',
					bio: data.bio || '',
					photo: data.photo || currentUser.photoURL || '',
					branch: data.branch || '',
					year: data.year ? String(data.year) : '',
					usn: data.usn || '',
					hometownCity: data.hometownCity || data.city || '',
					hometownState: data.hometownState || data.state || '',
					travelFrequency: Array.isArray(data.travelFrequency) ? data.travelFrequency : [],
					travelModes: Array.isArray(data.travelModes) ? data.travelModes : [],
				};

				setUser(currentUser);
				setForm(nextForm);
				setPhotoPreview(nextForm.photo || '');
				setChecking(false);
			} catch (err) {
				console.error('Onboarding load failed:', err);
				setChecking(false);
			}
		});

		return () => {
			mounted = false;
			unsubscribe();
		};
	}, [navigate]);

	const updateField = (field) => (event) => {
		setForm((prev) => ({ ...prev, [field]: event.target.value }));
	};

	const toggleArrayValue = (field, value) => {
		setForm((prev) => {
			const current = new Set(prev[field]);
			if (current.has(value)) {
				current.delete(value);
			} else {
				current.add(value);
			}
			return { ...prev, [field]: Array.from(current) };
		});
	};

	const handlePhotoUpload = (event) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = () => {
			const dataUrl = reader.result?.toString() || '';
			setPhotoPreview(dataUrl);
			setForm((prev) => ({ ...prev, photo: dataUrl }));
		};
		reader.readAsDataURL(file);
	};

	const handleNext = () => {
		setError('');
		setStep((prev) => Math.min(3, prev + 1));
	};

	const handleBack = () => {
		setError('');
		setStep((prev) => Math.max(1, prev - 1));
	};

	const handleFinish = async () => {
		setError('');

		if (!form.fullName || !form.branch || !form.year || !form.usn || !form.hometownCity || !form.hometownState) {
			setError('Please complete all required fields before finishing.');
			return;
		}

		if (!user) return;

		setSaving(true);

		try {
			const ref = doc(db, 'users', user.uid);
			await setDoc(
				ref,
				{
					uid: user.uid,
					email: user.email,
					name: form.fullName,
					bio: form.bio,
					photo: form.photo || user.photoURL || '',
					branch: form.branch,
					year: form.year,
					usn: form.usn,
					hometownCity: form.hometownCity,
					hometownState: form.hometownState,
					travelFrequency: form.travelFrequency,
					travelModes: form.travelModes,
					profileComplete: true,
					updatedAt: serverTimestamp(),
				},
				{ merge: true }
			);

			navigate('/app', { replace: true });
		} catch (err) {
			console.error('Onboarding save failed:', err);
			setError('Could not save your profile. Please try again.');
		} finally {
			setSaving(false);
		}
	};

	if (checking) {
		return (
			<div className="preentry-shell">
				<div className="content-card state-loading">Loading your profile…</div>
			</div>
		);
	}

	const progressWidth = `${(step / 3) * 100}%`;

	return (
		<div className="preentry-shell">
			<div className="content-card onboard-card">
				<div className="onboard-shell">
					<div className="onboard-head">
						<span className="onboard-step-counter">Step {step} of 3</span>
						<div className="onboard-progress" aria-hidden="true">
							<span style={{ width: progressWidth }} />
						</div>
					</div>

					<h3 className="onboard-question">
						{step === 1 && 'Personal details'}
						{step === 2 && 'Academic details'}
						{step === 3 && 'Hometown & travel'}
					</h3>

					{error && <div className="state-error">{error}</div>}

					<div className={`onboard-step ${step === 1 ? 'active' : ''}`}>
						<div className="onboard-profile">
							<div className="onboard-avatar">
								{photoPreview ? (
									<img src={photoPreview} alt="Profile preview" />
								) : (
									<span>Upload</span>
								)}
							</div>
							<div className="onboard-upload">
								<label className="onboard-upload-label">
									Profile photo
									<input type="file" accept="image/*" onChange={handlePhotoUpload} />
								</label>
								<small>Optional · JPG or PNG under 2MB is best.</small>
							</div>
						</div>

						<div className="stack-form">
							<label>
								Full name
								<input type="text" value={form.fullName} onChange={updateField('fullName')} placeholder="Your full name" />
							</label>

							<label>
								Bio
								<textarea value={form.bio} onChange={updateField('bio')} placeholder="A quick one-liner about you" />
							</label>
						</div>
					</div>

					<div className={`onboard-step ${step === 2 ? 'active' : ''}`}>
						<div className="stack-form">
							<label>
								Branch
								<select value={form.branch} onChange={updateField('branch')}>
									<option value="" disabled>Select branch</option>
									{branchOptions.map((branch) => (
										<option key={branch} value={branch}>{branch}</option>
									))}
								</select>
							</label>

							<div>
								<p className="field-label">Year</p>
								<div className="chip-row">
									{yearOptions.map((year) => (
										<button
											key={year}
											type="button"
											className={`preset-chip ${form.year === year ? 'active' : ''}`}
											onClick={() => setForm((prev) => ({ ...prev, year }))}
										>
											{year} Year
										</button>
									))}
								</div>
							</div>

							<label>
								USN
								<input type="text" value={form.usn} onChange={updateField('usn')} placeholder="e.g., 1NT20CS001" />
							</label>
						</div>
					</div>

					<div className={`onboard-step ${step === 3 ? 'active' : ''}`}>
						<div className="stack-form">
							<label>
								Hometown city
								<input type="text" value={form.hometownCity} onChange={updateField('hometownCity')} placeholder="City" />
							</label>

							<label>
								State
								<input type="text" value={form.hometownState} onChange={updateField('hometownState')} placeholder="State" />
							</label>

							<div>
								<p className="field-label">Travel frequency</p>
								<div className="chip-row">
									{travelFrequencyOptions.map((option) => (
										<button
											key={option}
											type="button"
											className={`preset-chip ${form.travelFrequency.includes(option) ? 'active' : ''}`}
											onClick={() => toggleArrayValue('travelFrequency', option)}
										>
											{option}
										</button>
									))}
								</div>
							</div>

							<div>
								<p className="field-label">Travel mode</p>
								<div className="chip-row">
									{travelModeOptions.map((option) => (
										<button
											key={option}
											type="button"
											className={`preset-chip ${form.travelModes.includes(option) ? 'active' : ''}`}
											onClick={() => toggleArrayValue('travelModes', option)}
										>
											{option}
										</button>
									))}
								</div>
							</div>
						</div>
					</div>

					<div className="onboard-controls">
						<button type="button" className="auth-secondary-btn" onClick={handleBack} disabled={step === 1 || saving}>
							Back
						</button>

						{step < 3 ? (
							<button type="button" onClick={handleNext} disabled={saving}>
								Next
							</button>
						) : (
							<button type="button" onClick={handleFinish} disabled={saving}>
								{saving ? 'Saving…' : 'Finish & Enter App'}
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
