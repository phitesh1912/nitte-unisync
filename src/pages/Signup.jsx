import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  onAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
  signOut
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
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

    const handleUser = async (user) => {
      if (!user) {
        if (mounted) setChecking(false);
        return;
      }
      try {
        const ref = doc(db, 'users', user.uid);
        const snapshot = await getDoc(ref);
        const profileComplete = snapshot.exists() && snapshot.data()?.profileComplete === true;
        if (mounted) navigate(profileComplete ? '/app' : '/onboarding', { replace: true });
      } catch (err) {
        console.error('Auth check failed:', err);
        if (mounted) setChecking(false);
      }
    };

    getRedirectResult(au)
      .then(async (result) => {
        if (!mounted) return;

        if (result?.user) {
          const user = result.user;
          if (!isNmitEmail(user?.email)) {
            await signOut(au);
            if (mounted) {
              setError('Only @nmit.ac.in accounts are allowed.');
              setChecking(false);
            }
            return;
          }
          const ref = doc(db, 'users', user.uid);
          await setDoc(ref, {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            photo: user.photoURL,
            lastLogin: serverTimestamp(),
          }, { merge: true });
        }

        const unsubscribe = onAuthStateChanged(au, handleUser);
        return () => unsubscribe();
      })
      .catch((err) => {
        console.error('Redirect error:', err);
        if (mounted) {
          setError(`Login failed (${err?.code}). Please try again.`);
          setChecking(false);
        }
      });

    return () => { mounted = false; };
  }, [navigate]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithRedirect(au, g);
    } catch (err) {
      console.error('Redirect failed:', err);
      setError(`Login failed (${err?.code}). Please try again.`);
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

        <button type="button" className="auth-secondary-btn" onClick={() => navigate('/')} disabled={loading}>
          Back to walkthrough
        </button>
      </div>
    </div>
  );
}