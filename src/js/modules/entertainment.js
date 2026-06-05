const TITLES = [
  {
    id: 'black-adam',
    title: 'Black Adam',
    kind: 'Movie',
    release: '2022',
    runtime: 124,
    views: 2300000,
    ending: 'bittersweet',
    imdb: 6.7,
    rotten: 39,
    letterboxd: 2.4,
    genres: ['Action', 'Fantasy'],
    tags: ['Heroic', 'Fast pacing', 'High-contrast visuals', 'Dark'],
    dna: { pace: 88, nonlinear: 22, humor: 30, contrast: 85 },
    mood: { brain: 30, energy: 90, palette: 24, social: 78 },
    rows: ['top10', 'trending'],
    plot: 'Ancient power wakes up to challenge modern heroes in a brutal anti-hero showdown.',
    vibeClip: 'Thunder cracks, ancient temple glow, and one massive punchline (literally).',
    comments: ['Too loud, but in the best way.', 'Massive screen presence, popcorn approved.'],
    poster: 'linear-gradient(165deg, rgba(18,28,44,.35), rgba(4,6,10,.9)), radial-gradient(100% 90% at 70% 10%, rgba(200,140,78,.36), transparent 55%), #0f141d'
  },
  {
    id: 'solo-leveling',
    title: 'Solo Leveling',
    kind: 'Anime',
    release: '2024',
    runtime: 96,
    views: 890000,
    ending: 'open',
    imdb: 8.5,
    rotten: 93,
    letterboxd: 4.1,
    genres: ['Anime', 'Action', 'Fantasy'],
    tags: ['Fast pacing', 'Heroic', 'High-contrast visuals', 'Adrenaline'],
    dna: { pace: 92, nonlinear: 34, humor: 18, contrast: 88 },
    mood: { brain: 45, energy: 92, palette: 30, social: 74 },
    rows: ['top10', 'trending', 'new'],
    plot: 'A weak hunter unlocks a game-like power system and rises with every battle.',
    vibeClip: 'Dungeon doors open, UI flashes, and the bass drop lands with every strike.',
    comments: ['Animation quality is insane.', 'Feels like a hype engine every episode.'],
    poster: 'linear-gradient(165deg, rgba(14,18,39,.32), rgba(7,8,18,.92)), radial-gradient(120% 86% at 24% 18%, rgba(66,122,255,.44), transparent 54%), #141d39'
  },
  {
    id: 'frieren',
    title: 'Frieren: Beyond Journey’s End',
    kind: 'Anime',
    release: '2023',
    runtime: 106,
    views: 620000,
    ending: 'hopeful',
    imdb: 9.0,
    rotten: 97,
    letterboxd: 4.5,
    genres: ['Anime', 'Drama', 'Fantasy'],
    tags: ['Bittersweet', 'Slow burn', 'Wholesome', 'Beautiful visuals'],
    dna: { pace: 38, nonlinear: 42, humor: 35, contrast: 60 },
    mood: { brain: 66, energy: 36, palette: 68, social: 26 },
    rows: ['trending', 'new'],
    plot: 'After the demon king falls, an immortal mage learns what fleeting human time truly means.',
    vibeClip: 'Windy fields, soft strings, and emotional silence between old memories.',
    comments: ['Quietly devastating in the best way.', 'A healing watch after burnout.'],
    poster: 'linear-gradient(165deg, rgba(12,28,26,.28), rgba(8,10,16,.88)), radial-gradient(120% 80% at 20% 16%, rgba(121,210,172,.36), transparent 58%), #1a2f2f'
  },
  {
    id: 'john-wick-4',
    title: 'John Wick: Chapter 4',
    kind: 'Movie',
    release: '2023',
    runtime: 169,
    views: 1700000,
    ending: 'bittersweet',
    imdb: 7.7,
    rotten: 94,
    letterboxd: 3.9,
    genres: ['Action', 'Thriller'],
    tags: ['Fast pacing', 'Dark', 'High-contrast visuals', 'Heroic'],
    dna: { pace: 95, nonlinear: 28, humor: 15, contrast: 90 },
    mood: { brain: 44, energy: 95, palette: 20, social: 58 },
    rows: ['top10'],
    plot: 'An assassin fights through a global underworld for one final shot at freedom.',
    vibeClip: 'Neon rain, cathedral shadows, and uninterrupted combat flow.',
    comments: ['Action choreography masterclass.', 'Zero filler, all momentum.'],
    poster: 'linear-gradient(160deg, rgba(14,20,38,.26), rgba(5,8,16,.92)), radial-gradient(120% 80% at 76% 16%, rgba(102,155,255,.42), transparent 52%), #111a2f'
  },
  {
    id: 'dune-part-two',
    title: 'Dune: Part Two',
    kind: 'Movie',
    release: '2024',
    runtime: 166,
    views: 1320000,
    ending: 'dark',
    imdb: 8.6,
    rotten: 92,
    letterboxd: 4.2,
    genres: ['Sci-Fi', 'Drama'],
    tags: ['Epic', 'Dark', 'High-contrast visuals', 'Complex'],
    dna: { pace: 58, nonlinear: 46, humor: 8, contrast: 92 },
    mood: { brain: 82, energy: 66, palette: 18, social: 48 },
    rows: ['top10', 'new'],
    plot: 'A prophecy, a revolution, and a war for Arrakis reshape the fate of an empire.',
    vibeClip: 'Sandstorms, war drums, and visual scale that crushes your screen.',
    comments: ['The sound design is unreal.', 'Every frame looks like a poster.'],
    poster: 'linear-gradient(165deg, rgba(40,27,16,.3), rgba(9,7,6,.9)), radial-gradient(120% 84% at 70% 18%, rgba(255,168,96,.38), transparent 54%), #3b2b1e'
  },
  {
    id: 'deadpool',
    title: 'Deadpool',
    kind: 'Movie',
    release: '2016',
    runtime: 108,
    views: 2500000,
    ending: 'happy',
    imdb: 8.0,
    rotten: 85,
    letterboxd: 3.7,
    genres: ['Action', 'Comedy'],
    tags: ['Fast pacing', 'Humor', 'Heroic', 'Bright'],
    dna: { pace: 84, nonlinear: 34, humor: 95, contrast: 74 },
    mood: { brain: 36, energy: 82, palette: 70, social: 86 },
    rows: ['top10'],
    plot: 'A merc with a mouth burns through enemies and fourth walls in equal measure.',
    vibeClip: 'Jokes, blood, and self-aware chaos in one clean combo.',
    comments: ['Perfect for group watch nights.', 'Meta humor still works so well.'],
    poster: 'linear-gradient(170deg, rgba(60,8,20,.3), rgba(12,4,8,.9)), radial-gradient(120% 80% at 80% 18%, rgba(255,70,100,.45), transparent 55%), #2a0f1f'
  },
  {
    id: 'jujutsu-kaisen',
    title: 'Jujutsu Kaisen',
    kind: 'Anime',
    release: '2023',
    runtime: 110,
    views: 1500000,
    ending: 'mixed',
    imdb: 8.7,
    rotten: 96,
    letterboxd: 4.3,
    genres: ['Anime', 'Action', 'Supernatural'],
    tags: ['Fast pacing', 'Dark', 'Heroic', 'High-contrast visuals'],
    dna: { pace: 90, nonlinear: 40, humor: 42, contrast: 86 },
    mood: { brain: 58, energy: 90, palette: 26, social: 72 },
    rows: ['trending'],
    plot: 'Teen sorcerers battle curses while balancing trauma, duty, and absurd power scaling.',
    vibeClip: 'Rapid cuts, cursed energy surges, and emotional gut-punches.',
    comments: ['S2 is genuinely wild.', 'Best combat direction right now.'],
    poster: 'linear-gradient(170deg, rgba(12,14,30,.3), rgba(6,6,14,.92)), radial-gradient(120% 80% at 20% 18%, rgba(114,103,255,.42), transparent 52%), #191b3a'
  },
  {
    id: 'apothecary-diaries',
    title: 'The Apothecary Diaries',
    kind: 'Anime',
    release: '2023',
    runtime: 98,
    views: 540000,
    ending: 'hopeful',
    imdb: 8.6,
    rotten: 95,
    letterboxd: 4.0,
    genres: ['Anime', 'Mystery', 'Drama'],
    tags: ['Complex', 'Non-linear storytelling', 'Wholesome', 'Slow burn'],
    dna: { pace: 44, nonlinear: 68, humor: 50, contrast: 64 },
    mood: { brain: 84, energy: 36, palette: 62, social: 30 },
    rows: ['trending', 'new'],
    plot: 'A sharp-minded apothecary solves palace mysteries with wit and subtle rebellion.',
    vibeClip: 'Lantern-lit palace intrigue with quiet detective energy.',
    comments: ['Perfect if you want smart and calm.', 'The lead is iconic.'],
    poster: 'linear-gradient(165deg, rgba(18,22,15,.3), rgba(7,9,6,.9)), radial-gradient(120% 82% at 80% 20%, rgba(209,175,95,.35), transparent 56%), #2d3123'
  },
  {
    id: 'inception',
    title: 'Inception',
    kind: 'Movie',
    release: '2010',
    runtime: 148,
    views: 3200000,
    ending: 'bittersweet',
    imdb: 8.8,
    rotten: 87,
    letterboxd: 4.2,
    genres: ['Sci-Fi', 'Thriller'],
    tags: ['Complex', 'Non-linear storytelling', 'High-contrast visuals', 'Dark'],
    dna: { pace: 70, nonlinear: 96, humor: 18, contrast: 84 },
    mood: { brain: 92, energy: 70, palette: 22, social: 34 },
    rows: ['top10'],
    plot: 'A thief enters layered dreams to plant an idea while battling his own subconscious.',
    vibeClip: 'Cities fold, gravity breaks, and your brain clocks overtime.',
    comments: ['Still the benchmark for mind-bending thrillers.', 'That ending remains undefeated.'],
    poster: 'linear-gradient(170deg, rgba(20,24,36,.3), rgba(7,8,14,.9)), radial-gradient(120% 80% at 20% 18%, rgba(110,146,215,.34), transparent 55%), #1a2338'
  },
  {
    id: 'blue-lock',
    title: 'Blue Lock',
    kind: 'Anime',
    release: '2022',
    runtime: 96,
    views: 760000,
    ending: 'open',
    imdb: 8.2,
    rotten: 90,
    letterboxd: 3.8,
    genres: ['Anime', 'Sports'],
    tags: ['Adrenaline', 'Heroic', 'Fast pacing', 'Group watch'],
    dna: { pace: 82, nonlinear: 36, humor: 38, contrast: 76 },
    mood: { brain: 48, energy: 84, palette: 60, social: 88 },
    rows: ['trending', 'new'],
    plot: 'A ruthless football program turns strikers into ego-driven finishing machines.',
    vibeClip: 'Stadium roars, ego monologues, and impossible goals every episode.',
    comments: ['So extra, so fun.', 'Best for hype sessions with friends.'],
    poster: 'linear-gradient(165deg, rgba(8,30,38,.3), rgba(6,10,14,.9)), radial-gradient(120% 84% at 18% 18%, rgba(75,212,255,.36), transparent 56%), #16343f'
  },
  {
    id: 'spy-family',
    title: 'Spy x Family',
    kind: 'Anime',
    release: '2023',
    runtime: 94,
    views: 1040000,
    ending: 'happy',
    imdb: 8.4,
    rotten: 92,
    letterboxd: 3.9,
    genres: ['Anime', 'Comedy', 'Action'],
    tags: ['Wholesome', 'Humor', 'Bright', 'Group watch'],
    dna: { pace: 68, nonlinear: 22, humor: 88, contrast: 62 },
    mood: { brain: 42, energy: 64, palette: 78, social: 90 },
    rows: ['new'],
    plot: 'A fake family of spies, assassins, and telepaths tries to act normal and keeps failing adorably.',
    vibeClip: 'Cute chaos, secret missions, and nonstop reaction-face comedy.',
    comments: ['Comfort anime with style.', 'Easy recommendation for mixed groups.'],
    poster: 'linear-gradient(165deg, rgba(20,24,48,.26), rgba(9,10,16,.88)), radial-gradient(120% 80% at 80% 14%, rgba(245,148,168,.34), transparent 56%), #2a314f'
  },
  {
    id: 'silent-voice',
    title: 'A Silent Voice',
    kind: 'Movie',
    release: '2016',
    runtime: 130,
    views: 680000,
    ending: 'bittersweet',
    imdb: 8.1,
    rotten: 95,
    letterboxd: 4.3,
    genres: ['Anime', 'Drama'],
    tags: ['Bittersweet', 'Emotional', 'Wholesome', 'Slow burn'],
    dna: { pace: 36, nonlinear: 44, humor: 20, contrast: 55 },
    mood: { brain: 70, energy: 26, palette: 62, social: 20 },
    rows: ['new'],
    plot: 'A former bully seeks redemption years after harming a deaf classmate.',
    vibeClip: 'Rainy sidewalks, soft piano, and hard truths spoken gently.',
    comments: ['Painful and beautiful.', 'One of the best redemption arcs.'],
    poster: 'linear-gradient(165deg, rgba(12,18,28,.3), rgba(8,10,14,.9)), radial-gradient(120% 88% at 18% 20%, rgba(123,183,240,.34), transparent 56%), #21364a'
  }
];

