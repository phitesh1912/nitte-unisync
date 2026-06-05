import { onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc, setDoc, deleteField, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { au, db } from "../../firebase.js";
import { updateCurrentUser } from "./auth.js";

const DEFAULTS = {
  name: 'Your Name',
  branch: 'Computer Science',
  year: '3rd Year',
  city: '--',
  state: '--',
  bio: 'Bio: Loves coding and anime 🚀'
};

let currentUid = null;
let authUser = null;

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setValue(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value ?? '';
}

function applyProfile(profile = {}) {
  const name = profile.name || authUser?.displayName || DEFAULTS.name;
  const branch = profile.branch || DEFAULTS.branch;
  const year = profile.year ? String(profile.year) : DEFAULTS.year;
  const city = profile.city || DEFAULTS.city;
  const state = profile.state || DEFAULTS.state;
  const bio = profile.bio ? `Bio: ${profile.bio}` : DEFAULTS.bio;
  const photo = profile.photo || authUser?.photoURL || '/assets/profile-placeholder.svg';

  const photoEl = document.getElementById('student-photo');
  if (photoEl) photoEl.src = photo;

  setText('student-name', name);
  setText('student-branch', `Branch: ${branch}`);
  setText('student-year', `Year: ${year}`);
  setText('student-city', `City: ${city}`);
  setText('student-state', `State: ${state}`);
  setText('student-bio', bio);
}

function resetProfileUI() {
  const photoEl = document.getElementById('student-photo');
  if (photoEl) photoEl.src = '/assets/profile-placeholder.svg';

  setText('student-name', DEFAULTS.name);
  setText('student-branch', `Branch: ${DEFAULTS.branch}`);
  setText('student-year', `Year: ${DEFAULTS.year}`);
  setText('student-city', `City: ${DEFAULTS.city}`);
  setText('student-state', `State: ${DEFAULTS.state}`);
  setText('student-bio', DEFAULTS.bio);
}

function setFormValues(profile = {}) {
  setValue('name-input', profile.name || authUser?.displayName || '');
  setValue('branch-input', profile.branch || '');
  setValue('year-input', profile.year ?? '');
  setValue('city-input', profile.city || '');
  setValue('state-input', profile.state || '');
  setValue('photo-input', profile.photo || authUser?.photoURL || '');
  setValue('bio-input', profile.bio || '');
}

function buildProfileFromForm() {
  const name = document.getElementById('name-input')?.value.trim() || '';
  const branch = document.getElementById('branch-input')?.value || '';
  const yearValue = document.getElementById('year-input')?.value || '';
  const yearParsed = yearValue ? parseInt(yearValue, 10) : null;
  const year = Number.isNaN(yearParsed) ? null : yearParsed;
  const city = document.getElementById('city-input')?.value.trim() || '';
  const state = document.getElementById('state-input')?.value.trim() || '';
  const photo = document.getElementById('photo-input')?.value.trim() || '';
  const bio = document.getElementById('bio-input')?.value.trim() || '';

  return { name, branch, year, city, state, photo, bio };
}

function buildUpdatePayload(values) {
  const payload = {};
  Object.entries(values).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      payload[key] = deleteField();
      return;
    }
    payload[key] = value;
  });
  payload.updatedAt = serverTimestamp();
  return payload;
}

function buildCurrentUserPatch(values) {
  const patch = {};
  Object.entries(values).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') return;
    patch[key] = value;
  });
  return patch;
}

async function loadProfile(uid) {
  const ref = doc(db, 'users', uid);
  const snapshot = await getDoc(ref);
  const data = snapshot.exists() ? snapshot.data() : {};
  applyProfile(data);
  setFormValues(data);
}

async function saveProfile(values) {
  if (!currentUid) {
    alert('Please login to save your profile.');
    return;
  }

  const ref = doc(db, 'users', currentUid);
  const payload = buildUpdatePayload(values);
  await setDoc(ref, payload, { merge: true });

  updateCurrentUser(buildCurrentUserPatch(values));
  applyProfile(values);
}

async function resetProfile() {
  if (!currentUid) {
    resetProfileUI();
    setFormValues({});
    return;
  }

  const resetValues = {
    name: '',
    branch: '',
    year: null,
    city: '',
    state: '',
    photo: '',
    bio: ''
  };

  const ref = doc(db, 'users', currentUid);
  await setDoc(ref, buildUpdatePayload(resetValues), { merge: true });
  updateCurrentUser({});
  resetProfileUI();
  setFormValues({});
  alert('Profile reset!');
}

export function initProfile() {
  const form = document.getElementById('profile-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const values = buildProfileFromForm();
      await saveProfile(values);
    });
  }

  const resetBtn = document.getElementById('reset-profile');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resetProfile();
    });
  }

  onAuthStateChanged(au, async (firebaseUser) => {
    authUser = firebaseUser || null;
    if (!firebaseUser) {
      currentUid = null;
      resetProfileUI();
      setFormValues({});
      return;
    }

    currentUid = firebaseUser.uid;
    await loadProfile(firebaseUser.uid);
  });
}