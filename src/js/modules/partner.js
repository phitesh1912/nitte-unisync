import { getCurrentUser } from './auth.js';

const STORAGE_KEYS = {
  profile: 'nittePartnerProfile',
  matches: 'nittePartnerMatches',
  vouches: 'nittePartnerVouches',
  invites: 'nittePartnerInvites'
};

const BRANCHES = [
  'CSE',
  'CSBS',
  'Computer Science with Data Science',
  'AIML',
  'AIDS',
  'ISE',
  'Mechanical',
  'Aeronautical',
  'EEE',
  'EC',
  'VLSI',
  'Civil'
];

const BRANCH_ALIASES = {
  ME: 'Mechanical',
  ECE: 'EC',
  CSDS: 'Computer Science with Data Science',
  'CSE-DS': 'Computer Science with Data Science'
};

const VOUCH_SUGGESTIONS = [
  'Great coder',
  'Chill to hang with',
  'Reliable teammate',
  'Fast note sharer',
  'Solid hackathon buddy'
];

const MAX_NITTE_SCORE = 105;

const CLUB_ICONS = {
  'Hack Club': '💻',
  Robotics: '🤖',
  Rotaract: '🌍',
  'Anaadyanta Organizers': '🎭',
  NCC: '🛡️',
  'E-Cell': '🚀',
  'NMIT Cricket Team': '🏏'
};

const HANGOUT_ICONS = {
  'The Canteen': '☕',
  'Juice Center': '🧃',
  Library: '📚',
  OAT: '🎤',
  'Indoor Sports Complex': '🏸'
};

const GOAL_ICONS = {
  'Hackathon Partner': '💻',
  'Need Notes': '📝',
  'Grab Chai at Gate': '☕',
  'Gym Buddy': '🏋️',
  'Anaadyanta Team': '🎪',
  'Placement Prep Buddy': '💼'
};

const ONBOARDING_TITLES = [
  'Who are you on campus tonight?',
  'Choose clubs that match your campus vibe.',
  'Pick your favorite NMIT hangout spots.',
  'Select what you are looking for right now.',
  'Drop your prompts and unlock the Pulse Grid.'
];

const onboardingState = {
  steps: [],
  current: 0,
  timer: null,
  submitButton: null,
  nextButton: null,
  backButton: null,
  questionNode: null,
  progressNode: null,
  counterNode: null
};