const LIVE_ACTIVITY = [
  'Ishita tagged Jujutsu Kaisen as #Heroic #Dark',
  'Ravi rated Frieren 9/10 — "calm but deep"',
  'Maya posted: "Need bittersweet + action recs"',
  'Arjun marked Solo Leveling as #Adrenaline',
  'Nisha added Blue Lock to Group Watch list',
  'Farhan reviewed Dune: Part Two — "visual beast"'
];

const ROW_CONFIG = {
  top10: { label: 'Top 10 Global', trackId: 'row-top10-track', blockId: 'row-top10-block' },
  trending: { label: 'Top 10 Anime', trackId: 'row-trending-track', blockId: 'row-trending-block' },
  new: { label: 'New Series', trackId: 'row-new-track', blockId: 'row-new-block' },
  perfect: { label: 'Perfect For Your Vibe', trackId: 'row-perfect-track', blockId: 'row-perfect-block' }
};

const TMDB_KEY = String(import.meta.env?.VITE_TMDB_API_KEY || '').trim();
const OMDB_KEY = String(import.meta.env?.VITE_OMDB_API_KEY || '').trim();
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w780';
const TMDB_POSTER_BASE = 'https://image.tmdb.org/t/p/w342';

const TMDB_GENRE_MAP = {
  12: 'Adventure',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  27: 'Horror',
  28: 'Action',
  35: 'Comedy',
  53: 'Thriller',
  80: 'Crime',
  878: 'Sci-Fi',
  9648: 'Mystery',
  10749: 'Romance',
  10751: 'Family',
  10752: 'War'
};

