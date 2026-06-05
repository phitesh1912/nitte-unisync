import { getAllTasksFromStorage } from './todo.js';
import { getCurrentUser } from './auth.js';

const FOCUS_KEYS = {
  duration: 'nitteFocusDuration',
  remaining: 'nitteFocusRemainingMs',
  running: 'nitteFocusRunning',
  endsAt: 'nitteFocusEndsAt',
  sessions: 'nitteFocusSessions',
  streak: 'nitteFocusStreak',
  lastCompleted: 'nitteFocusLastCompleted'
};

const DEFAULT_DURATION_MIN = 25;
const MAX_DURATION_MIN = 120;

const focusState = {
  durationMin: DEFAULT_DURATION_MIN,
  remainingMs: DEFAULT_DURATION_MIN * 60 * 1000,
  running: false,
  endsAt: null,
  sessions: 0,
  streak: 0,
  lastCompleted: ''
};

let focusTimerId = null;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function readNumber(key, fallback) {
  const stored = localStorage.getItem(key);
  if (stored === null) return fallback;
  const raw = Number(stored);
  return Number.isFinite(raw) ? raw : fallback;
}

function readBoolean(key, fallback) {
  const raw = localStorage.getItem(key);
  if (raw === null) return fallback;
  return raw === 'true';
}

function readString(key, fallback) {
  const raw = localStorage.getItem(key);
  return raw === null ? fallback : raw;
}

function writeState() {
  localStorage.setItem(FOCUS_KEYS.duration, String(focusState.durationMin));
  localStorage.setItem(FOCUS_KEYS.remaining, String(Math.max(0, Math.round(focusState.remainingMs))));
  localStorage.setItem(FOCUS_KEYS.running, String(Boolean(focusState.running)));
  if (focusState.endsAt) {
    localStorage.setItem(FOCUS_KEYS.endsAt, String(focusState.endsAt));
  } else {
    localStorage.removeItem(FOCUS_KEYS.endsAt);
  }
  localStorage.setItem(FOCUS_KEYS.sessions, String(focusState.sessions));
  localStorage.setItem(FOCUS_KEYS.streak, String(focusState.streak));
  if (focusState.lastCompleted) {
    localStorage.setItem(FOCUS_KEYS.lastCompleted, focusState.lastCompleted);
  }
}

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function focusMetaText() {
  if (focusState.running) {
    return `Sprint running · ${formatDuration(focusState.remainingMs)} left.`;
  }
  if (focusState.remainingMs <= 0) {
    return 'Sprint complete — take a 5-minute recharge.';
  }
  return `Ready for a ${focusState.durationMin}-minute sprint.`;
}

function setPresetActive(duration) {
  const presets = document.getElementById('focus-presets');
  if (!presets) return;

  presets.querySelectorAll('[data-duration]').forEach(btn => {
    const isActive = Number(btn.dataset.duration) === duration;
    btn.classList.toggle('active', isActive);
  });
}

function updateFocusUI() {
  const timeEl = document.getElementById('focus-time');
  const metaEl = document.getElementById('focus-meta');
  const streakEl = document.getElementById('focus-streak');
  const sessionsEl = document.getElementById('focus-sessions');

  if (timeEl) timeEl.textContent = formatDuration(focusState.remainingMs);
  if (metaEl) metaEl.textContent = focusMetaText();
  if (streakEl) streakEl.textContent = String(focusState.streak);
  if (sessionsEl) sessionsEl.textContent = String(focusState.sessions);

  const startBtn = document.getElementById('focus-start');
  const pauseBtn = document.getElementById('focus-pause');

  if (startBtn) startBtn.disabled = focusState.running;
  if (pauseBtn) pauseBtn.disabled = !focusState.running;

  setPresetActive(focusState.durationMin);
}

function updateStreak() {
  const today = new Date().toDateString();
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = yesterdayDate.toDateString();

  if (focusState.lastCompleted === today) {
    return;
  }

  if (focusState.lastCompleted === yesterday) {
    focusState.streak += 1;
  } else {
    focusState.streak = 1;
  }

  focusState.lastCompleted = today;
}