const campusStudents = [
  {
    id: 's1',
    name: 'Aditi Pulse',
    branch: 'AIML',
    year: 3,
    clubs: ['Hack Club', 'Robotics', 'NMIT Cricket Team'],
    hangouts: ['Library', 'Juice Center'],
    goals: ['Hackathon Partner', 'Anaadyanta Team'],
    status: 'In the Lab',
    prompts: {
      memory: 'Built our department prop at 2AM and still made it to class 😅',
      library: 'Debugging models and pretending I love probability.',
      yelahanka: 'That chai point near the gate after rain.',
      subject: 'Signals and Systems',
      canteen: 'Paneer roll + lemon tea'
    }
  },
  {
    id: 's2',
    name: 'Rohan Torque',
    branch: 'Mechanical',
    year: 3,
    clubs: ['Robotics', 'NCC'],
    hangouts: ['Indoor Sports Complex', 'The Canteen'],
    goals: ['Gym Buddy', 'Anaadyanta Team'],
    status: 'At the OAT',
    prompts: {
      memory: 'Managing stage entries during Anaadyanta was pure chaos and fun.',
      library: 'Half studying, half charging my phone.',
      yelahanka: 'OAT steps at sunset.',
      subject: 'Thermodynamics',
      canteen: 'Masala dosa + filter coffee'
    }
  },
  {
    id: 's3',
    name: 'Sherena Circuit',
    branch: 'EC',
    year: 2,
    clubs: ['E-Cell', 'Hack Club'],
    hangouts: ['Library', 'OAT'],
    goals: ['Need Notes', 'Placement Prep Buddy'],
    status: 'At the Library',
    prompts: {
      memory: 'Volunteering during crowd control made me meet half the campus.',
      library: 'Sitting near sockets and solving old papers.',
      yelahanka: 'Juice Center with friends after internals.',
      subject: 'Digital Communication',
      canteen: 'Veg puffs + cold coffee'
    }
  },
  {
    id: 's4',
    name: 'Darshan Aero',
    branch: 'Aeronautical',
    year: 4,
    clubs: ['NCC', 'Rotaract'],
    hangouts: ['OAT', 'The Canteen'],
    goals: ['Placement Prep Buddy', 'Grab Chai at Gate'],
    status: 'Bored in Placement Cell',
    prompts: {
      memory: 'Our final-year float had duct tape and destiny.',
      library: 'Looking for design references, not textbooks.',
      yelahanka: 'Roadside tea shop near the signal.',
      subject: 'Flight Mechanics',
      canteen: 'Samosa + chai'
    }
  },
  {
    id: 's5',
    name: 'Meghana Stack',
    branch: 'CSE',
    year: 2,
    clubs: ['Hack Club', 'Anaadyanta Organizers'],
    hangouts: ['Library', 'The Canteen'],
    goals: ['Hackathon Partner', 'Need Notes', 'Anaadyanta Team'],
    status: 'At the Canteen',
    prompts: {
      memory: 'Won the departmental treasure hunt by 30 seconds.',
      library: 'Trying to finish DSA sheets before lunch.',
      yelahanka: 'The bakery near bus stand.',
      subject: 'Design and Analysis of Algorithms',
      canteen: 'Chole bhature + chai'
    }
  },
  {
    id: 's6',
    name: 'Vikram Grid',
    branch: 'EEE',
    year: 1,
    clubs: ['NMIT Cricket Team', 'Rotaract'],
    hangouts: ['Indoor Sports Complex', 'Juice Center'],
    goals: ['Gym Buddy', 'Grab Chai at Gate'],
    status: 'At the OAT',
    prompts: {
      memory: 'First Anaadyanta and I still can’t hear after the concert.',
      library: 'Mostly asking seniors for guidance.',
      yelahanka: 'Anything with decent biryani.',
      subject: 'Basic Electrical Engineering',
      canteen: 'Idli-vada + tea'
    }
  }
];