const LOCAL_POSTER_PATHS = {
  'black adam': '/3zXceNTtyj5FLjwQXuPvLYK5YYL.jpg',
  'solo leveling': '/qszQEDhQ3fM4QdX90qVxyh6Y3mA.jpg',
  'frieren: beyond journey’s end': '/dqZENchTd7lp5zht7BdlqM7RBhD.jpg',
  'john wick: chapter 4': '/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
  'dune: part two': '/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
  deadpool: '/zSGpTHYt0QgQ7Y4JbU2C5n5BfKQ.jpg',
  'jujutsu kaisen': '/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg',
  'the apothecary diaries': '/8hYlW7Y2wKzQ8aB7Qz6x5Qh9W3m.jpg',
  inception: '/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
  'blue lock': '/s4J3T7vAd2g5J4nYk5E1L2QxR2l.jpg',
  'spy x family': '/3r4LYFuXrg3G8fepysr4xSLWnQL.jpg',
  'a silent voice': '/tuFaWiqX0TXoWu7DGNcmX3UW7sT.jpg'
};

const state = {
  catalog: hasUsableKey(TMDB_KEY) ? [] : [...TITLES],
  scored: [],
  byId: new Map(),
  activeId: null,
  activeRow: 'perfect',
  hasRemoteHydrated: false,
  tmdbLastQuery: '',
  tmdbRefreshId: null,
  tmdbCollections: {
    day: [],
    week: [],
    popular: [],
    topRated: [],
    anime: []
  },
  expandedAnchorEl: null
};

function getEl(id) {
  return document.getElementById(id);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatViews(value) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M views`;
  return `${Math.round(value / 1000)}K views`;
}

function formatEndTime(runtime) {
  const end = new Date(Date.now() + runtime * 60000);
  return end.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function reliability(movie) {
  return clamp(
    (movie.imdb * 10) * 0.45 + movie.rotten * 0.35 + (movie.letterboxd * 20) * 0.2,
    0,
    100
  );
}

function lower(value) {
  return String(value || '').toLowerCase();
}

function hasUsableKey(rawKey) {
  const key = String(rawKey || '').trim();
  return key.length > 6 && !lower(key).startsWith('your_');
}

function dedupe(values = []) {
  return Array.from(new Set(values.filter(Boolean)));
}

function parseRuntimeFromText(value, fallback = 104) {
  const text = String(value || '').toLowerCase();
  if (!text) return fallback;

  const hours = Number((text.match(/(\d+)\s*hr/) || [])[1] || 0);
  const minutes = Number((text.match(/(\d+)\s*min/) || [])[1] || 0);

  if (!hours && !minutes) return fallback;
  return clamp(hours * 60 + minutes, 70, 220);
}

function posterBackground(imageUrl, fallback = '#1a2338') {
  if (!imageUrl) {
    return `linear-gradient(165deg, rgba(16, 21, 35, .32), rgba(8, 10, 18, .92)), ${fallback}`;
  }

  const safe = encodeURI(String(imageUrl));
  return `linear-gradient(180deg, rgba(6, 8, 14, .08), rgba(7, 9, 16, .72)), url(${safe}) center / cover no-repeat`;
}

function formatReleaseDate(value) {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return 'Date TBA';
  return date.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' });
}

function tmdbPosterUrl(path) {
  if (!path) return '';
  return `${TMDB_POSTER_BASE}${path}`;
}

function clearFloatingPanelStyle(panel) {
  if (!panel) return;
  panel.classList.remove('contextual-open');
  ['top', 'left', 'right', 'bottom', 'width', 'maxHeight'].forEach(prop => {
    panel.style.removeProperty(prop);
  });
}

function positionPanelBesideAnchor(panel, anchorEl) {
  if (!panel || panel.hidden) return;

  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const gutter = 12;

  panel.classList.add('contextual-open');

  if (!anchorEl || viewportWidth <= 720) {
    panel.style.left = `${gutter}px`;
    panel.style.right = `${gutter}px`;
    panel.style.bottom = `${gutter}px`;
    panel.style.top = 'auto';
    panel.style.width = 'auto';
    panel.style.maxHeight = '62vh';
    return;
  }

  const rect = anchorEl.getBoundingClientRect();
  const panelWidth = Math.min(420, viewportWidth - gutter * 2);
  panel.style.width = `${panelWidth}px`;
  panel.style.maxHeight = '72vh';

  const panelHeight = panel.getBoundingClientRect().height || 420;
  const spaceRight = viewportWidth - rect.right - gutter;
  const spaceLeft = rect.left - gutter;
  const placeRight = spaceRight >= panelWidth || spaceRight >= spaceLeft;

  let left = placeRight
    ? rect.right + 10
    : rect.left - panelWidth - 10;
  left = clamp(left, gutter, viewportWidth - panelWidth - gutter);

  let top = clamp(rect.top, gutter, viewportHeight - panelHeight - gutter);
  if (!Number.isFinite(top)) top = gutter;

  panel.style.left = `${Math.round(left)}px`;
  panel.style.top = `${Math.round(top)}px`;
  panel.style.right = 'auto';
  panel.style.bottom = 'auto';
}

function syncExpandedPanelPosition() {
  const expanded = getEl('expanded-card');
  if (!expanded || expanded.hidden) return;
  positionPanelBesideAnchor(expanded, state.expandedAnchorEl);
}

function fallbackPosterForTitle(title) {
  const path = LOCAL_POSTER_PATHS[lower(title)];
  return path ? `${TMDB_POSTER_BASE}${path}` : '';
}

function inferVibeFromGenres(genres = []) {
  const normalized = new Set(genres.map(lower));

  const dna = { pace: 62, nonlinear: 40, humor: 35, contrast: 68 };
  const mood = { brain: 56, energy: 60, palette: 48, social: 52 };
  const tags = [];

  const hasAny = (...items) => items.some(item => normalized.has(lower(item)));

  if (hasAny('Action', 'Adventure', 'Thriller')) {
    dna.pace = 86;
    mood.energy = 88;
    tags.push('Fast pacing', 'Heroic');
  }

  if (hasAny('Comedy', 'Family', 'Romance')) {
    dna.humor = 86;
    mood.palette = 78;
    mood.social = 80;
    tags.push('Humor', 'Bright', 'Group watch');
  }

  if (hasAny('Sci-Fi', 'Mystery', 'Drama')) {
    dna.nonlinear = 72;
    mood.brain = 84;
    tags.push('Complex', 'Non-linear storytelling');
  }

  if (hasAny('Horror', 'Crime', 'War', 'Thriller')) {
    mood.palette = 22;
    dna.contrast = 88;
    tags.push('Dark', 'High-contrast visuals');
  }

  if (hasAny('Animation', 'Anime', 'Fantasy')) {
    tags.push('High-contrast visuals');
  }

  const ending = hasAny('Horror', 'Crime', 'War')
    ? 'dark'
    : hasAny('Drama', 'Mystery')
      ? 'bittersweet'
      : 'open';

  return { dna, mood, tags: dedupe(tags), ending };
}

function mergeCatalog(localCatalog, remoteCatalog) {
  if (!remoteCatalog.length) return [...localCatalog];

  const merged = new Map(localCatalog.map(item => [lower(item.title), { ...item }]));

  remoteCatalog.forEach(item => {
    const key = lower(item.title);
    if (!key) return;

    const current = merged.get(key);
    if (!current) {
      merged.set(key, item);
      return;
    }

    merged.set(key, {
      ...current,
      ...item,
      genres: dedupe([...(current.genres || []), ...(item.genres || [])]),
      tags: dedupe([...(current.tags || []), ...(item.tags || [])]),
      rows: dedupe([...(current.rows || []), ...(item.rows || [])]),
      comments: item.comments?.length ? item.comments : current.comments
    });
  });

  return Array.from(merged.values());
}

function mapTmdbMovie(item) {
  const title = item?.title;
  if (!title) return null;

  const releaseYear = Number(String(item.release_date || '').slice(0, 4)) || new Date().getFullYear();
  const genres = (item.genres || []).map(genre => genre.name).filter(Boolean);
  const { dna, mood, tags, ending } = inferVibeFromGenres(genres);
  const rating = clamp(Number(item.vote_average) || 7.4, 0, 10);
  const popularity = Number(item.popularity) || 100;
  const runtime = clamp(Number(item.runtime) || 110, 75, 240);
  const voteCount = Number(item.vote_count) || 0;

  const primaryLanguage = String(item.original_language || '').toUpperCase() || 'EN';
  const companies = (item.production_companies || []).map(company => company.name).filter(Boolean);
  const countries = (item.production_countries || []).map(country => country.iso_3166_1).filter(Boolean);

  const rows = ['top10'];
  if (releaseYear >= new Date().getFullYear() - 1) rows.push('new');

  return {
    id: `tmdb-${item.id}`,
    title,
    kind: 'Movie',
    release: String(releaseYear),
    runtime,
    views: Math.max(Math.round(popularity * 12000), voteCount * 220),
    ending,
    imdb: Number(rating.toFixed(1)),
    rotten: clamp(Math.round(rating * 10 + 4), 42, 98),
    letterboxd: clamp(Number((rating / 2 + 0.2).toFixed(1)), 2.0, 4.8),
    genres: dedupe(genres.length ? genres : ['Action']),
    tags: dedupe(tags.length ? tags : ['Fast pacing', 'High-contrast visuals']),
    dna,
    mood,
    rows,
    plot: item.overview || 'Freshly trending movie pick with strong watch momentum.',
    vibeClip: `High-energy moments from ${title} are trending right now.`,
    comments: ['Live trend data just pulled from TMDB.', 'Good candidate for tonight\'s watchlist.'],
    posterUrl: tmdbPosterUrl(item.poster_path) || (item.backdrop_path ? `${TMDB_IMAGE_BASE}${item.backdrop_path}` : ''),
    poster: posterBackground(
      item.backdrop_path
        ? `${TMDB_IMAGE_BASE}${item.backdrop_path}`
        : item.poster_path
          ? `${TMDB_IMAGE_BASE}${item.poster_path}`
          : '',
      '#1d2235'
    ),
    source: {
      provider: 'TMDB',
      tmdbId: item.id,
      originalTitle: item.original_title || title,
      originalLanguage: primaryLanguage,
      popularity,
      voteAverage: rating,
      voteCount,
      adult: Boolean(item.adult),
      status: item.status || 'Released',
      tagline: item.tagline || '',
      countries,
      companies
    }
  };
}

function mapJikanAnime(item) {
  const title = item?.title_english || item?.title;
  if (!title) return null;

  const genreList = [
    'Anime',
    ...(item.genres || []).map(genre => genre.name),
    ...(item.themes || []).map(theme => theme.name)
  ];

  const { dna, mood, tags, ending } = inferVibeFromGenres(genreList);
  const score = clamp(Number(item.score) || 7.8, 0, 10);
  const members = Number(item.members) || 500000;

  const rows = ['anime'];
  if ((item.year || 0) >= new Date().getFullYear() - 1) rows.push('new');

  return {
    id: `jikan-${item.mal_id}`,
    title,
    kind: 'Anime',
    release: String(item.year || new Date().getFullYear()),
    runtime: parseRuntimeFromText(item.duration, 96),
    views: members,
    ending,
    imdb: Number(score.toFixed(1)),
    rotten: clamp(Math.round(score * 10 + 5), 52, 99),
    letterboxd: clamp(Number((score / 2 + 0.25).toFixed(1)), 2.2, 4.9),
    genres: dedupe(genreList),
    tags: dedupe(tags.length ? tags : ['Fast pacing', 'Heroic']),
    dna,
    mood,
    rows,
    plot: item.synopsis || 'Popular anime with strong momentum in the community right now.',
    vibeClip: `${title} is peaking on anime charts — fast, addictive, and high-energy.`,
    comments: ['Picked from live anime charts.', 'Solid option for your current mood profile.'],
    posterUrl: item.images?.jpg?.large_image_url || item.images?.jpg?.image_url || '',
    poster: posterBackground(item.images?.jpg?.large_image_url || item.images?.jpg?.image_url || '', '#19243a'),
    source: {
      provider: 'Jikan',
      malId: item.mal_id,
      rank: item.rank || null,
      popularityRank: item.popularity || null,
      members,
      scoredBy: item.scored_by || null,
      episodes: item.episodes || null,
      status: item.status || '',
      season: item.season || '',
      year: item.year || null,
      studios: (item.studios || []).map(studio => studio.name).filter(Boolean)
    }
  };
}

async function fetchTmdbMovieDetails(id) {
  if (!id || !hasUsableKey(TMDB_KEY)) return null;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${encodeURIComponent(id)}?api_key=${encodeURIComponent(TMDB_KEY)}&language=en-US`
    );

    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.warn('TMDB movie details fetch failed:', error);
    return null;
  }
}

