import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { au, db } from '../firebase.js';

export default function Walkthrough() {
	const navigate = useNavigate();
	const [activeIndex, setActiveIndex] = useState(0);
	const [checking, setChecking] = useState(true);

	const slides = useMemo(
		() => [
			{
				title: 'Stay on top of campus life',
				subtitle: 'Everything you need, right where you expect it.',
				features: [
					{ icon: '🏠', name: 'Home', desc: 'Daily snapshot with KPIs and quick actions.' },
					{ icon: '📣', name: 'Announcements', desc: 'Live updates for deadlines and alerts.' },
					{ icon: '📅', name: 'Events', desc: 'Track registrations, sessions, and reminders.' },
				],
			},
			{
				title: 'Explore, connect, and discover',
				subtitle: 'Campus communities and social tools, curated for you.',
				features: [
					{ icon: '🤝', name: 'Partner Up', desc: 'Find peers for projects and study goals.' },
					{ icon: '🧭', name: 'Travel', desc: 'Coordinate hometown trips and carpools.' },
					{ icon: '✨', name: 'Discover', desc: 'Find opportunities across campus hubs.' },
					{ icon: '🎯', name: 'Clubs', desc: 'Navigate clubs, roles, and recruitment.' },
					{ icon: '🎬', name: 'Entertainment', desc: 'Personalized content for study breaks.' },
				],
			},
			{
				title: 'Plan your days with confidence',
				subtitle: 'Personal tools to stay focused and balanced.',
				features: [
					{ icon: '✅', name: 'To-Do', desc: 'Organize tasks across daily and yearly goals.' },
					{ icon: '💚', name: 'Well-being', desc: 'Build habits with smart reminders.' },
					{ icon: '👤', name: 'Profile', desc: 'Keep your campus profile up to date.' },
				],
			},
		],
		[]
	);

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
			} catch (error) {
				console.error('Walkthrough profile check failed:', error);
				setChecking(false);
			}
		});

		return () => {
			mounted = false;
			unsubscribe();
		};
	}, [navigate]);

	const handleNext = () => {
		if (activeIndex < slides.length - 1) {
			setActiveIndex((prev) => prev + 1);
		} else {
			navigate('/signup');
		}
	};

	const handleSkip = () => {
		navigate('/signup');
	};

	if (checking) {
		return (
			<div className="preentry-shell">
				<div className="content-card state-loading">Loading your experience…</div>
			</div>
		);
	}

	return (
		<div className="preentry-shell">
			<div className="content-card walkthrough-card">
				<button type="button" className="walkthrough-skip" onClick={handleSkip}>
					Skip
				</button>

				<div className="walkthrough-slider">
					<div
						className="walkthrough-track"
						style={{ transform: `translateX(-${activeIndex * 100}%)` }}
					>
						{slides.map((slide, index) => (
							<section className="walkthrough-slide" key={slide.title} aria-hidden={index !== activeIndex}>
								<div className="walkthrough-head">
									<span className="trust-badge">Campus companion</span>
									<h2>{slide.title}</h2>
									<p className="walkthrough-subtitle">{slide.subtitle}</p>
								</div>

								<div className="walkthrough-grid">
									{slide.features.map((feature) => (
										<article className="walkthrough-feature" key={feature.name}>
											<div className="walkthrough-icon" aria-hidden="true">{feature.icon}</div>
											<div>
												<h4>{feature.name}</h4>
												<p>{feature.desc}</p>
											</div>
										</article>
									))}
								</div>
							</section>
						))}
					</div>
				</div>

				<div className="walkthrough-footer">
					<div className="walkthrough-dots" role="tablist" aria-label="Walkthrough progress">
						{slides.map((_, index) => (
							<button
								key={`dot-${index}`}
								type="button"
								className={`walkthrough-dot ${index === activeIndex ? 'active' : ''}`}
								onClick={() => setActiveIndex(index)}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>

					<button type="button" onClick={handleNext}>
						{activeIndex === slides.length - 1 ? 'Get Started' : 'Next'}
					</button>
				</div>
			</div>
		</div>
	);
}
