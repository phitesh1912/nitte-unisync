import { signInWithPopup, signOut, onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc, setDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { au, g, db } from "../../firebase.js";

// ─── In-memory current user (use this everywhere instead of localStorage) ───
let _currentUser = null;
let _greetingUser = null;
let _greetingInterval = null;

const GREETING_INTERVAL_MS = 60 * 1000;

function isNmitEmail(email) {
  return String(email || '').toLowerCase().endsWith('@nmit.ac.in');
}

export function getCurrentUser() {
  return _currentUser;
}

export function hasRole(role) {
  return _currentUser?.role === role;
}

export function updateCurrentUser(patch = {}) {
  if (!_currentUser || !patch || typeof patch !== 'object') return;
  _currentUser = { ..._currentUser, ...patch };
}

function getPreferredName(firebaseUser) {
  const fullName = (firebaseUser?.displayName || _currentUser?.name || '').trim();
  if (!fullName) return '';
  return fullName.split(' ')[0];
}

function getTimeBasedGreeting(now = new Date()) {
  const minutes = now.getHours() * 60 + now.getMinutes();

  if (minutes >= 5 * 60 && minutes < 12 * 60) return 'Good morning';
  if (minutes >= 12 * 60 && minutes < 16 * 60 + 30) return 'Good afternoon';
  if (minutes >= 16 * 60 + 30 && minutes < 19 * 60 + 30) return 'Good evening';
  return 'Hi';
}

function renderTopbarGreeting() {
  const topbarGreeting = document.getElementById('topbar-greeting');
  if (!topbarGreeting) return;

  const name = getPreferredName(_greetingUser);
  const greeting = getTimeBasedGreeting();
  topbarGreeting.textContent = name ? `${greeting}, ${name} 👋` : `${greeting} 👋`;
}

function ensureGreetingTicker() {
  if (_greetingInterval) return;
  _greetingInterval = setInterval(renderTopbarGreeting, GREETING_INTERVAL_MS);
}

// ─── Role gating ─────────────────────────────────────────────────────────────
function applyRoleGating(role) {
  document.querySelectorAll("[data-role='student-only']").forEach(el => {
    el.style.display = role === "faculty" ? "none" : "";
  });
  document.querySelectorAll("[data-role='faculty-only']").forEach(el => {
    el.style.display = role === "faculty" ? "" : "none";
  });
}

// ─── Onboarding modal (shown once on first login) ────────────────────────────
function showOnboardingModal(user, onComplete) {
  // Remove if already exists
  document.getElementById("onboarding-modal")?.remove();

  const overlay = document.createElement("div");
  overlay.id = "onboarding-modal";
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.7);
    display:flex;align-items:center;justify-content:center;z-index:9999;
  `;

  overlay.innerHTML = `
    <div style="background:#1e1e2e;border-radius:16px;padding:2rem;width:90%;max-width:420px;
                border:1px solid rgba(255,255,255,0.1);color:#fff;">
      <h2 style="margin:0 0 0.25rem;font-size:1.4rem;">Welcome to NITTE Connect 👋</h2>
      <p style="margin:0 0 1.5rem;color:#aaa;font-size:0.9rem;">
        Hi ${user.displayName?.split(" ")[0] || "there"}! Just a few details to personalise your experience.
      </p>

      <label style="display:block;margin-bottom:1rem;">
        <span style="font-size:0.85rem;color:#aaa;">I am a</span>
        <select id="ob-role" style="display:block;width:100%;margin-top:4px;padding:10px;
          border-radius:8px;border:1px solid #444;background:#2a2a3e;color:#fff;font-size:1rem;">
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
      </label>

      <div id="ob-student-fields">
        <label style="display:block;margin-bottom:1rem;">
          <span style="font-size:0.85rem;color:#aaa;">Year</span>
          <select id="ob-year" style="display:block;width:100%;margin-top:4px;padding:10px;
            border-radius:8px;border:1px solid #444;background:#2a2a3e;color:#fff;font-size:1rem;">
            <option value="">Select year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </label>

        <label style="display:block;margin-bottom:1.5rem;">
          <span style="font-size:0.85rem;color:#aaa;">Branch</span>
          <select id="ob-branch" style="display:block;width:100%;margin-top:4px;padding:10px;
            border-radius:8px;border:1px solid #444;background:#2a2a3e;color:#fff;font-size:1rem;">
            <option value="">Select branch</option>
            <option value="CSE">CSE</option>
            <option value="CSBS">CSBS</option>
            <option value="CSDS">CSDS</option>
            <option value="AIML">AIML</option>
            <option value="AIDS">AIDS</option>
            <option value="ISE">ISE</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
            <option value="Aeronautical">Aeronautical</option>
            <option value="EEE">EEE</option>
            <option value="ECE">ECE</option>
            <option value="VLSI">VLSI</option>
          </select>
        </label>
      </div>

      <p id="ob-error" style="color:#ff6b6b;font-size:0.85rem;margin:0 0 1rem;display:none;"></p>

      <button id="ob-submit" style="width:100%;padding:12px;border-radius:8px;border:none;
        background:#6c63ff;color:#fff;font-size:1rem;cursor:pointer;font-weight:600;">
        Let's go →
      </button>
    </div>
  `;

  document.body.appendChild(overlay);

  // Hide student fields if faculty selected
  const roleSelect = overlay.querySelector("#ob-role");
  const studentFields = overlay.querySelector("#ob-student-fields");
  roleSelect.addEventListener("change", () => {
    studentFields.style.display = roleSelect.value === "faculty" ? "none" : "block";
  });

  // Submit
  overlay.querySelector("#ob-submit").addEventListener("click", async () => {
    const role   = overlay.querySelector("#ob-role").value;
    const year   = overlay.querySelector("#ob-year")?.value || null;
    const branch = overlay.querySelector("#ob-branch")?.value || null;
    const errEl  = overlay.querySelector("#ob-error");

    if (role === "student" && (!year || !branch)) {
      errEl.textContent = "Please select your year and branch.";
      errEl.style.display = "block";
      return;
    }

    errEl.style.display = "none";
    overlay.querySelector("#ob-submit").textContent = "Saving...";

    await onComplete({ role, year: year ? parseInt(year) : null, branch });
    overlay.remove();
  });
}

// ─── Save / update user in Firestore ─────────────────────────────────────────
async function saveUserToFirestore(firebaseUser, extraData = {}) {
  const ref = doc(db, "users", firebaseUser.uid);
  const data = {
    uid:       firebaseUser.uid,
    email:     firebaseUser.email,
    name:      firebaseUser.displayName,
    photo:     firebaseUser.photoURL,
    lastLogin: serverTimestamp(),
    ...extraData
  };
  await setDoc(ref, data, { merge: true });
  return data;
}

// ─── Main login function (call from your login button) ───────────────────────
export async function login() {
  try {
    const result = await signInWithPopup(au, g);
    const firebaseUser = result.user;

    if (!isNmitEmail(firebaseUser?.email)) {
      await signOut(au);
      alert("Only @nmit.ac.in accounts are allowed.");
      return;
    }

    // Check if user already has a profile in Firestore
    const ref      = doc(db, "users", firebaseUser.uid);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists() || !snapshot.data().role) {
      // First login — show onboarding
      showOnboardingModal(firebaseUser, async ({ role, year, branch }) => {
        const isSenior = role === "student" && year >= 3;
        const userData = await saveUserToFirestore(firebaseUser, {
          role, year, branch,
          isSenior,
          createdAt: serverTimestamp()
        });
        _currentUser = userData;
        applyRoleGating(role);
        updateAuthUI(firebaseUser);
      });
    } else {
      // Returning user
      const userData = snapshot.data();
      _currentUser = userData;
      applyRoleGating(userData.role);
      await saveUserToFirestore(firebaseUser); // update lastLogin only
      updateAuthUI(firebaseUser);
    }

  } catch (err) {
    if (err.code !== "auth/popup-closed-by-user") {
      console.error("Login error:", err);
      const code = err?.code || 'unknown-error';
      if (code === 'auth/unauthorized-domain') {
        alert('Login failed: unauthorized domain. Add localhost to Firebase Auth → Settings → Authorized domains.');
        return;
      }
      if (code === 'auth/operation-not-allowed') {
        alert('Login failed: Google provider is disabled. Enable it in Firebase Auth → Sign-in method.');
        return;
      }
      if (code === 'auth/popup-blocked') {
        alert('Login failed: popup blocked. Allow popups for localhost:5173 and try again.');
        return;
      }
      alert(`Login failed (${code}). Please try again.`);
    }
  }
}

// ─── Logout ───────────────────────────────────────────────────────────────────
export async function logout() {
  await signOut(au);
  _currentUser = null;
  applyRoleGating("student"); // reset UI to default
  updateAuthUI(null);
}

// ─── Update login/logout buttons in the UI ────────────────────────────────────
function updateAuthUI(firebaseUser) {
  const loginBtn  = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const userName  = document.getElementById("user-name");
  const userPhoto = document.getElementById("user-photo");
  const loginNav  = document.getElementById("nav-login");

  _greetingUser = firebaseUser || null;
  renderTopbarGreeting();
  ensureGreetingTicker();

  if (firebaseUser) {
    loginBtn?.style  && (loginBtn.style.display  = "none");
    logoutBtn?.style && (logoutBtn.style.display = "inline-block");
    if (loginNav) loginNav.style.display = "none";
    if (userName)  userName.textContent  = firebaseUser.displayName?.split(" ")[0] || "";
    if (userPhoto) userPhoto.src         = firebaseUser.photoURL || "";
  } else {
    loginBtn?.style  && (loginBtn.style.display  = "inline-block");
    logoutBtn?.style && (logoutBtn.style.display = "none");
    if (loginNav) loginNav.style.display = "flex";
    if (userName)  userName.textContent = "";
    if (userPhoto) userPhoto.src        = "";
  }
}

// ─── Init — call this once in app.js ─────────────────────────────────────────
export function initAuth() {
  // Listen for auth state changes (handles page refresh, auto-login, etc.)
  onAuthStateChanged(au, async (firebaseUser) => {
    if (!firebaseUser) {
      _currentUser = null;
      applyRoleGating("student");
      updateAuthUI(null);
      return;
    }

    if (!isNmitEmail(firebaseUser?.email)) {
      await signOut(au);
      return;
    }

    // Load user profile from Firestore
    const ref      = doc(db, "users", firebaseUser.uid);
    const snapshot = await getDoc(ref);

    if (snapshot.exists()) {
      _currentUser = snapshot.data();
      applyRoleGating(_currentUser.role);
    }

    updateAuthUI(firebaseUser);
  });
}