async function fetchTmdbMovieList(path, limit = 10) {
  if (!hasUsableKey(TMDB_KEY)) return [];

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${path}?api_key=${encodeURIComponent(TMDB_KEY)}&language=en-US&page=1`
    );

    if (!response.ok) return [];

    const payload = await response.json();
    const topItems = (payload.results || []).slice(0, limit);

    const detailed = await Promise.all(topItems.map(item => fetchTmdbMovieDetails(item.id)));
    return detailed.map(mapTmdbMovie).filter(Boolean);
  } catch (error) {
    console.warn('TMDB list fetch failed:', error);
    return [];
  }
}

async function fetchTmdbTrendingMovies() {
  const [trending, popular, topRated] = await Promise.all([
    fetchTmdbMovieList('trending/movie/week', 10),
    fetchTmdbMovieList('movie/popular', 12),
    fetchTmdbMovieList('movie/top_rated', 12)
  ]);

  return mergeCatalog(trending, mergeCatalog(popular, topRated));
}

async function fetchJikanTrendingAnime() {
  try {
    const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=12');
    if (!response.ok) return [];

    const payload = await response.json();
    return (payload.data || []).slice(0, 12).map(mapJikanAnime).filter(Boolean);
  } catch (error) {
    console.warn('Jikan anime fetch failed:', error);
    return [];
  }
}

async function enhanceWithOmdbRatings(items) {
  if (!hasUsableKey(OMDB_KEY) || !items.length) return items;

  const candidates = items.filter(item => item.kind === 'Movie').slice(0, 6);

  const updates = await Promise.all(candidates.map(async item => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${encodeURIComponent(OMDB_KEY)}&t=${encodeURIComponent(item.title)}&y=${encodeURIComponent(item.release)}`
      );

      if (!response.ok) return null;
      const payload = await response.json();
      if (payload?.Response !== 'True') return null;

      const imdbRating = clamp(Number(payload.imdbRating) || item.imdb, 0, 10);
      return {
        id: item.id,
        imdb: Number(imdbRating.toFixed(1)),
        rotten: clamp(Math.round(imdbRating * 10 + 6), 40, 99),
        letterboxd: clamp(Number((imdbRating / 2 + 0.2).toFixed(1)), 2.0, 4.9)
      };
    } catch (error) {
      console.warn('OMDb rating lookup failed:', error);
      return null;
    }
  }));

  const patchById = new Map(updates.filter(Boolean).map(item => [item.id, item]));
  return items.map(item => (patchById.has(item.id) ? { ...item, ...patchById.get(item.id) } : item));
}

async function hydrateRemoteCatalog() {
  if (state.hasRemoteHydrated) return;
  state.hasRemoteHydrated = true;

  const [tmdb, jikan] = await Promise.all([
    fetchTmdbTrendingMovies(),
    fetchJikanTrendingAnime()
  ]);

  const remote = [...tmdb, ...jikan];
  const remoteWithRatings = await enhanceWithOmdbRatings(remote);
  state.catalog = remoteWithRatings.length ? remoteWithRatings : [...TITLES];
  runEngine();
}

