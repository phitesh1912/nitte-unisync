let waterCount = 0;
let eyeCount = 0;
let postureCount = 0;
let hydrationTimer;
let eyeTimer;
let postureTimer;

// ── Paste this REPLACEMENT for your refreshWellbeingUI function in wellbeing.js ──
// It updates both the hidden legacy <p> tags AND the new visual count/bar elements

function refreshWellbeingUI() {
  // Legacy elements (kept for backwards compat)
  const waterLog   = document.getElementById('water-log');
  const eyeLog     = document.getElementById('eye-log');
  const postureLog = document.getElementById('posture-log');
  if (waterLog)   waterLog.textContent   = 'Cups today: '     + waterCount;
  if (eyeLog)     eyeLog.textContent     = 'Breaks today: '   + eyeCount;
  if (postureLog) postureLog.textContent = 'Reminders done: ' + postureCount;

  // New zen UI — big count numbers
  const wc = document.getElementById('water-count-display');
  const ec = document.getElementById('eye-count-display');
  const pc = document.getElementById('posture-count-display');
  if (wc) wc.textContent = waterCount;
  if (ec) ec.textContent = eyeCount;
  if (pc) pc.textContent = postureCount;

  // Progress bars (water goal 8, eye goal 6, posture goal 5)
  const wb = document.getElementById('water-bar');
  const eb = document.getElementById('eye-bar');
  const pb = document.getElementById('posture-bar');
  if (wb) wb.style.width = Math.min(100, (waterCount   / 8) * 100) + '%';
  if (eb) eb.style.width = Math.min(100, (eyeCount     / 6) * 100) + '%';
  if (pb) pb.style.width = Math.min(100, (postureCount / 5) * 100) + '%';
}

function checkDateReset() {
  const today = new Date().toDateString();
  const savedDate = localStorage.getItem('wellbeingDate');
  if (savedDate !== today) {
    waterCount = 0;
    eyeCount = 0;
    postureCount = 0;
    localStorage.setItem('waterCount', 0);
    localStorage.setItem('eyeCount', 0);
    localStorage.setItem('postureCount', 0);
    localStorage.removeItem('reminderLog');
    const rl = document.getElementById('reminder-log');
    if (rl) rl.innerHTML = '<li>No reminders yet.</li>';
    localStorage.setItem('wellbeingDate', today);
  } else {
    waterCount = parseInt(localStorage.getItem('waterCount')) || 0;
    eyeCount = parseInt(localStorage.getItem('eyeCount')) || 0;
    postureCount = parseInt(localStorage.getItem('postureCount')) || 0;
    const savedLog = localStorage.getItem('reminderLog');
    const logEl = document.getElementById('reminder-log');
    if (savedLog && logEl) logEl.innerHTML = savedLog;
  }
  refreshWellbeingUI();
}

function restoreReminderSettings() {
  const hydration = localStorage.getItem('hydrationInterval');
  const eye = localStorage.getItem('eyeInterval');
  const posture = localStorage.getItem('postureInterval');
  if (hydration) document.getElementById('hydration-interval').value = hydration;
  if (eye) document.getElementById('eye-interval').value = eye;
  if (posture) document.getElementById('posture-interval').value = posture;
}

function showReminder(message) {
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const full = `${now} - ${message}`;
  const log = document.getElementById('reminder-log');
  if (!log) return;
  if (log.children[0] && log.children[0].textContent === 'No reminders yet.') log.innerHTML = '';
  const li = document.createElement('li');
  li.textContent = full;
  log.insertBefore(li, log.firstChild);
  localStorage.setItem('reminderLog', log.innerHTML);
  alert(message);
}

function startReminders() {
  clearInterval(hydrationTimer);
  clearInterval(eyeTimer);
  clearInterval(postureTimer);
  const h = parseInt(localStorage.getItem('hydrationInterval')) || 120;
  const e = parseInt(localStorage.getItem('eyeInterval')) || 20;
  const p = parseInt(localStorage.getItem('postureInterval')) || 45;
  hydrationTimer = setInterval(() => showReminder('💧 Time to drink water!'), h * 60000);
  eyeTimer = setInterval(() => showReminder('👀 20-20-20 Rule: Look 20 feet away for 20s'), e * 60000);
  postureTimer = setInterval(() => showReminder('🪑 Sit straight! Adjust your posture.'), p * 60000);
}

export function initWellbeing() {
  const drinkBtn = document.getElementById('drink-water');
  const eyeBtn = document.getElementById('eye-break');
  const postureBtn = document.getElementById('posture-check');
  const reminderForm = document.getElementById('reminder-form');

  if (drinkBtn) {
    drinkBtn.addEventListener('click', () => {
      waterCount++;
      localStorage.setItem('waterCount', waterCount);
      refreshWellbeingUI();
    });
  }
  if (eyeBtn) {
    eyeBtn.addEventListener('click', () => {
      eyeCount++;
      localStorage.setItem('eyeCount', eyeCount);
      refreshWellbeingUI();
    });
  }
  if (postureBtn) {
    postureBtn.addEventListener('click', () => {
      postureCount++;
      localStorage.setItem('postureCount', postureCount);
      refreshWellbeingUI();
    });
  }

  if (reminderForm) {
    reminderForm.addEventListener('submit', e => {
      e.preventDefault();
      const h = document.getElementById('hydration-interval').value;
      const ei = document.getElementById('eye-interval').value;
      const pi = document.getElementById('posture-interval').value;
      localStorage.setItem('hydrationInterval', h);
      localStorage.setItem('eyeInterval', ei);
      localStorage.setItem('postureInterval', pi);
      alert('✅ Reminder settings saved!');
      startReminders();
    });
  }

  if (document.getElementById('water-log')) {
    checkDateReset();
    restoreReminderSettings();
    startReminders();
  }
}