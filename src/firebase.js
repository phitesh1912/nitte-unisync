import { initializeApp }          from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore }            from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔒 Prefer env vars via Vite (.env) for production deployments.
const env = import.meta.env || {};

const firebaseConfig = {
  apiKey:            env.VITE_FIREBASE_API_KEY || "AIzaSyBK45OsFP1gu3VEpUPFbcFzwZoZv0fvzyw",
  git authDomain:        "nitte-unisync.vercel.app",
  projectId:         env.VITE_FIREBASE_PROJECT_ID || "nitte-connect-b6913",
  storageBucket:     env.VITE_FIREBASE_STORAGE_BUCKET || "nitte-connect-b6913.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "53232594967",
  appId:             env.VITE_FIREBASE_APP_ID || "1:53232594967:web:bdc115c63f6eae7e97ac52"
};

const app = initializeApp(firebaseConfig);

export const au = getAuth(app);
export const db = getFirestore(app);
export const g  = new GoogleAuthProvider();
g.setCustomParameters({
  hd: 'nmit.ac.in',
  prompt: 'select_account'
});