function fallbackTrendingCards() {
  const picks = [...state.catalog]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 12);

  return picks.map(item => ({
    id: item.id,
    title: item.title,
    dateLabel: item.release ? `Jan 1, ${item.release}` : 'Date TBA',
    mediaType: lower(item.kind) === 'anime' ? 'tv' : 'movie',
    poster: item.posterUrl || fallbackPosterForTitle(item.title),
    backdrop: '',
    raw: item,
    score: item.imdb || 0,
    year: item.release || ''
  }));
}

function fallbackAnimeCards() {
  const picks = [...state.catalog]
    .filter(item => lower(item.kind) === 'anime' || item.rows?.includes('anime'))
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 16);

  return picks.map(item => ({
    id: item.id,
    title: item.title,
    dateLabel: item.release ? `Jan 1, ${item.release}` : 'Date TBA',
    mediaType: 'anime',
    poster: item.posterUrl || fallbackPosterForTitle(item.title),
    backdrop: '',
    raw: item,
    score: item.imdb || 0,
    year: item.release || '',
    overview: item.plot || ''
  }));
}

function mapTmdbShowcaseCard(item) {
  if (!item) return null;
  const title = item.title || item.name;
  if (!title) return null;

  const releaseDate = item.release_date || item.first_air_date || '';
  const mediaType = item.media_type || (item.first_air_date ? 'tv' : 'movie');
  const overview = item.overview || '';
  const year = String(releaseDate || '').slice(0, 4);
  const poster = item.poster_path
    ? `${TMDB_POSTER_BASE}${item.poster_path}`
    : item.backdrop_path
      ? `${TMDB_IMAGE_BASE}${item.backdrop_path}`
      : '';

  return {
    id: `${mediaType}-${item.id}`,
    title,
    dateLabel: formatReleaseDate(releaseDate),
    mediaType,
    poster,
    backdrop: item.backdrop_path ? `${TMDB_IMAGE_BASE}${item.backdrop_path}` : '',
    raw: item,
    score: Number(item.vote_average) || 0,
    year,
    overview
  };
}

function mapJikanShowcaseCard(item) {
  if (!item) return null;

  const title = item.title_english || item.title;
  if (!title) return null;

  const airedFrom = item.aired?.from || '';
  const year = String(item.year || airedFrom.slice(0, 4) || '');
  const poster = item.images?.jpg?.large_image_url || item.images?.jpg?.image_url || '';

  return {
    id: `anime-${item.mal_id}`,
    title,
    dateLabel: airedFrom ? formatReleaseDate(airedFrom) : year ? `Jan 1, ${year}` : 'Date TBA',
    mediaType: 'anime',
    poster,
    backdrop: '',
    raw: item,
    score: Number(item.score) || 0,
    year,
    overview: item.synopsis || ''
  };
}

async function fetchTmdbShowcase({ endpoint = 'trending/all/day', query = '' } = {}) {
  if (!hasUsableKey(TMDB_KEY)) return fallbackTrendingCards();

  const q = String(query || '').trim();

  try {
    const endpointUrl = q
      ? `https://api.themoviedb.org/3/search/multi?api_key=${encodeURIComponent(TMDB_KEY)}&language=en-US&query=${encodeURIComponent(q)}&page=1&include_adult=false`
      : `https://api.themoviedb.org/3/${String(endpoint).replace(/^\/+/, '')}?api_key=${encodeURIComponent(TMDB_KEY)}&language=en-US&page=1`;

    const response = await fetch(endpointUrl);
    if (!response.ok) return fallbackTrendingCards();

    const payload = await response.json();
    return (payload.results || payload.data || [])
      .filter(item => item.media_type !== 'person')
      .slice(0, 16)
      .map(mapTmdbShowcaseCard)
      .filter(Boolean);
  } catch (error) {
    console.warn('TMDB showcase fetch failed:', error);
    return fallbackTrendingCards();
  }
}

