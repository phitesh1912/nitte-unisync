import { getCurrentUser } from './auth.js';

const STORAGE_KEYS = {
  companionTown: 'nitteCompanionTown',
  companionConnections: 'nitteCompanionConnectionsByUser',
  carpoolPosts: 'nitteCarpoolPosts'
};

const COMPANION_PROFILES = [
  { id: 'cp-1', name: 'Ananya', branch: 'CSE', year: 3, hometown: 'Mangalore', status: 'Travels home most weekends' },
  { id: 'cp-2', name: 'Rohan', branch: 'ISE', year: 2, hometown: 'Mysuru', status: 'Prefers evening travel plans' },
  { id: 'cp-3', name: 'Keerthi', branch: 'AIML', year: 4, hometown: 'Hubballi', status: 'Usually carpools on Fridays' },
  { id: 'cp-4', name: 'Darshan', branch: 'ECE', year: 1, hometown: 'Udupi', status: 'Looking for same-town companions' },
  { id: 'cp-5', name: 'Nisha', branch: 'CSE', year: 2, hometown: 'Mangalore', status: 'Open to group intercity rides' },
  { id: 'cp-6', name: 'Pratham', branch: 'Mechanical', year: 3, hometown: 'Tumakuru', status: 'Regular traveler during holidays' },
  { id: 'cp-7', name: 'Shreya', branch: 'CSBS', year: 2, hometown: 'Shivamogga', status: 'Looks for verified companions' },
  { id: 'cp-8', name: 'Faizan', branch: 'EEE', year: 4, hometown: 'Kalaburagi', status: 'Mostly uses weekend carpools' }
];

function dateAfter(daysAhead = 1) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().slice(0, 10);
}

function createSeedCarpoolPosts() {
  return [
    {
      id: 'carpool-seed-1',
      fromCity: 'NMIT',
      toCity: 'Hebbal',
      travelDate: dateAfter(1),
      timeWindow: '6:30 PM',
      seats: 3,
      notes: 'Pickup near main gate, no heavy luggage.',
      ownerUid: 'seed-1',
      ownerName: 'Aditi',
      status: 'open',
      participantIds: [],
      participantNames: [],
      createdAt: new Date().toISOString()
    },
    {
      id: 'carpool-seed-2',
      fromCity: 'NMIT',
      toCity: 'Bagalur Cross',
      travelDate: dateAfter(2),
      timeWindow: '5:45 PM',
      seats: 2,
      notes: 'Can take one stop on the way.',
      ownerUid: 'seed-2',
      ownerName: 'Rohan',
      status: 'open',
      participantIds: [],
      participantNames: [],
      createdAt: new Date().toISOString()
    },
    {
      id: 'carpool-seed-3',
      fromCity: 'Yelahanka',
      toCity: 'NMIT',
      travelDate: dateAfter(1),
      timeWindow: '8:10 AM',
      seats: 1,
      notes: 'Morning ride, starts on time.',
      ownerUid: 'seed-3',
      ownerName: 'Keerthi',
      status: 'open',
      participantIds: [],
      participantNames: [],
      createdAt: new Date().toISOString()
    }
  ];
}

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
  return Array.from(new Set(values));
}

function normalizeCity(value) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

function lower(value) {
  return String(value || '').toLowerCase();
}