function safeReadJSON(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch (error) {
    localStorage.removeItem(key);
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function dedupe(values = []) {
  return Array.from(new Set(values.map(value => String(value).trim()).filter(Boolean)));
}

function lower(value) {
  return String(value || '').toLowerCase();
}

function intersection(left = [], right = []) {
  const rightSet = new Set(right);
  return left.filter(item => rightSet.has(item));
}

function normalizeBranch(branch) {
  const clean = String(branch || '').trim();
  if (!clean) return '';
  const normalized = BRANCH_ALIASES[clean] || clean;
  return BRANCHES.includes(normalized) ? normalized : normalized;
}

function branchLabel(branch) {
  const normalized = normalizeBranch(branch);
  if (normalized === 'Computer Science with Data Science') return 'CSDS';
  if (normalized === 'EC') return 'ECE';
  return normalized || branch;
}

function getDefaultProfile() {
  return {
    name: '',
    branch: '',
    year: null,
    status: 'Bored in Placement Cell',
    clubs: [],
    hangouts: [],
    goals: [],
    prompts: {
      memory: '',
      library: '',
      yelahanka: '',
      subject: '',
      canteen: ''
    }
  };
}

function ensureProfileShape(profile) {
  const base = getDefaultProfile();
  const merged = {
    ...base,
    ...(profile || {}),
    prompts: {
      ...base.prompts,
      ...((profile && profile.prompts) || {})
    }
  };

  merged.branch = normalizeBranch(merged.branch);
  merged.year = merged.year ? parseInt(merged.year, 10) : null;
  merged.clubs = dedupe(merged.clubs);
  merged.hangouts = dedupe(merged.hangouts);
  merged.goals = dedupe(merged.goals);
  return merged;
}

function getBranchClass(branch) {
  const normalized = normalizeBranch(branch).toLowerCase();

  const map = {
    cse: 'branch-cse',
    csbs: 'branch-csbs',
    'computer science with data science': 'branch-csds',
    aiml: 'branch-aiml',
    aids: 'branch-aids',
    ise: 'branch-ise',
    mechanical: 'branch-mechanical',
    aeronautical: 'branch-aeronautical',
    eee: 'branch-eee',
    ec: 'branch-ec',
    vlsi: 'branch-vlsi',
    civil: 'branch-civil'
  };

  return map[normalized] || 'branch-default';
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function toVibePercent(score) {
  return clamp(Math.round((Number(score) / MAX_NITTE_SCORE) * 100), 0, 100);
}

function getInitials(name) {
  return String(name || 'NMIT')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() || '')
    .join('') || 'NC';
}

function getStatusTone(status) {
  const text = lower(status);
  if (text.includes('bored')) return 'status-amber';
  if (text.includes('lab') || text.includes('library') || text.includes('canteen')) return 'status-online';
  return 'status-chill';
}

let partnerProfile = ensureProfileShape(safeReadJSON(STORAGE_KEYS.profile, getDefaultProfile()));

const storedMatches = safeReadJSON(STORAGE_KEYS.matches, []);
let matches = Array.isArray(storedMatches) ? storedMatches : [];

const storedVouches = safeReadJSON(STORAGE_KEYS.vouches, {});
let vouchesByStudent = storedVouches && typeof storedVouches === 'object' ? storedVouches : {};

const storedInvites = safeReadJSON(STORAGE_KEYS.invites, []);
let inviteHistory = Array.isArray(storedInvites) ? storedInvites : [];

function createBridgeReason(sharedClubs, hasSharedFestGoal) {
  if (sharedClubs.length) {
    const club = sharedClubs[0];
    if (club === 'NMIT Cricket Team') return 'You both follow the NMIT Cricket team.';
    return `You are both in ${club}.`;
  }

  if (hasSharedFestGoal) return 'You both are looking for the Anaadyanta Team.';
  return '';
}

function computeNitteScore(myProfile, student) {
  let score = 0;
  const reasons = [];

  const sharedClubs = intersection(myProfile.clubs, student.clubs);
  const sharedHangouts = intersection(myProfile.hangouts, student.hangouts);
  const sharedGoals = intersection(myProfile.goals, student.goals);

  if (sharedClubs.length) {
    score += 40;
    reasons.push(`Shared club: ${sharedClubs[0]} (+40)`);
  }

  const oppositeBranch = Boolean(myProfile.branch && student.branch && myProfile.branch !== student.branch);
  if (oppositeBranch) {
    score += 20;
    reasons.push(`Opposite branch advantage (+20)`);
  }

  const hasSharedFestGoal =
    myProfile.goals.includes('Anaadyanta Team') && student.goals.includes('Anaadyanta Team');
  if (hasSharedFestGoal) {
    score += 30;
    reasons.push('Shared fest goal: Anaadyanta Team (+30)');
  }

  const sameYear = Boolean(myProfile.year && student.year && Number(myProfile.year) === Number(student.year));
  if (sameYear) {
    score += 15;
    reasons.push('Same year connection (+15)');
  }

  return {
    score,
    reasons,
    bridgeReason: createBridgeReason(sharedClubs, hasSharedFestGoal),
    sharedClubs,
    sharedHangouts,
    sharedGoals,
    hasSharedFestGoal,
    oppositeBranch,
    sameYear
  };
}

function rankStudents() {
  return campusStudents
    .map(student => ({
      student,
      result: computeNitteScore(partnerProfile, student)
    }))
    .sort((left, right) => right.result.score - left.result.score);
}

function renderMatches() {
  const list = document.getElementById('match-list');
  if (!list) return;

  list.innerHTML = '';
  if (!matches.length) {
    const li = document.createElement('li');
    li.textContent = 'No matches yet. Hit Connect on the Nitte Pulse cards.';
    list.appendChild(li);
    return;
  }

  matches
    .slice()
    .sort((left, right) => (right.score || 0) - (left.score || 0))
    .forEach(match => {
      const li = document.createElement('li');
      const vibe = toVibePercent(match.score || 0);
      li.innerHTML = `
        <div class="match-title">
          <strong>${escapeHtml(match.name)}</strong>
          <small>${escapeHtml(branchLabel(match.branch))} · Year ${escapeHtml(match.year)}</small>
        </div>
        <span class="score-pill">Vibe ${escapeHtml(vibe)}%</span>
      `;
      list.appendChild(li);
    });
}

function getSelectedValues(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return [];
  return Array.from(container.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
}

function setSelectedValues(containerId, selectedValues) {
  const selected = new Set(selectedValues || []);
  const container = document.getElementById(containerId);
  if (!container) return;

  container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = selected.has(checkbox.value);
  });
}

function hydrateForm(profile) {
  const setValue = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.value = value ?? '';
  };

  setValue('partner-name', profile.name);
  setValue('partner-branch', profile.branch);
  setValue('partner-year', profile.year || '');
  setValue('partner-status', profile.status || 'Bored in Placement Cell');

  setSelectedValues('club-options', profile.clubs);
  setSelectedValues('hangout-options', profile.hangouts);
  setSelectedValues('goal-options', profile.goals);

  setValue('prompt-memory', profile.prompts.memory);
  setValue('prompt-library', profile.prompts.library);
  setValue('prompt-yelahanka', profile.prompts.yelahanka);
  setValue('prompt-subject', profile.prompts.subject);
  setValue('prompt-canteen', profile.prompts.canteen);
}

