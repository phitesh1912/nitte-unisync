import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signInWithPopup, signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { doc, getDoc, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { au, db, g } from '../firebase.js';

function isNmitEmail(email) {
	return String(email || '').toLowerCase().endsWith('@nmit.ac.in');
}

export default function Signup() {
	const navigate = useNavigate();
	const [checking, setChecking] = useState(true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		let mounted = true;
		const unsubscribe = onAuthStateChanged(au, async (user) => {
			if (!mounted) return;

			if (!user) {
				setChecking(false);
				return;
			}

			try {
				const ref = doc(db, 'users', user.uid);
				const snapshot = await getDoc(ref);
				const profileComplete = snapshot.exists() && snapshot.data()?.profileComplete === true;
				navigate(profileComplete ? '/app' : '/onboarding', { replace: true });
			} catch (err) {
				console.error('Signup auth check failed:', err);
				setChecking(false);
			}
		});

		return () => {
			mounted = false;
			unsubscribe();
		};
	}, [navigate]);

	const handleGoogleLogin = async () => {
		setLoading(true);
		setError('');

		try {
			const result = await signInWithPopup(au, g);
			const user = result.user;

			if (!isNmitEmail(user?.email)) {
				await signOut(au);
				setError('Only @nmit.ac.in accounts are allowed.');
				setLoading(false);
				return;
			}

			const ref = doc(db, 'users', user.uid);
			await setDoc(
				ref,
				{
					uid: user.uid,
					email: user.email,
					name: user.displayName,
					photo: user.photoURL,
					lastLogin: serverTimestamp(),
				},
				{ merge: true }
			);

			const snapshot = await getDoc(ref);
			const profileComplete = snapshot.exists() && snapshot.data()?.profileComplete === true;
			navigate(profileComplete ? '/app' : '/onboarding', { replace: true });
		} catch (err) {
			if (err?.code !== 'auth/popup-closed-by-user') {
				console.error('Google login failed:', err);
				const code = err?.code || 'unknown-error';
				if (code === 'auth/unauthorized-domain') {
					setError('Login failed: unauthorized domain. Add localhost to Firebase Auth → Authorized domains.');
				} else if (code === 'auth/operation-not-allowed') {
					setError('Login failed: Google provider is disabled in Firebase Auth.');
				} else if (code === 'auth/popup-blocked') {
					setError('Login failed: popup blocked. Allow popups and try again.');
				} else {
					setError(`Login failed (${code}). Please try again.`);
				}
			}
		} finally {
			setLoading(false);
		}
	};

	if (checking) {
		return (
			<div className="preentry-shell">
				<div className="content-card state-loading">Checking your session…</div>
			</div>
		);
	}

	return (
		<div className="preentry-shell">
			<div className="content-card signup-card">
				<div className="signup-head">
					<span className="trust-badge">NMIT domain only</span>
					<h2>Sign in to continue</h2>
					<p>Use your campus Google account to unlock the full experience.</p>
				</div>

				{error && <div className="state-error">{error}</div>}

				<button type="button" onClick={handleGoogleLogin} disabled={loading}>
					{loading ? 'Connecting…' : 'Continue with Google'}
				</button>

				<button type="button" className="auth-secondary-btn" onClick={() => navigate('/')}
					disabled={loading}
				>
					Back to walkthrough
				</button>
			</div>
		</div>
	);
}