async function fetchJikanAnimeShowcase(limit = 16) {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=${encodeURIComponent(limit)}`);
    if (!response.ok) return fallbackAnimeCards();

    const payload = await response.json();
    const cards = (payload.data || [])
      .slice(0, limit)
      .map(mapJikanShowcaseCard)
      .filter(Boolean);

    return cards.length ? cards : fallbackAnimeCards();
  } catch (error) {
    console.warn('Jikan anime showcase fetch failed:', error);
    return fallbackAnimeCards();
  }
}

async function fetchAllSections() {
  const [today, week, popular, topRated, anime] = await Promise.all([
    fetchTmdbShowcase({ endpoint: 'trending/all/day' }),
    fetchTmdbShowcase({ endpoint: 'trending/all/week' }),
    fetchTmdbShowcase({ endpoint: 'movie/popular' }),
    fetchTmdbShowcase({ endpoint: 'movie/top_rated' }),
    fetchJikanAnimeShowcase(16)
  ]);

  return { today, week, popular, topRated, anime };
}

function tmdbCardTemplate(card) {
  const poster = card.poster || 'https://dummyimage.com/342x513/1f2736/ffffff&text=No+Poster';
  const rating = card.score ? `⭐ ${Number(card.score).toFixed(1)}` : '⭐ --';
  const year = card.year || '—';
  return `
    <article class="tmdb-trend-card" data-card-id="${card.id}" data-title="${card.title}">
      <div class="tmdb-trend-poster">
        <img src="${poster}" alt="${card.title}" loading="lazy" />
        <div class="tmdb-card-overlay">
          <span>${rating}</span>
          <span>${year}</span>
        </div>
      </div>
      <h4 class="tmdb-trend-title">${card.title}</h4>
      <p class="tmdb-trend-date">${card.dateLabel}</p>
    </article>
  `;
}

function renderTmdbTrack(trackId, cards = []) {
  const track = getEl(trackId);
  if (!track) return;

  track.innerHTML = cards.map(tmdbCardTemplate).join('');
}

function renderTmdbSkeleton(trackId, count = 8) {
  const track = getEl(trackId);
  if (!track) return;

  track.innerHTML = Array.from({ length: count }).map(() => `
    <article class="tmdb-trend-card tmdb-skeleton-card">
      <div class="tmdb-trend-poster"></div>
      <h4 class="tmdb-trend-title">&nbsp;</h4>
      <p class="tmdb-trend-date">&nbsp;</p>
    </article>
  `).join('');
}

function setTmdbHero(card) {
  if (!card) return;

  const hero = getEl('tmdb-hero-banner');
  if (hero) {
    if (card.backdrop) {
      hero.style.background = `linear-gradient(180deg, rgba(6, 10, 20, 0.15), rgba(7, 10, 20, 0.82)), url(${encodeURI(card.backdrop)}) center / cover no-repeat`;
    } else if (card.poster) {
      hero.style.background = `linear-gradient(180deg, rgba(6, 10, 20, 0.25), rgba(7, 10, 20, 0.86)), url(${encodeURI(card.poster)}) center / cover no-repeat`;
    }
  }

  const title = getEl('tmdb-hero-title');
  const meta = getEl('tmdb-hero-meta');
  const tagline = getEl('tmdb-hero-tagline');
  const mediaLabel = card.mediaType === 'anime'
    ? 'Anime'
    : card.mediaType === 'tv'
      ? 'TV Series'
      : 'Movie';
  if (title) title.textContent = card.title;
  if (meta) meta.textContent = `${mediaLabel} · ${card.year || '—'} · ${card.score ? `⭐ ${Number(card.score).toFixed(1)}` : 'Unrated'}`;
  if (tagline) tagline.textContent = card.overview || 'Freshly trending and worth your watchlist right now.';
}

async function loadTmdbShowcase({ query = state.tmdbLastQuery, silent = false } = {}) {
  state.tmdbLastQuery = String(query || '').trim();

  if (!silent) {
    ['tmdb-row-day-track', 'tmdb-row-week-track', 'tmdb-row-popular-track', 'tmdb-row-toprated-track', 'tmdb-row-anime-track'].forEach(trackId => {
      renderTmdbSkeleton(trackId, 8);
    });
  }

  if (state.tmdbLastQuery) {
    const searchCards = await fetchTmdbShowcase({ query: state.tmdbLastQuery });
    renderTmdbTrack('tmdb-row-day-track', searchCards);
    if (!state.tmdbCollections.week.length || !state.tmdbCollections.popular.length || !state.tmdbCollections.topRated.length || !state.tmdbCollections.anime.length) {
      const [week, popular, topRated, anime] = await Promise.all([
        fetchTmdbShowcase({ endpoint: 'trending/all/week' }),
        fetchTmdbShowcase({ endpoint: 'movie/popular' }),
        fetchTmdbShowcase({ endpoint: 'movie/top_rated' }),
        fetchJikanAnimeShowcase(16)
      ]);
      state.tmdbCollections.week = week;
      state.tmdbCollections.popular = popular;
      state.tmdbCollections.topRated = topRated;
      state.tmdbCollections.anime = anime;
    }

    renderTmdbTrack('tmdb-row-week-track', state.tmdbCollections.week);
    renderTmdbTrack('tmdb-row-popular-track', state.tmdbCollections.popular);
    renderTmdbTrack('tmdb-row-toprated-track', state.tmdbCollections.topRated);
    renderTmdbTrack('tmdb-row-anime-track', state.tmdbCollections.anime);
    setTmdbHero(searchCards[0] || state.tmdbCollections.day[0] || state.tmdbCollections.week[0]);
    return;
  }

  const { today: day, week, popular, topRated, anime } = await fetchAllSections();

  state.tmdbCollections.day = day;
  state.tmdbCollections.week = week;
  state.tmdbCollections.popular = popular;
  state.tmdbCollections.topRated = topRated;
  state.tmdbCollections.anime = anime;

  renderTmdbTrack('tmdb-row-day-track', day);
  renderTmdbTrack('tmdb-row-week-track', week);
  renderTmdbTrack('tmdb-row-popular-track', popular);
  renderTmdbTrack('tmdb-row-toprated-track', topRated);
  renderTmdbTrack('tmdb-row-anime-track', anime);
  setTmdbHero(day[0] || week[0] || popular[0] || topRated[0] || anime[0]);
}

function shortTagline(movie) {
  const base = String(movie.vibeClip || movie.plot || '').trim();
  if (!base) return 'Personalized pick for your current vibe.';

  const words = base.split(/\s+/).slice(0, 12).join(' ');
  return words.endsWith('.') ? words : `${words}...`;
}

function posterForRecommendation(movie) {
  if (movie.posterUrl) return movie.posterUrl;
  return 'https://dummyimage.com/342x513/1a2030/e8ecff&text=Poster';
}

function attachTmdbShowcaseHandlers() {
  const entertainment = getEl('entertainment');
  if (!entertainment) return;

  const runSearch = () => {
    const query = (getEl('tmdb-hero-search')?.value || getEl('tmdb-global-search')?.value || '').trim();
    loadTmdbShowcase({ query });
  };

  getEl('tmdb-hero-search-btn')?.addEventListener('click', runSearch);
  getEl('tmdb-hero-search')?.addEventListener('keydown', event => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    runSearch();
  });

  getEl('tmdb-global-search')?.addEventListener('keydown', event => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    runSearch();
  });

  entertainment.addEventListener('click', event => {
    const card = event.target.closest('.tmdb-trend-card');
    if (!card) return;

    const title = lower(card.dataset.title || card.querySelector('.tmdb-trend-title')?.textContent);
    const candidate = state.scored.find(item => lower(item.movie.title) === title);
    const heroCard = [
      ...state.tmdbCollections.day,
      ...state.tmdbCollections.week,
      ...state.tmdbCollections.popular,
      ...state.tmdbCollections.topRated,
      ...state.tmdbCollections.anime
    ].find(item => lower(item.title) === title);

    if (heroCard) setTmdbHero(heroCard);
    if (candidate) openExpanded(candidate, 'perfect', card);
  });

  getEl('tmdb-hero-play')?.addEventListener('click', () => {
    const currentTitle = getEl('tmdb-hero-title')?.textContent;
    const candidate = state.scored.find(item => lower(item.movie.title) === lower(currentTitle));
    if (candidate) openExpanded(candidate, 'perfect');
  });

  if (state.tmdbRefreshId) {
    clearInterval(state.tmdbRefreshId);
  }

  state.tmdbRefreshId = setInterval(() => {
    loadTmdbShowcase({ query: state.tmdbLastQuery, silent: true });
  }, 15 * 60 * 1000);
}

function getDnaSelection() {
  const container = getEl('dna-options');
  if (!container) return [];
  return Array.from(container.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
}

function parseVibeQuery(query) {
  const text = lower(query);

  const tokens = text
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

  const intent = {
    mood: { brain: 50, energy: 50, palette: 50, social: 50 },
    requestedGenres: new Set(),
    requestedTags: new Set(),
    stressed: false
  };

  const hints = [
    { test: /brain[-\s]?dead|mindless|easy watch|switch off/, apply: () => { intent.mood.brain = 20; intent.stressed = true; } },
    { test: /complex|intellectual|mind bend|smart/, apply: () => { intent.mood.brain = 85; } },
    { test: /adrenaline|intense|action packed|high octane/, apply: () => { intent.mood.energy = 88; intent.requestedGenres.add('Action'); intent.requestedTags.add('Fast pacing'); } },
    { test: /slow burn|atmospheric|calm/, apply: () => { intent.mood.energy = 28; } },
    { test: /dark|gritty/, apply: () => { intent.mood.palette = 18; intent.requestedTags.add('Dark'); } },
    { test: /bright|whimsical|feel good|fun/, apply: () => { intent.mood.palette = 78; intent.requestedTags.add('Bright'); } },
    { test: /group|party|friends/, apply: () => { intent.mood.social = 86; intent.requestedTags.add('Group watch'); } },
    { test: /solo|alone|deep dive/, apply: () => { intent.mood.social = 20; } },
    { test: /bittersweet/, apply: () => { intent.requestedTags.add('Bittersweet'); } },
    { test: /heroic|hero/, apply: () => { intent.requestedTags.add('Heroic'); } },
    { test: /non[-\s]?linear/, apply: () => { intent.requestedTags.add('Non-linear storytelling'); } },
    { test: /high[-\s]?contrast/, apply: () => { intent.requestedTags.add('High-contrast visuals'); } },
    { test: /anime/, apply: () => { intent.requestedGenres.add('Anime'); } },
    { test: /horror/, apply: () => { intent.requestedGenres.add('Horror'); } },
    { test: /thriller/, apply: () => { intent.requestedGenres.add('Thriller'); } },
    { test: /drama/, apply: () => { intent.requestedGenres.add('Drama'); } },
    { test: /comedy|funny|humor/, apply: () => { intent.requestedGenres.add('Comedy'); intent.requestedTags.add('Humor'); } }
  ];

  hints.forEach(hint => {
    if (hint.test.test(text)) hint.apply();
  });

  return { tokens, ...intent };
}

function moodMatch(movie, targetMood) {
  const distance =
    Math.abs(movie.mood.brain - targetMood.brain) +
    Math.abs(movie.mood.energy - targetMood.energy) +
    Math.abs(movie.mood.palette - targetMood.palette) +
    Math.abs(movie.mood.social - targetMood.social);

  return clamp(100 - distance / 4, 0, 100);
}

function preferenceMatch(movie, selectedDna, queryIntent) {
  const requested = [...selectedDna, ...queryIntent.requestedTags];
  if (!requested.length) return 62;

  const movieTokens = new Set([
    ...movie.tags.map(lower),
    ...movie.genres.map(lower),
    lower(movie.title)
  ]);

  let score = 0;
  requested.forEach(tag => {
    const tagText = lower(tag);
    if (movieTokens.has(tagText)) score += 1;
    else if (Array.from(movieTokens).some(token => token.includes(tagText) || tagText.includes(token))) score += 0.7;
  });

  return clamp((score / requested.length) * 100, 0, 100);
}

function keywordScore(movie, tokens, requestedGenres) {
  if (!tokens.length && !requestedGenres.size) return 68;

  const hay = lower([
    movie.title,
    movie.plot,
    ...movie.genres,
    ...movie.tags
  ].join(' '));

  let hits = 0;
  tokens.forEach(token => {
    if (hay.includes(token)) hits += 1;
  });

  requestedGenres.forEach(genre => {
    if (movie.genres.includes(genre)) hits += 1.5;
  });

  const baseline = (tokens.length + requestedGenres.size * 1.5) || 1;
  return clamp((hits / baseline) * 100, 0, 100);
}

function dynamicWeights(intent) {
  if (intent.stressed || intent.mood.brain < 30) return { wm: 0.58, wp: 0.2, wr: 0.22 };
  return { wm: 0.45, wp: 0.3, wr: 0.25 };
}

function readFilters() {
  const strictRuntime = Boolean(getEl('strict-runtime-toggle')?.checked);
  const runtimeRaw = parseInt(getEl('runtime-minutes')?.value, 10);

  return {
    safeEnding: Boolean(getEl('safe-ending-toggle')?.checked),
    hiddenGems: Boolean(getEl('hidden-gems-toggle')?.checked),
    strictRuntime,
    runtime: Number.isFinite(runtimeRaw) ? runtimeRaw : 135
  };
}

function isSad(ending) {
  return lower(ending) === 'sad' || lower(ending) === 'dark';
}

function passesFilters(movie, filters) {
  if (filters.safeEnding && isSad(movie.ending)) return false;
  if (filters.hiddenGems && movie.views >= 1000000) return false;
  if (filters.strictRuntime && movie.runtime > filters.runtime) return false;
  return true;
}

function becauseText(movie, score, intent, pref, keyword) {
  const anchors = [];
  if (pref > 72) anchors.push('fits your Vibe DNA tags');
  if (intent.requestedTags.has('Bittersweet') && movie.tags.includes('Bittersweet')) anchors.push('matches your bittersweet request');
  if (intent.requestedGenres.size && movie.genres.some(genre => intent.requestedGenres.has(genre))) {
    anchors.push(`hits your ${movie.genres.find(genre => intent.requestedGenres.has(genre))} preference`);
  }
  if (keyword > 70) anchors.push('understands your wording almost exactly');
  if (!anchors.length) anchors.push('balances mood, quality, and pacing safely');

  return `~${Math.round(score)}% Match: ${anchors.join(' • ')}.`;
}

function scoreTitles(context) {
  const { queryIntent, selectedDna, filters } = context;
  const weights = dynamicWeights(queryIntent);

  return state.catalog
    .filter(movie => passesFilters(movie, filters))
    .map(movie => {
      const M = (moodMatch(movie, queryIntent.mood) * 0.7) + (keywordScore(movie, queryIntent.tokens, queryIntent.requestedGenres) * 0.3);
      const P = preferenceMatch(movie, selectedDna, queryIntent);
      const R = reliability(movie);
      const S = clamp(weights.wm * M + weights.wp * P + weights.wr * R, 0, 100);

      return {
        movie,
        M,
        P,
        R,
        S,
        weights,
        because: becauseText(movie, S, queryIntent, P, keywordScore(movie, queryIntent.tokens, queryIntent.requestedGenres))
      };
    })
    .filter(result => result.R >= 75)
    .sort((a, b) => b.S - a.S);
}

function setConfidenceMessage(results, context, wildcardMode = false) {
  const banner = getEl('confidence-message');
  if (!banner) return;

  if (!results.length) {
    banner.className = 'confidence-banner warning';
    banner.textContent = 'No strong matches right now. Try Wildcard or adjust your mood text.';
    return;
  }

  const top = results[0];
  const confidence = Math.round(top.S);

  if (wildcardMode) {
    banner.className = 'confidence-banner highlight';
    banner.textContent = `Wildcard pick unlocked · ${confidence}% match confidence.`;
    return;
  }

  if (confidence < 85) {
    banner.className = 'confidence-banner warning';
    banner.textContent = `Good options found · ${confidence}% confidence. Refine mood text for sharper matches.`;
    return;
  }

  banner.className = 'confidence-banner';
  banner.textContent = `Strong match · ${confidence}% confidence.`;
}

function cardTemplate(result) {
  const { movie, S } = result;
  const rating = Number(movie.imdb || 0).toFixed(1);
  const poster = posterForRecommendation(movie);
  return `
    <div class="row-card-media">
      <img class="row-card-image" src="${poster}" alt="${movie.title}" loading="lazy" />
      <div class="micro-trailer cinematic-overlay">
        <strong>⭐ ${rating}</strong>
        <p>${movie.release || ''}</p>
      </div>
    </div>
    <div class="row-card-body">
      <h4>${movie.title}</h4>
      <p>${movie.kind} · ${movie.runtime}m · ⭐ ${rating}</p>
      <span class="score-pill">${Math.round(S)}% Match</span>
      <small>${shortTagline(movie)}</small>
    </div>
  `;
}

function openExpanded(result, rowKey, anchorEl = null) {
  const expanded = getEl('expanded-card');
  if (!expanded) return;

  const rowBlockId = ROW_CONFIG[rowKey]?.blockId || ROW_CONFIG.perfect.blockId;
  const rowBlock = getEl(rowBlockId);
  if (rowBlock) {
    rowBlock.insertAdjacentElement('afterend', expanded);
  }

  const { movie, S, M, P, R, because } = result;
  state.activeId = movie.id;

  getEl('expanded-title').textContent = movie.title;
  getEl('expanded-meta').textContent = `${movie.kind} · ${movie.release} · ${movie.runtime}m · ${formatViews(movie.views)}`;
  getEl('expanded-score').textContent = `Satisfaction ${Math.round(S)}%`;
  getEl('overview-plot').textContent = movie.plot;
  getEl('overview-endtime').textContent = `If you start now, you'll finish by ${formatEndTime(movie.runtime)}.`;

  const sourceLine = getEl('overview-source');
  if (sourceLine) {
    if (movie.source?.provider === 'TMDB') {
      const tmdb = movie.source;
      sourceLine.textContent = `TMDB · ID ${tmdb.tmdbId} · ⭐ ${tmdb.voteAverage?.toFixed?.(1) || movie.imdb} (${tmdb.voteCount || 0} votes) · Popularity ${Math.round(tmdb.popularity || 0)} · Lang ${tmdb.originalLanguage || 'EN'}${tmdb.tagline ? ` · “${tmdb.tagline}”` : ''}`;
    } else if (movie.source?.provider === 'Jikan') {
      const anime = movie.source;
      sourceLine.textContent = `Anime · MAL ${anime.malId} · Rank #${anime.rank || '—'} · Popularity #${anime.popularityRank || '—'} · Members ${anime.members ? anime.members.toLocaleString() : '—'} · Episodes ${anime.episodes || '—'}${anime.studios?.length ? ` · Studio ${anime.studios[0]}` : ''}`;
    } else {
      sourceLine.textContent = 'Catalog source: blended local + live feeds.';
    }
  }

  getEl('dna-because').textContent = `${because} (Mood ${Math.round(M)} • Preference ${Math.round(P)} • Reliability ${Math.round(R)})`;

  const dnaTags = getEl('dna-tags');
  if (dnaTags) {
    dnaTags.innerHTML = '';
    movie.tags.forEach(tag => {
      const chip = document.createElement('span');
      chip.className = 'chip goal-chip';
      chip.textContent = `#${tag}`;
      dnaTags.appendChild(chip);
    });
  }

  const comments = getEl('comments-list');
  if (comments) {
    comments.innerHTML = '';
    movie.comments.forEach(comment => {
      const li = document.createElement('li');
      li.textContent = `“${comment}”`;
      comments.appendChild(li);
    });
  }

  state.expandedAnchorEl = anchorEl;
  expanded.hidden = false;
  positionPanelBesideAnchor(expanded, anchorEl);
}