function collectProfileFromForm() {
  const currentUser = getCurrentUser();
  const fallbackName = currentUser?.name?.split(' ')[0] || 'NMIT Student';

  const yearValue = document.getElementById('partner-year')?.value;
  const year = yearValue ? parseInt(yearValue, 10) : null;

  return ensureProfileShape({
    name: document.getElementById('partner-name')?.value.trim() || fallbackName,
    branch: normalizeBranch(document.getElementById('partner-branch')?.value || ''),
    year,
    status: document.getElementById('partner-status')?.value || 'Bored in Placement Cell',
    clubs: getSelectedValues('club-options'),
    hangouts: getSelectedValues('hangout-options'),
    goals: getSelectedValues('goal-options'),
    prompts: {
      memory: document.getElementById('prompt-memory')?.value.trim() || '',
      library: document.getElementById('prompt-library')?.value.trim() || '',
      yelahanka: document.getElementById('prompt-yelahanka')?.value.trim() || '',
      subject: document.getElementById('prompt-subject')?.value.trim() || '',
      canteen: document.getElementById('prompt-canteen')?.value.trim() || ''
    }
  });
}

function prefillFromAuth() {
  const user = getCurrentUser();
  if (!user) return;

  if (!partnerProfile.name) {
    partnerProfile.name = user.name?.split(' ')[0] || partnerProfile.name;
  }

  if (!partnerProfile.branch && user.branch) {
    partnerProfile.branch = normalizeBranch(user.branch);
  }

  if (!partnerProfile.year && user.year) {
    partnerProfile.year = parseInt(user.year, 10) || null;
  }
}

function applyOptionIcons(containerId, iconMap) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const labels = Array.from(container.querySelectorAll('label'));
  labels.forEach(label => {
    if (label.querySelector('.option-icon')) return;

    const input = document.getElementById(label.getAttribute('for') || '');
    const value = input?.value || label.textContent.trim();

    const icon = document.createElement('span');
    icon.className = 'option-icon';
    icon.textContent = iconMap[value] || '✨';

    const text = document.createElement('span');
    text.className = 'option-text';
    text.textContent = value;

    label.textContent = '';
    label.append(icon, text);
  });
}

function setupVisualSelectors() {
  applyOptionIcons('club-options', CLUB_ICONS);
  applyOptionIcons('hangout-options', HANGOUT_ICONS);
  applyOptionIcons('goal-options', GOAL_ICONS);
}

function typeQuestion(text) {
  const node = onboardingState.questionNode;
  if (!node) return;

  if (onboardingState.timer) {
    clearInterval(onboardingState.timer);
    onboardingState.timer = null;
  }

  node.textContent = '';
  node.classList.remove('typing-done');

  let index = 0;
  onboardingState.timer = setInterval(() => {
    node.textContent = text.slice(0, index + 1);
    index += 1;

    if (index >= text.length) {
      clearInterval(onboardingState.timer);
      onboardingState.timer = null;
      node.classList.add('typing-done');
    }
  }, 18);
}