function completeFocusSprint() {
  focusState.running = false;
  focusState.remainingMs = 0;
  focusState.endsAt = null;
  focusState.sessions += 1;
  updateStreak();
  writeState();
  updateFocusUI();
  updateMomentum();
}

function syncFocusClock() {
  if (!focusState.running || !focusState.endsAt) return;
  const remaining = focusState.endsAt - Date.now();
  if (remaining <= 0) {
    completeFocusSprint();
    return;
  }
  focusState.remainingMs = remaining;
}

function startTicker() {
  if (focusTimerId) return;
  focusTimerId = setInterval(() => {
    if (!focusState.running) return;
    syncFocusClock();
    updateFocusUI();
  }, 1000);
}

function startSprint() {
  if (focusState.running) return;
  if (focusState.remainingMs <= 0) {
    focusState.remainingMs = focusState.durationMin * 60 * 1000;
  }
  focusState.running = true;
  focusState.endsAt = Date.now() + focusState.remainingMs;
  writeState();
  updateFocusUI();
}

function pauseSprint() {
  if (!focusState.running) return;
  focusState.remainingMs = Math.max(0, focusState.endsAt - Date.now());
  focusState.running = false;
  focusState.endsAt = null;
  writeState();
  updateFocusUI();
}

function resetSprint() {
  focusState.running = false;
  focusState.endsAt = null;
  focusState.remainingMs = focusState.durationMin * 60 * 1000;
  writeState();
  updateFocusUI();
}

function setDuration(durationMin) {
  const safe = clamp(durationMin, 10, MAX_DURATION_MIN);
  focusState.durationMin = safe;
  focusState.running = false;
  focusState.endsAt = null;
  focusState.remainingMs = safe * 60 * 1000;
  writeState();
  updateFocusUI();
}

function renderSuggestedTasks() {
  const list = document.getElementById('focus-task-list');
  if (!list) return;

  const tasks = getAllTasksFromStorage();
  const pending = tasks.filter(task => !task.done);

  list.innerHTML = '';

  if (!pending.length) {
    const li = document.createElement('li');
    li.textContent = 'All clear. Add tasks from the To-Do board to boost focus.';
    list.appendChild(li);
    return;
  }

  pending.slice(0, 4).forEach(task => {
    const li = document.createElement('li');
    const title = document.createElement('span');
    title.textContent = task.text;
    const tag = document.createElement('small');
    tag.textContent = task.source;
    li.append(title, tag);
    list.appendChild(li);
  });
}