function renderRow(rowKey, list) {
  const track = getEl(ROW_CONFIG[rowKey].trackId);
  if (!track) return;

  track.innerHTML = '';

  list.forEach(result => {
    const card = document.createElement('article');
    card.className = 'row-card';
    card.dataset.movieId = result.movie.id;
    card.innerHTML = cardTemplate(result);

    card.addEventListener('click', () => openExpanded(result, rowKey, card));
    track.appendChild(card);
  });
}

function renderRows(scored) {
  const perfect = scored.slice(0, 16);
  renderRow('perfect', perfect);

  // Also render anime items in the anime row
  const animeItems = scored.filter(result => 
    result.movie.kind === 'Anime' || result.movie.rows?.includes('anime')
  ).slice(0, 12);
  
  if (animeItems.length) {
    renderRow('trending', animeItems);
  }
}

function renderHero(result) {
  const hero = getEl('stream-hero');
  if (!hero || !result) return;

  const { movie, because } = result;
  hero.style.background = `${movie.poster}, linear-gradient(180deg, rgba(0,0,0,.1), rgba(0,0,0,.82))`;

  getEl('hero-title').textContent = movie.title;
  getEl('hero-because').textContent = because;
  getEl('hero-meta').textContent = `${movie.kind} · ${movie.release} · ${movie.runtime}m · ${formatViews(movie.views)}`;

  const playBtn = getEl('hero-play');
  if (playBtn) {
    playBtn.onclick = () => openExpanded(result, 'perfect');
  }
}