function updateOnboardingStep(nextIndex) {
  if (!onboardingState.steps.length) return;

  onboardingState.current = clamp(nextIndex, 0, onboardingState.steps.length - 1);

  onboardingState.steps.forEach((step, index) => {
    step.classList.toggle('active', index === onboardingState.current);
    step.hidden = index !== onboardingState.current;
  });

  const isLast = onboardingState.current === onboardingState.steps.length - 1;
  const progress = ((onboardingState.current + 1) / onboardingState.steps.length) * 100;

  if (onboardingState.progressNode) {
    onboardingState.progressNode.style.width = `${progress}%`;
  }

  if (onboardingState.counterNode) {
    onboardingState.counterNode.textContent = `Step ${onboardingState.current + 1} / ${onboardingState.steps.length}`;
  }

  if (onboardingState.backButton) {
    onboardingState.backButton.disabled = onboardingState.current === 0;
  }

  if (onboardingState.nextButton) {
    onboardingState.nextButton.textContent = isLast ? 'Review & Save →' : 'Next →';
  }

  if (onboardingState.submitButton) {
    onboardingState.submitButton.style.display = isLast ? 'inline-flex' : 'none';
  }

  typeQuestion(ONBOARDING_TITLES[onboardingState.current] || 'Tell us more about your vibe.');
}

function canProceedFromCurrentStep() {
  if (onboardingState.current !== 0) return true;

  const branch = document.getElementById('partner-branch')?.value;
  const year = document.getElementById('partner-year')?.value;

  if (!branch || !year) {
    alert('Pick your branch and year first so we can personalize your Pulse feed.');
    return false;
  }

  return true;
}

function setupOnboardingFlow(form) {
  const baseSteps = [
    form.querySelector('.partner-grid-form'),
    ...Array.from(form.querySelectorAll('.interest-group')),
    form.querySelector('.prompt-stack')
  ].filter(Boolean);

  if (!baseSteps.length) return;

  let shell = form.querySelector('#onboard-shell');
  if (!shell) {
    shell = document.createElement('section');
    shell.id = 'onboard-shell';
    shell.className = 'onboard-shell';
    shell.innerHTML = `
      <div class="onboard-head">
        <span id="onboard-step-counter" class="onboard-step-counter">Step 1 / ${baseSteps.length}</span>
        <div class="onboard-progress"><span id="onboard-progress-fill"></span></div>
      </div>
      <h4 id="onboard-question" class="onboard-question"></h4>
    `;
    form.prepend(shell);
  }

  let controls = form.querySelector('#onboard-controls');
  if (!controls) {
    controls = document.createElement('div');
    controls.id = 'onboard-controls';
    controls.className = 'onboard-controls';
    controls.innerHTML = `
      <button type="button" id="onboard-back" class="action-btn subtle">← Back</button>
      <button type="button" id="onboard-next" class="action-btn connect-btn">Next →</button>
    `;
    form.append(controls);
  }

  onboardingState.steps = baseSteps;
  onboardingState.questionNode = form.querySelector('#onboard-question');
  onboardingState.progressNode = form.querySelector('#onboard-progress-fill');
  onboardingState.counterNode = form.querySelector('#onboard-step-counter');
  onboardingState.submitButton = form.querySelector('button[type="submit"]');
  onboardingState.nextButton = form.querySelector('#onboard-next');
  onboardingState.backButton = form.querySelector('#onboard-back');

  onboardingState.steps.forEach(step => {
    step.classList.add('onboard-step');
  });

  if (onboardingState.backButton && !onboardingState.backButton.dataset.bound) {
    onboardingState.backButton.addEventListener('click', () => {
      updateOnboardingStep(onboardingState.current - 1);
    });
    onboardingState.backButton.dataset.bound = 'true';
  }

  if (onboardingState.nextButton && !onboardingState.nextButton.dataset.bound) {
    onboardingState.nextButton.addEventListener('click', () => {
      if (!canProceedFromCurrentStep()) return;

      if (onboardingState.current >= onboardingState.steps.length - 1) {
        onboardingState.submitButton?.focus();
        return;
      }

      updateOnboardingStep(onboardingState.current + 1);
    });
    onboardingState.nextButton.dataset.bound = 'true';
  }

  updateOnboardingStep(0);
}