function cityKey(value) {
  return lower(normalizeCity(value));
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDateLabel(value) {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return 'Date TBD';
  return date.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' });
}

function viewerId() {
  return getCurrentUser()?.uid || 'guest';
}

function viewerName() {
  const name = String(getCurrentUser()?.name || '').trim();
  return name || 'NMIT Student';
}

function createCarpoolId() {
  return `carpool-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function ensureCarpoolShape(post) {
  return {
    id: String(post?.id || createCarpoolId()),
    fromCity: normalizeCity(post?.fromCity || ''),
    toCity: normalizeCity(post?.toCity || ''),
    travelDate: String(post?.travelDate || ''),
    timeWindow: String(post?.timeWindow || '').trim(),
    seats: Math.max(1, Number(post?.seats) || 1),
    notes: String(post?.notes || '').trim(),
    ownerUid: String(post?.ownerUid || 'unknown'),
    ownerName: String(post?.ownerName || 'Student'),
    status: String(post?.status || 'open'),
    participantIds: Array.isArray(post?.participantIds) ? dedupe(post.participantIds.map(String)) : [],
    participantNames: Array.isArray(post?.participantNames) ? post.participantNames.map(String) : [],
    createdAt: String(post?.createdAt || new Date().toISOString())
  };
}

let companionConnectionsByUser = {};
let carpoolPosts = [];

function loadState() {
  const storedConnections = safeReadJSON(STORAGE_KEYS.companionConnections, {});
  companionConnectionsByUser = storedConnections && typeof storedConnections === 'object' ? storedConnections : {};

  const storedPosts = safeReadJSON(STORAGE_KEYS.carpoolPosts, []);
  if (Array.isArray(storedPosts) && storedPosts.length) {
    carpoolPosts = storedPosts.map(ensureCarpoolShape);
  } else {
    carpoolPosts = createSeedCarpoolPosts().map(ensureCarpoolShape);
    saveJSON(STORAGE_KEYS.carpoolPosts, carpoolPosts);
  }
}

function persistCarpoolPosts() {
  saveJSON(STORAGE_KEYS.carpoolPosts, carpoolPosts);
}

function connectedIdsForViewer() {
  const id = viewerId();
  return Array.isArray(companionConnectionsByUser[id]) ? companionConnectionsByUser[id] : [];
}

function setConnectedIdsForViewer(ids) {
  const id = viewerId();
  companionConnectionsByUser[id] = dedupe(ids);
  saveJSON(STORAGE_KEYS.companionConnections, companionConnectionsByUser);
}

function isCompanionConnected(companionId) {
  return connectedIdsForViewer().includes(companionId);
}

function toggleCompanionConnection(companionId) {
  const current = new Set(connectedIdsForViewer());
  if (current.has(companionId)) current.delete(companionId);
  else current.add(companionId);

  setConnectedIdsForViewer(Array.from(current));
}

function readCompanionFilters() {
  const savedTown = normalizeCity(localStorage.getItem(STORAGE_KEYS.companionTown) || '');
  const enteredTown = normalizeCity(document.getElementById('companion-filter-town')?.value || '');

  return {
    town: enteredTown || savedTown,
    keyword: lower((document.getElementById('companion-filter-query')?.value || '').trim())
  };
}

function companionCardTemplate(profile) {
  const connected = isCompanionConnected(profile.id);
  const buttonLabel = connected ? 'Disconnect' : 'Connect';

  return `
    <article class="travel-card companion-card">
      <div class="travel-card-top">
        <div>
          <h4>${escapeHtml(profile.name)}</h4>
          <p>${escapeHtml(profile.branch)} · Year ${escapeHtml(profile.year)}</p>
        </div>
        <div class="travel-pill-row">
          <span class="travel-pill hometown">${escapeHtml(profile.hometown)}</span>
          ${connected ? '<span class="travel-pill open">Connected</span>' : ''}
        </div>
      </div>

      <p class="travel-note">${escapeHtml(profile.status)}</p>

      <div class="travel-actions">
        <button type="button" class="action-btn subtle" data-companion-action="toggle-connect" data-companion-id="${escapeHtml(profile.id)}">${buttonLabel}</button>
      </div>
    </article>
  `;
}

function renderCompanionLists() {
  const availableContainer = document.getElementById('companion-list');
  const connectedContainer = document.getElementById('companion-connected-list');
  if (!availableContainer || !connectedContainer) return;

  const filters = readCompanionFilters();

  let list = COMPANION_PROFILES.slice();

  if (filters.town) {
    list = list.filter(profile => cityKey(profile.hometown) === cityKey(filters.town));
  }

  if (filters.keyword) {
    list = list.filter(profile => {
      const hay = lower(`${profile.name} ${profile.branch} ${profile.year} ${profile.hometown} ${profile.status}`);
      return hay.includes(filters.keyword);
    });
  }

  const connectedSet = new Set(connectedIdsForViewer());

  availableContainer.innerHTML = list.length
    ? list.map(companionCardTemplate).join('')
    : '<p class="travel-empty">No companions found for this filter. Try a nearby town or clear keyword.</p>';

  const connectedProfiles = COMPANION_PROFILES.filter(profile => connectedSet.has(profile.id));
  connectedContainer.innerHTML = connectedProfiles.length
    ? connectedProfiles.map(companionCardTemplate).join('')
    : '<p class="travel-empty">No connected companions yet. Tap Connect on a profile to save them.</p>';
}

function setTravelView(view) {
  const root = document.getElementById('travel');
  if (!root) return;

  const safeView = view === 'carpool' ? 'carpool' : 'companion';

  root.querySelectorAll('[data-travel-view]').forEach(button => {
    const active = button.dataset.travelView === safeView;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', active ? 'true' : 'false');
  });

  root.querySelectorAll('[data-travel-view-panel]').forEach(panel => {
    const active = panel.dataset.travelViewPanel === safeView;
    panel.hidden = !active;
    panel.classList.toggle('active', active);
  });
}

function bindTravelTabs() {
  const root = document.getElementById('travel');
  if (!root) return;

  const tabs = root.querySelector('.travel-tabs');
  if (!tabs) return;

  tabs.addEventListener('click', event => {
    const button = event.target.closest('[data-travel-view]');
    if (!button) return;
    setTravelView(button.dataset.travelView);
  });

  setTravelView('companion');
}

function bindCompanionEvents() {
  const companionRoot = document.getElementById('travel');
  if (!companionRoot) return;

  const townForm = document.getElementById('companion-town-form');
  const townInput = document.getElementById('companion-town-input');
  const filterTownInput = document.getElementById('companion-filter-town');

  const savedTown = normalizeCity(localStorage.getItem(STORAGE_KEYS.companionTown) || '');
  if (townInput) townInput.value = savedTown;
  if (filterTownInput && !filterTownInput.value && savedTown) {
    filterTownInput.value = savedTown;
  }

  townForm?.addEventListener('submit', event => {
    event.preventDefault();
    const hometown = normalizeCity(townInput?.value || '');

    if (!hometown) {
      localStorage.removeItem(STORAGE_KEYS.companionTown);
      if (filterTownInput && !filterTownInput.value.trim()) filterTownInput.value = '';
      renderCompanionLists();
      return;
    }

    localStorage.setItem(STORAGE_KEYS.companionTown, hometown);
    if (filterTownInput && !filterTownInput.value.trim()) {
      filterTownInput.value = hometown;
    }
    alert('✅ Hometown saved for Travel Companion matching.');
    renderCompanionLists();
  });

  document.getElementById('companion-filter-form')?.addEventListener('submit', event => {
    event.preventDefault();
    renderCompanionLists();
  });

  document.getElementById('companion-refresh')?.addEventListener('click', () => {
    renderCompanionLists();
  });

  companionRoot.addEventListener('click', event => {
    const button = event.target.closest('[data-companion-action]');
    if (!button) return;

    const action = button.dataset.companionAction;
    const companionId = button.dataset.companionId;
    if (action !== 'toggle-connect' || !companionId) return;

    toggleCompanionConnection(companionId);
    renderCompanionLists();
  });
}

function isCarpoolOpen(post) {
  return lower(post?.status) !== 'closed';
}

function seatsTaken(post) {
  return Array.isArray(post?.participantIds) ? post.participantIds.length : 0;
}

function seatsLeft(post) {
  return Math.max(0, (Number(post?.seats) || 0) - seatsTaken(post));
}

function isJoined(post) {
  return (post?.participantIds || []).includes(viewerId());
}

function carpoolCardTemplate(post, options = {}) {
  const { allowJoinAction = true, allowOwnerActions = true } = options;
  const owner = post.ownerUid === viewerId();
  const joined = isJoined(post);
  const open = isCarpoolOpen(post);
  const left = seatsLeft(post);
  const joinLabel = joined ? 'Leave' : 'Join';

  const actions = [];

  if (!owner && allowJoinAction) {
    actions.push(`<button type="button" class="action-btn subtle" data-carpool-action="${joined ? 'leave' : 'join'}" data-carpool-id="${escapeHtml(post.id)}" ${!joined && (!open || left <= 0) ? 'disabled' : ''}>${joinLabel}</button>`);
  }

  if (owner && allowOwnerActions) {
    actions.push(`<button type="button" class="action-btn subtle" data-carpool-action="toggle-status" data-carpool-id="${escapeHtml(post.id)}">${open ? 'Mark Closed' : 'Reopen'}</button>`);
    actions.push(`<button type="button" class="action-btn subtle danger" data-carpool-action="delete" data-carpool-id="${escapeHtml(post.id)}">Delete</button>`);
  }

  return `
    <article class="travel-card ${open ? 'offer' : 'request'}">
      <div class="travel-card-top">
        <div>
          <h4>${escapeHtml(post.fromCity)} → ${escapeHtml(post.toCity)}</h4>
          <p>${escapeHtml(post.ownerName)} ${owner ? '(You)' : ''}</p>
        </div>
        <div class="travel-pill-row">
          <span class="travel-pill ${open ? 'open' : 'closed'}">${open ? 'Open' : 'Closed'}</span>
          ${joined ? '<span class="travel-pill score">Joined</span>' : ''}
        </div>
      </div>

      <div class="travel-meta-grid">
        <span>📅 ${escapeHtml(formatDateLabel(post.travelDate))}</span>
        <span>⏰ ${escapeHtml(post.timeWindow || 'Time TBD')}</span>
        <span>🪑 Seats left: ${escapeHtml(left)}</span>
        <span>👥 Joined: ${escapeHtml(seatsTaken(post))}</span>
      </div>

      <p class="travel-note">${escapeHtml(post.notes || 'No extra notes shared.')}</p>

      ${actions.length ? `<div class="travel-actions">${actions.join('')}</div>` : ''}
    </article>
  `;
}

function renderCarpoolLists() {
  const feed = document.getElementById('carpool-feed');
  const mine = document.getElementById('carpool-my-list');
  const joined = document.getElementById('carpool-joined-list');
  if (!feed || !mine || !joined) return;

  const sorted = carpoolPosts
    .slice()
    .sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));

  const feedPosts = sorted.filter(post => isCarpoolOpen(post));
  feed.innerHTML = feedPosts.length
    ? feedPosts.map(post => carpoolCardTemplate(post, { allowJoinAction: true, allowOwnerActions: true })).join('')
    : '<p class="travel-empty">No open carpools right now. Post one to get started.</p>';

  const myPosts = sorted.filter(post => post.ownerUid === viewerId());
  mine.innerHTML = myPosts.length
    ? myPosts.map(post => carpoolCardTemplate(post, { allowJoinAction: false, allowOwnerActions: true })).join('')
    : '<p class="travel-empty">You have not posted any carpools yet.</p>';

  const joinedPosts = sorted.filter(post => post.ownerUid !== viewerId() && isJoined(post));
  joined.innerHTML = joinedPosts.length
    ? joinedPosts.map(post => carpoolCardTemplate(post, { allowJoinAction: true, allowOwnerActions: false })).join('')
    : '<p class="travel-empty">You have not joined any carpools yet.</p>';
}

function bindCarpoolEvents() {
  const carpoolRoot = document.getElementById('travel');
  if (!carpoolRoot) return;

  const form = document.getElementById('carpool-form');
  form?.addEventListener('submit', event => {
    event.preventDefault();

    const fromCity = normalizeCity(document.getElementById('carpool-from')?.value || '');
    const toCity = normalizeCity(document.getElementById('carpool-to')?.value || '');
    const travelDate = (document.getElementById('carpool-date')?.value || '').trim();
    const timeWindow = (document.getElementById('carpool-time')?.value || '').trim();
    const seats = Number(document.getElementById('carpool-seats')?.value || 1);
    const notes = String(document.getElementById('carpool-notes')?.value || '').trim();

    if (!fromCity || !toCity || !travelDate || !timeWindow) {
      alert('Please fill all required carpool fields.');
      return;
    }

    if (cityKey(fromCity) === cityKey(toCity)) {
      alert('From and To cannot be the same location.');
      return;
    }

    carpoolPosts.unshift(
      ensureCarpoolShape({
        id: createCarpoolId(),
        fromCity,
        toCity,
        travelDate,
        timeWindow,
        seats,
        notes,
        ownerUid: viewerId(),
        ownerName: viewerName(),
        status: 'open',
        participantIds: [],
        participantNames: [],
        createdAt: new Date().toISOString()
      })
    );

    persistCarpoolPosts();
    form.reset();

    const seatsInput = document.getElementById('carpool-seats');
    if (seatsInput) seatsInput.value = '1';

    alert('✅ Carpool trip posted. Others can now join your route.');
    renderCarpoolLists();
  });

  carpoolRoot.addEventListener('click', event => {
    const button = event.target.closest('[data-carpool-action]');
    if (!button) return;

    const action = button.dataset.carpoolAction;
    const carpoolId = button.dataset.carpoolId;
    if (!action || !carpoolId) return;

    const index = carpoolPosts.findIndex(post => post.id === carpoolId);
    if (index < 0) return;

    const post = carpoolPosts[index];
    const owner = post.ownerUid === viewerId();

    if (action === 'join') {
      if (owner) return;
      if (!isCarpoolOpen(post)) {
        alert('This carpool is closed.');
        return;
      }
      if (isJoined(post)) return;
      if (seatsLeft(post) <= 0) {
        alert('No seats left for this carpool.');
        return;
      }

      post.participantIds = dedupe([...(post.participantIds || []), viewerId()]);
      post.participantNames = dedupe([...(post.participantNames || []), viewerName()]);
      persistCarpoolPosts();
      renderCarpoolLists();
      return;
    }

    if (action === 'leave') {
      post.participantIds = (post.participantIds || []).filter(id => id !== viewerId());
      post.participantNames = (post.participantNames || []).filter(name => name !== viewerName());
      persistCarpoolPosts();
      renderCarpoolLists();
      return;
    }

    if (action === 'toggle-status') {
      if (!owner) return;
      post.status = isCarpoolOpen(post) ? 'closed' : 'open';
      persistCarpoolPosts();
      renderCarpoolLists();
      return;
    }

    if (action === 'delete') {
      if (!owner) return;
      carpoolPosts.splice(index, 1);
      persistCarpoolPosts();
      renderCarpoolLists();
    }
  });

  document.getElementById('carpool-refresh-feed')?.addEventListener('click', () => {
    renderCarpoolLists();
  });
}

export function initTravel() {
  const travelPage = document.getElementById('travel');
  if (!travelPage) return;

  loadState();
  bindTravelTabs();

  bindCompanionEvents();
  bindCarpoolEvents();
  renderCompanionLists();
  renderCarpoolLists();
}
