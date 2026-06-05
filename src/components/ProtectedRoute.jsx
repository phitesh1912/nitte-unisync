import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { au, db } from '../firebase.js';

export default function ProtectedRoute({ children }) {
  const [state, setState] = useState({ loading: true, user: null, profileComplete: null });

  useEffect(() => {
    let isMounted = true;

    // Give Firebase time to restore session after redirect
    const unsubscribe = onAuthStateChanged(au, async (user) => {
      if (!isMounted) return;

      if (!user) {
        // Wait briefly in case session is still being restored
        setTimeout(() => {
          if (!isMounted) return;
          setState({ loading: false, user: null, profileComplete: null });
        }, 2000);
        return;
      }

      try {
        const ref = doc(db, 'users', user.uid);
        const snapshot = await getDoc(ref);
        const profileComplete = snapshot.exists() && snapshot.data()?.profileComplete === true;
        if (!isMounted) return;
        setState({ loading: false, user, profileComplete });
      } catch (error) {
        console.error('ProtectedRoute profile check failed:', error);
        if (!isMounted) return;
        setState({ loading: false, user, profileComplete: false });
      }
    });

    return () => { isMounted = false; unsubscribe(); };
  }, []);

  if (state.loading) {
    return <div className="state-loading">Loading your experience…</div>;
  }

  if (!state.user) {
    return <Navigate to="/" replace />;
  }

  if (!state.profileComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}