function addMatch(student, score) {
  const existingIndex = matches.findIndex(item => item.id === student.id);
  const payload = {
    id: student.id,
    name: student.name,
    branch: student.branch,
    year: student.year,
    status: student.status,
    score
  };

  if (existingIndex >= 0) {
    matches[existingIndex] = payload;
  } else {
    matches.push(payload);
  }

  saveJSON(STORAGE_KEYS.matches, matches);
  renderMatches();
}

function vouchStudent(student) {
  const suggestion = VOUCH_SUGGESTIONS[Math.floor(Math.random() * VOUCH_SUGGESTIONS.length)];
  const entered = prompt(`Vouch for ${student.name}:`, suggestion);
  if (!entered) return;

  const text = entered.trim();
  if (!text) return;

  const current = Array.isArray(vouchesByStudent[student.id]) ? vouchesByStudent[student.id] : [];
  vouchesByStudent[student.id] = dedupe([text, ...current]).slice(0, 10);
  saveJSON(STORAGE_KEYS.vouches, vouchesByStudent);

  renderPartnerCards();
}

function inviteToCanteen(student) {
  const picked = prompt(`Meet ${student.name} at The Canteen at:`, '5:30 PM');
  if (!picked) return;

  const time = picked.trim() || '5:30 PM';
  inviteHistory.unshift({
    studentId: student.id,
    studentName: student.name,
    time,
    at: new Date().toISOString()
  });
  inviteHistory = inviteHistory.slice(0, 30);
  saveJSON(STORAGE_KEYS.invites, inviteHistory);

  alert(`✅ Invite sent to ${student.name} for ${time} at The Canteen.`);
}

function buildVibeSignals(student, result) {
  const signals = [];

  if (result.sharedHangouts.includes('The Canteen')) {
    signals.push({ icon: '☕', label: 'Both love the Canteen' });
  }

  if (result.sharedGoals.includes('Placement Prep Buddy')) {
    signals.push({ icon: '💼', label: 'Placement prep sync' });
  }

  if (result.sharedGoals.includes('Hackathon Partner')) {
    signals.push({ icon: '💻', label: 'Hackathon-ready duo' });
  }

  if (result.sharedHangouts.includes('Library')) {
    signals.push({ icon: '📚', label: 'Library focus energy' });
  }

  if (result.sharedClubs.length) {
    signals.push({ icon: CLUB_ICONS[result.sharedClubs[0]] || '🎯', label: `Shared ${result.sharedClubs[0]}` });
  }

  if (result.sameYear) {
    signals.push({ icon: '🧑‍🎓', label: 'Same-year flow' });
  }

  if (result.oppositeBranch) {
    signals.push({ icon: '🔀', label: 'Cross-branch chemistry' });
  }

  if (result.hasSharedFestGoal) {
    signals.push({ icon: '🎪', label: 'Anaadyanta mission' });
  }

  if (!signals.length) {
    signals.push({ icon: '✨', label: 'Fresh campus connection' });
  }

  return signals.slice(0, 4);
}

function getReasonSummary(result) {
  if (!result.reasons.length) return 'Low overlap, but might be a high-surprise campus combo.';
  return result.reasons.slice(0, 2).join(' • ');
}

