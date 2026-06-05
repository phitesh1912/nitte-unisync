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

  // ✅ Handle redirect result when user comes back after Google login
  useEffect(() => {
    getRedirectResult(au)
      .then(async (result) => {
        if (!result) return; // no redirect in progress

        const user = result.user;

        if (!isNmitEmail(user?.email)) {
          await signOut(au);
          setError('Only @nmit.ac.in accounts are allowed.');
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

        const snapshot = await getDoc(ref);
        const profileComplete = snapshot.exists() && snapshot.data()?.profileComplete === true;
        navigate(profileComplete ? '/app' : '/onboarding', { replace: true });
      })
      .catch((err) => {
        console.error('Redirect result error:', err);
        setError(`Login failed (${err?.code}). Please try again.`);
      });
  }, [navigate]);

  // ✅ Existing session check (unchanged)
  useEffect(() => {
    let mounted = true;
    const unsubscribe = onAuthStateChanged(au, async (user) => {
      if (!mounted) return;
      if (!user) { setChecking(false); return; }

      try {
        const ref = doc(db, 'users', user.uid);
        const snapshot = await getDoc(ref);
        const profileComplete = snapshot.exists() && snapshot.data()?.profileComplete === true;
        navigate(profileComplete ? '/app' : '/onboarding', { replace: true });
      } catch (err) {
        console.error('Auth check failed:', err);
        setChecking(false);
      }
    });

    return () => { mounted = false; unsubscribe(); };
  }, [navigate]);

  // ✅ Now uses redirect instead of popup
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithRedirect(au, g);
      // page will redirect to Google, then come back
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