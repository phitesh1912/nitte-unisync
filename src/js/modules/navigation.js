export function toggleMenu() {
  document.body.classList.toggle('menu-open');
}

let transitionToken = 0;

function ensureTransitionLayer() {
  if (document.getElementById('page-transition-layer')) return;

  const layer = document.createElement('div');
  layer.id = 'page-transition-layer';
  layer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(layer);
}

function applyThemeInjection(pageId) {
  document.body.classList.remove('theme-default', 'theme-entertainment', 'theme-clubs', 'theme-partner');

  if (pageId === 'entertainment') {
    document.body.classList.add('theme-entertainment');
    return;
  }

  if (pageId === 'clubs' || pageId === 'announcements') {
    document.body.classList.add('theme-clubs');
    return;
  }

  if (pageId === 'partner') {
    document.body.classList.add('theme-partner');
    return;
  }

  document.body.classList.add('theme-default');
}

function runPageTransition(pageId, onMidpoint) {
  ensureTransitionLayer();

  transitionToken += 1;
  const token = transitionToken;

  document.body.classList.remove('switch-to-entertainment', 'switch-to-clubs', 'switch-to-partner', 'switch-to-default');
  document.body.classList.add('is-switching');

  if (pageId === 'entertainment') {
    document.body.classList.add('switch-to-entertainment');
  } else if (pageId === 'clubs' || pageId === 'announcements') {
    document.body.classList.add('switch-to-clubs');
  } else if (pageId === 'partner') {
    document.body.classList.add('switch-to-partner');
  } else {
    document.body.classList.add('switch-to-default');
  }

  setTimeout(() => {
    if (token !== transitionToken) return;
    onMidpoint();
  }, 140);

  setTimeout(() => {
    if (token !== transitionToken) return;
    document.body.classList.remove('is-switching', 'switch-to-entertainment', 'switch-to-clubs', 'switch-to-partner', 'switch-to-default');
  }, 420);
}

function applyPageMode(pageId) {
  const pageClasses = Array.from(document.querySelectorAll('.page'))
    .map(page => `mode-${page.id}`);

  if (pageClasses.length) {
    document.body.classList.remove(...pageClasses);
  }

  document.body.classList.add(`mode-${pageId}`);
  document.body.dataset.activePage = pageId;
}

export function showPage(pageId) {
  const cinematic = pageId === 'partner' || pageId === 'entertainment';

  runPageTransition(pageId, () => {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    const el = document.getElementById(pageId);
    if (el) el.style.display = 'block';

    applyPageMode(pageId);
    applyThemeInjection(pageId);

    document.body.classList.toggle('cinema-mode', cinematic);
    document.body.classList.toggle('partner-cinema-mode', pageId === 'partner');
    document.body.classList.toggle('entertainment-cinema-mode', pageId === 'entertainment');

    document.querySelectorAll('#sidebar .nav-link[data-page-link]').forEach(link => {
      const isActive = link.dataset.pageLink === pageId;
      link.classList.toggle('active', isActive);
    });

    document.body.classList.remove('menu-open');
  });
}

export function initNavigation() {
  document.body.classList.remove('menu-open');
  document.body.classList.remove('cinema-mode', 'partner-cinema-mode', 'entertainment-cinema-mode');
  ensureTransitionLayer();

  const currentVisible = Array.from(document.querySelectorAll('.page')).find(
    p => p.style.display !== 'none'
  );

  const activePage = currentVisible?.id || 'home';
  const cinematic = activePage === 'partner' || activePage === 'entertainment';

  applyPageMode(activePage);
  applyThemeInjection(activePage);

  document.body.classList.toggle('cinema-mode', cinematic);
  document.body.classList.toggle('partner-cinema-mode', activePage === 'partner');
  document.body.classList.toggle('entertainment-cinema-mode', activePage === 'entertainment');

  document.querySelectorAll('#sidebar .nav-link[data-page-link]').forEach(link => {
    link.classList.toggle('active', link.dataset.pageLink === activePage);
  });
}