function renderHeroFallback() {
  const hero = getEl('stream-hero');
  if (!hero) return;

  hero.style.background = 'radial-gradient(140% 100% at 70% 12%, rgba(255, 255, 255, 0.06), transparent 55%), linear-gradient(160deg, #1f2434, #0f111b 65%)';
  getEl('hero-title').textContent = 'No exact match yet';
  getEl('hero-because').textContent = 'Relax one filter or use Wildcard to discover close-fit picks.';
  getEl('hero-meta').textContent = 'Try less strict dealbreakers for broader recommendations.';

  const playBtn = getEl('hero-play');
  if (playBtn) {
    playBtn.onclick = () => runEngine({ wildcard: true });
  }
}

function renderActivityFeed() {
  const feed = getEl('activity-feed');
  if (!feed) return;

  feed.innerHTML = '';
  LIVE_ACTIVITY.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${String(index + 1).padStart(2, '0')}</strong><span>${item}</span>`;
    feed.appendChild(li);
  });
}

function activateTab(tabName) {
  const tabs = getEl('expanded-tabs');
  if (!tabs) return;

  tabs.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tabTarget === tabName);
  });

  ['overview', 'dna', 'comments'].forEach(name => {
    const panel = getEl(`tab-${name}`);
    if (panel) panel.classList.toggle('active', name === tabName);
  });
}

function attachExpandableHandlers() {
  getEl('expanded-close')?.addEventListener('click', () => {
    const expanded = getEl('expanded-card');
    if (expanded) {
      expanded.hidden = true;
      clearFloatingPanelStyle(expanded);
      state.expandedAnchorEl = null;
    }
  });

  window.addEventListener('resize', syncExpandedPanelPosition);
  getEl('entertainment')?.addEventListener('scroll', syncExpandedPanelPosition, true);

  const tabs = getEl('expanded-tabs');
  if (!tabs) return;
  tabs.addEventListener('click', event => {
    const button = event.target.closest('.tab-btn');
    if (!button) return;
    activateTab(button.dataset.tabTarget);
  });
}

function attachRowScrollerHandlers() {
  const container = getEl('entertainment');
  if (!container) return;

  container.addEventListener('click', event => {
    const button = event.target.closest('.row-scroll-btn');
    if (!button) return;

    const trackId = button.dataset.trackId;
    const direction = button.dataset.direction === 'prev' ? -1 : 1;
    const track = getEl(trackId);
    if (!track) return;

    const firstCard = track.querySelector('.row-card, .tmdb-trend-card');
    const gap = 12;
    const cardWidth = firstCard?.getBoundingClientRect().width || 220;
    const delta = direction * (cardWidth + gap);

    track.scrollBy({ left: delta, behavior: 'smooth' });
  });
}

function runEngine({ wildcard = false } = {}) {
  const query = getEl('vibe-query')?.value || '';
  const queryIntent = parseVibeQuery(query);
  const selectedDna = getDnaSelection();
  const filters = readFilters();

  const scored = scoreTitles({ queryIntent, selectedDna, filters });
  state.scored = scored;
  state.byId = new Map(scored.map(result => [result.movie.id, result]));

  const chosen = wildcard
    ? scored[Math.floor(Math.random() * Math.min(scored.length || 1, 5))] || null
    : scored[0] || null;

  setConfidenceMessage(scored, { queryIntent, selectedDna, filters }, wildcard);
  renderRows(scored);

  if (chosen) {
    const anchorCard = getEl('row-perfect-track')?.querySelector(`[data-movie-id="${chosen.movie.id}"]`) || null;
    openExpanded(chosen, 'perfect', anchorCard);
  } else if (!scored.length) {
    const expanded = getEl('expanded-card');
    if (expanded) {
      expanded.hidden = true;
      clearFloatingPanelStyle(expanded);
      state.expandedAnchorEl = null;
    }
  }
}

function attachInputHandlers() {
  getEl('run-vibe-search')?.addEventListener('click', () => runEngine());
  getEl('wildcard-reco')?.addEventListener('click', () => runEngine({ wildcard: true }));

  getEl('vibe-query')?.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      runEngine();
    }
  });

  ['safe-ending-toggle', 'hidden-gems-toggle', 'strict-runtime-toggle', 'runtime-minutes'].forEach(id => {
    getEl(id)?.addEventListener('change', () => runEngine());
  });

  const presets = getEl('mood-presets');
  if (presets) {
    presets.addEventListener('click', event => {
      const btn = event.target.closest('.preset-chip');
      if (!btn) return;
      const query = btn.dataset.query || '';
      const input = getEl('vibe-query');
      if (input) input.value = query;
      runEngine();
    });
  }

  const dna = getEl('dna-options');
  if (dna) {
    dna.addEventListener('change', () => runEngine());
  }
}

export function initEntertainment() {
  if (!getEl('entertainment')) return;

  attachTmdbShowcaseHandlers();
  renderActivityFeed();
  attachExpandableHandlers();
  attachRowScrollerHandlers();
  attachInputHandlers();
  activateTab('overview');
  runEngine();
  loadTmdbShowcase({ query: '' });
  hydrateRemoteCatalog();
}