function createCard(student, result, rankIndex) {
  const card = document.createElement('article');
  const topClass = rankIndex < 3 ? `top-match top-match-${rankIndex + 1}` : '';
  card.className = `partner-card pulse-card ${getBranchClass(student.branch)} ${topClass}`;

  const vibePercent = toVibePercent(result.score);
  const statusTone = getStatusTone(student.status);
  const initials = getInitials(student.name);
  const signals = buildVibeSignals(student, result)
    .map(signal => `<span class="vibe-pill"><span>${escapeHtml(signal.icon)}</span><small>${escapeHtml(signal.label)}</small></span>`)
    .join('');

  const summary = getReasonSummary(result);
  const topBadge = rankIndex < 3 ? `<span class="top-badge">Top Match #${rankIndex + 1}</span>` : '';

  const shortPrompts = [
    student.prompts.memory,
    student.prompts.library,
    `Struggling with: ${student.prompts.subject || 'Not specified yet'}`
  ]
    .filter(Boolean)
    .slice(0, 2)
    .map(promptText => `<p class="pulse-line">${escapeHtml(promptText)}</p>`)
    .join('');

  const vouches = Array.isArray(vouchesByStudent[student.id]) ? vouchesByStudent[student.id] : [];
  const topVouches = dedupe(vouches).slice(0, 2);
  const vouchMarkup = topVouches
    .map(vouch => `<span class="chip vouch-chip">${escapeHtml(vouch)}</span>`)
    .join('');

  card.innerHTML = `
    ${topBadge}

    <div class="pulse-top">
      <div class="identity-stack">
        <div class="pulse-avatar ${statusTone}">
          <span>${escapeHtml(initials)}</span>
          <i class="status-dot"></i>
        </div>

        <div class="identity-text">
          <h4>${escapeHtml(student.name)}</h4>
          <p class="branch-pill">${escapeHtml(branchLabel(student.branch))} · Year ${escapeHtml(student.year)}</p>
          <span class="thought-bubble">${escapeHtml(student.status)}</span>
        </div>
      </div>

      <div class="vibe-gauge" style="--match:${escapeHtml(vibePercent)};" aria-label="Vibe Match ${escapeHtml(vibePercent)} percent">
        <span>${escapeHtml(vibePercent)}%</span>
        <small>Vibe</small>
      </div>
    </div>

    <div class="pulse-middle">
      <p class="match-summary">${escapeHtml(summary)}</p>
      <div class="vibe-icons">${signals}</div>
    </div>

    <div class="pulse-snippets">${shortPrompts}</div>

    <div class="pulse-actions">
      <button type="button" class="action-btn connect-btn">Connect</button>
      <button type="button" class="action-btn subtle vouch-btn">Vouch</button>
      <button type="button" class="action-btn subtle invite-btn">Meet at Canteen</button>
    </div>

    <div class="vouch-social">
      <span class="heart-count">💖 ${escapeHtml(vouches.length)}</span>
      <div class="vouch-chips">${vouchMarkup || '<span class="chip vouch-chip">Be the first to vouch</span>'}</div>
    </div>
  `;

  card.querySelector('.connect-btn')?.addEventListener('click', () => {
    addMatch(student, result.score);
    alert(`🎉 Connected with ${student.name}!`);
  });

  card.querySelector('.vouch-btn')?.addEventListener('click', () => vouchStudent(student));
  card.querySelector('.invite-btn')?.addEventListener('click', () => inviteToCanteen(student));

  return card;
}

function renderPartnerCards() {
  const container = document.getElementById('partner-cards');
  if (!container) return;

  container.innerHTML = '';

  if (!partnerProfile.branch || !partnerProfile.year) {
    container.innerHTML =
      '<p>Complete your NMIT feed (branch + year) and save to unlock campus matching.</p>';
    return;
  }

  const rankedStudents = rankStudents();
  rankedStudents.forEach(({ student, result }, index) => {
    container.appendChild(createCard(student, result, index));
  });
}

export function initPartnerUp() {
  const form = document.getElementById('partner-form');
  if (!form) return;

  prefillFromAuth();
  hydrateForm(partnerProfile);
  setupVisualSelectors();
  setupOnboardingFlow(form);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const collected = collectProfileFromForm();

    if (!collected.branch || !collected.year) {
      alert('Please select your branch and year for Nitte Score matching.');
      return;
    }

    partnerProfile = collected;
    saveJSON(STORAGE_KEYS.profile, partnerProfile);

    renderPartnerCards();
    renderMatches();
    alert('✅ NMIT feed saved. Nitte Pulse updated!');
  });

  document.getElementById('refresh-matches')?.addEventListener('click', () => {
    renderPartnerCards();
    renderMatches();
  });

  renderPartnerCards();
  renderMatches();
}