function safeReadJSON(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

function viewerId() {
  return getCurrentUser()?.uid || 'guest';
}

function computeWellbeingScore() {
  const water = Number(localStorage.getItem('waterCount')) || 0;
  const eye = Number(localStorage.getItem('eyeCount')) || 0;
  const posture = Number(localStorage.getItem('postureCount')) || 0;

  const waterScore = clamp(water / 8, 0, 1);
  const eyeScore = clamp(eye / 6, 0, 1);
  const postureScore = clamp(posture / 5, 0, 1);

  return Math.round(((waterScore + eyeScore + postureScore) / 3) * 100);
}

function computeCampusScore() {
  const matches = safeReadJSON('nittePartnerMatches', []);
  const matchCount = Array.isArray(matches) ? matches.length : 0;

  const connectionsByUser = safeReadJSON('nitteCompanionConnectionsByUser', {});
  const connectionCount = Array.isArray(connectionsByUser[viewerId()])
    ? connectionsByUser[viewerId()].length
    : 0;

  const carpools = safeReadJSON('nitteCarpoolPosts', []);
  const posts = Array.isArray(carpools) ? carpools : [];

  const myPosts = posts.filter(post => post?.ownerUid === viewerId()).length;
  const myJoins = posts.filter(post => Array.isArray(post?.participantIds) && post.participantIds.includes(viewerId())).length;

  return clamp(matchCount * 14 + connectionCount * 12 + myPosts * 8 + myJoins * 8, 0, 100);
}

function computeFocusScore(tasks) {
  const total = tasks.length;
  if (!total) return 60;
  const remaining = tasks.filter(task => !task.done).length;
  return Math.round(((total - remaining) / total) * 100);
}

function buildInsights({ tasks, focusScore, wellbeingScore, campusScore }) {
  const insights = [];

  if (!tasks.length) {
    insights.push('Add 1–2 tasks in To-Do to unlock focus planning.');
  }

  if (focusScore < 60) {
    insights.push('Finish one quick task to lift your focus score.');
  }

  if (wellbeingScore < 60) {
    insights.push('Log hydration or an eye break to stay sharp.');
  }

  if (campusScore < 50) {
    insights.push('Connect in Partner Up or join a Travel carpool.');
  }

  if (!insights.length) {
    insights.push('Momentum looks strong — keep the streak alive today.');
  }

  return insights.slice(0, 3);
}

function updateMomentum() {
  const tasks = getAllTasksFromStorage();
  const focusScore = computeFocusScore(tasks);
  const wellbeingScore = computeWellbeingScore();
  const campusScore = computeCampusScore();

  const overall = Math.round(focusScore * 0.5 + wellbeingScore * 0.25 + campusScore * 0.25);

  const ring = document.getElementById('momentum-ring');
  const scoreEl = document.getElementById('momentum-score-value');
  const focusEl = document.getElementById('momentum-focus-score');
  const wellbeingEl = document.getElementById('momentum-wellbeing-score');
  const campusEl = document.getElementById('momentum-campus-score');
  const insightsEl = document.getElementById('momentum-insights');

  if (ring) ring.style.setProperty('--score', String(overall));
  if (scoreEl) scoreEl.textContent = String(overall);
  if (focusEl) focusEl.textContent = `${focusScore}%`;
  if (wellbeingEl) wellbeingEl.textContent = `${wellbeingScore}%`;
  if (campusEl) campusEl.textContent = `${campusScore}%`;

  if (insightsEl) {
    insightsEl.innerHTML = '';
    buildInsights({ tasks, focusScore, wellbeingScore, campusScore }).forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      insightsEl.appendChild(li);
    });
  }
}

function hydrateState() {
  const duration = clamp(readNumber(FOCUS_KEYS.duration, DEFAULT_DURATION_MIN), 10, MAX_DURATION_MIN);
  focusState.durationMin = duration;

  const fallbackRemaining = duration * 60 * 1000;
  focusState.remainingMs = clamp(readNumber(FOCUS_KEYS.remaining, fallbackRemaining), 0, MAX_DURATION_MIN * 60 * 1000);
  focusState.running = readBoolean(FOCUS_KEYS.running, false);
  focusState.endsAt = readNumber(FOCUS_KEYS.endsAt, null);
  focusState.sessions = clamp(readNumber(FOCUS_KEYS.sessions, 0), 0, 9999);
  focusState.streak = clamp(readNumber(FOCUS_KEYS.streak, 0), 0, 365);
  focusState.lastCompleted = readString(FOCUS_KEYS.lastCompleted, '');

  if (focusState.running && focusState.endsAt) {
    syncFocusClock();
    if (!focusState.running) return;
  }

  writeState();
}

function attachHandlers() {
  document.getElementById('focus-start')?.addEventListener('click', startSprint);
  document.getElementById('focus-pause')?.addEventListener('click', pauseSprint);
  document.getElementById('focus-reset')?.addEventListener('click', resetSprint);

  const presets = document.getElementById('focus-presets');
  presets?.addEventListener('click', event => {
    const button = event.target.closest('[data-duration]');
    if (!button) return;
    const duration = Number(button.dataset.duration);
    if (!Number.isFinite(duration)) return;
    setDuration(duration);
  });

  window.addEventListener('storage', () => {
    renderSuggestedTasks();
    updateMomentum();
  });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      syncFocusClock();
      updateFocusUI();
      renderSuggestedTasks();
      updateMomentum();
    }
  });
}

export function initFocusHub() {
  if (!document.getElementById('focus-sprint')) return;

  hydrateState();
  attachHandlers();
  renderSuggestedTasks();
  updateMomentum();
  updateFocusUI();
  startTicker();
}
