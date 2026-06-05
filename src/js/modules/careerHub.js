const CLUBS = [
  {
    id: 'nmit-hacks',
    name: 'NMIT Hacks',
    category: 'Technical',
    theme: 'theme-tech',
    banner: 'linear-gradient(150deg, rgba(39,119,255,.28), rgba(8,14,32,.96)), radial-gradient(90% 120% at 15% 10%, rgba(85,177,255,.45), transparent 60%)',
    tags: ['Hackathons', 'Problem Solving', 'System Design', 'GitHub'],
    mission: 'Build production-ready solutions in sprint-style hack environments with mentorship from seniors and alumni.',
    roles: ['Hack Lead', 'Backend Engineer', 'Frontend Engineer', 'Pitch Captain'],
    roi: ['Ship 3+ real projects each semester', 'Portfolio + GitHub profile review', 'Priority team invites for inter-college hackathons'],
    roadmap: ['Application Form (resume + GitHub link)', 'Rapid Aptitude + Logic Round', 'Technical + Teamwork Interview'],
    proTip: 'Current members say: “Practice arrays, APIs, and one mini full-stack project before interview day.”'
  },
  {
    id: 'os-code',
    name: 'OS Code',
    category: 'Technical',
    theme: 'theme-open',
    banner: 'linear-gradient(150deg, rgba(109,79,255,.28), rgba(10,8,24,.96)), radial-gradient(90% 120% at 15% 10%, rgba(173,132,255,.45), transparent 60%)',
    tags: ['OpenSource', 'Linux', 'Git', 'Documentation'],
    mission: 'Grow from contributor to maintainer by solving real issues in open-source ecosystems.',
    roles: ['Contributor', 'Issue Triager', 'Documentation Lead', 'Maintainer'],
    roi: ['Mentored PR contributions', 'Open-source certificate track', 'Strong resume proof for internships'],
    roadmap: ['Application Form', 'Git/GitHub Practical', 'Interview + Live PR Walkthrough'],
    proTip: 'Current members say: “Know branching, rebasing, and how to write a clean PR description.”'
  },
  {
    id: 'cloudzilla',
    name: 'CloudZilla',
    category: 'Technical',
    theme: 'theme-cloud',
    banner: 'linear-gradient(150deg, rgba(29,196,214,.3), rgba(6,20,26,.96)), radial-gradient(90% 120% at 15% 10%, rgba(108,235,255,.43), transparent 60%)',
    tags: ['AWS', 'Docker', 'DevOps', 'CI/CD'],
    mission: 'Train students for cloud-native engineering through labs, deployments, and architecture challenges.',
    roles: ['Cloud Engineer', 'DevOps Analyst', 'Infra Lead', 'Workshop Coordinator'],
    roi: ['Hands-on deployment labs', 'Cloud practitioner prep sessions', 'DevOps pipeline mini-certification'],
    roadmap: ['Application Form', 'Basic Networking + Linux Quiz', 'Technical Interview'],
    proTip: 'Current members say: “Brush up on Linux commands and what DNS/HTTP actually do.”'
  },
  {
    id: 'cypher',
    name: 'Cypher',
    category: 'Technical',
    theme: 'theme-cyber',
    banner: 'linear-gradient(150deg, rgba(40,203,114,.25), rgba(7,19,14,.96)), radial-gradient(90% 120% at 15% 10%, rgba(101,250,167,.4), transparent 60%)',
    tags: ['CyberSecurity', 'CTF', 'EthicalHacking', 'SOC'],
    mission: 'Build offensive and defensive security thinking through CTF battles and incident simulations.',
    roles: ['Red Team Analyst', 'Blue Team Analyst', 'CTF Captain', 'Security Researcher'],
    roi: ['Weekly CTF practice stack', 'Security toolkit workshops', 'Interview prep for SOC/analyst roles'],
    roadmap: ['Application Form', 'Networking + Security Basics Round', 'Scenario-Based Interview'],
    proTip: 'Current members say: “Understand OSI layers and one real vulnerability workflow.”'
  },
  {
    id: 'datawiz',
    name: 'DataWiz',
    category: 'Technical',
    theme: 'theme-data',
    banner: 'linear-gradient(150deg, rgba(255,160,50,.3), rgba(25,14,8,.96)), radial-gradient(90% 120% at 15% 10%, rgba(255,214,127,.45), transparent 60%)',
    tags: ['Python', 'Pandas', 'MachineLearning', 'PowerBI'],
    mission: 'Turn raw data into decisions using analytics pipelines, visualization, and ML fundamentals.',
    roles: ['Data Analyst', 'ML Intern', 'Viz Designer', 'Research Associate'],
    roi: ['End-to-end analysis projects', 'Data storytelling practice', 'Model-building sprint badges'],
    roadmap: ['Application Form', 'Aptitude + Data Logic Round', 'Case Study Interview'],
    proTip: 'Current members say: “Practice pandas, joins, and one clear notebook story.”'
  },
  {
    id: 'iotronics',
    name: 'IoTronics',
    category: 'Technical',
    theme: 'theme-robotics',
    banner: 'linear-gradient(150deg, rgba(255,120,58,.3), rgba(28,12,8,.96)), radial-gradient(90% 120% at 15% 10%, rgba(255,176,108,.42), transparent 60%)',
    tags: ['IoT', 'Embedded', 'Sensors', 'DroneMapping'],
    mission: 'Prototype smart systems from sensor capture to dashboard output with hardware-first learning.',
    roles: ['Embedded Developer', 'Hardware Builder', 'Drone Ops', 'Prototype Tester'],
    roi: ['Component-level hardware training', 'IoT project showcase opportunities', 'Mentored innovation challenge entries'],
    roadmap: ['Application Form', 'Basic Electronics Round', 'Practical + Interview'],
    proTip: 'Current members say: “Know Arduino basics and how sensor data is read and logged.”'
  },
  {
    id: 'cosmos-robotics',
    name: 'Cosmos',
    category: 'Technical',
    theme: 'theme-robotics',
    banner: 'linear-gradient(150deg, rgba(92,200,255,.28), rgba(8,16,26,.96)), radial-gradient(90% 120% at 15% 10%, rgba(128,232,255,.45), transparent 60%)',
    tags: ['Robotics', 'Automation', 'ROS', 'Mechatronics'],
    mission: 'Design and build autonomous bots that solve campus-scale challenges through sensors, control systems, and rapid prototyping.',
    roles: ['Technical', 'Design', 'Documentation', 'Operations', 'Robotics Lead'],
    roi: ['Hands-on bot builds every semester', 'Access to lab-grade sensors + kits', 'Competition-ready project portfolio'],
    roadmap: ['Concept submission', 'Hardware fundamentals quiz', 'Build sprint + demo day'],
    proTip: 'Current members say: “Brush up on sensors, motor drivers, and PID basics before demo day.”'
  },
  {
    id: 'augmentix-aids',
    name: 'Augmentix',
    category: 'Technical',
    theme: 'theme-data',
    banner: 'linear-gradient(150deg, rgba(122,95,255,.26), rgba(12,10,28,.96)), radial-gradient(90% 120% at 15% 10%, rgba(170,140,255,.42), transparent 60%)',
    tags: ['AI', 'DataScience', 'MachineLearning', 'MLOps'],
    mission: 'An AIDS-focused guild that turns datasets into deployable intelligence with model training, evaluation, and ethical AI practices.',
    roles: ['Technical', 'Design', 'Documentation', 'Operations', 'ML Engineer'],
    roi: ['End-to-end ML pipeline experience', 'Model benchmarking playbook', 'Showcase-ready AI case studies'],
    roadmap: ['Application form', 'Python + data basics round', 'Model build challenge'],
    proTip: 'Current members say: “Know Pandas + one ML model you can explain with metrics.”'
  },
  {
    id: 'fission-aiml',
    name: 'Fission',
    category: 'Technical',
    theme: 'theme-data',
    banner: 'linear-gradient(150deg, rgba(96,140,255,.26), rgba(10,12,28,.96)), radial-gradient(90% 120% at 15% 10%, rgba(140,190,255,.42), transparent 60%)',
    tags: ['AIML', 'DeepLearning', 'ComputerVision', 'NLP'],
    mission: 'AIML club focused on building intelligent systems through data pipelines, model experimentation, and real-world deployment demos.',
    roles: ['Technical', 'Design', 'Documentation', 'Operations', 'Research Lead'],
    roi: ['Model sprint mentorship', 'AI showcase portfolio', 'Deployment-ready project experience'],
    roadmap: ['Application form', 'ML fundamentals quiz', 'Model build sprint + review'],
    proTip: 'Current members say: “Know Python, data prep, and one ML algorithm you can explain clearly.”'
  },
  {
    id: 'bitgenix-ec',
    name: 'Bitgenix',
    category: 'Technical',
    theme: 'theme-tech',
    banner: 'linear-gradient(150deg, rgba(70,140,255,.28), rgba(10,14,30,.96)), radial-gradient(90% 120% at 15% 10%, rgba(120,190,255,.44), transparent 60%)',
    tags: ['Embedded', 'Signals', 'VLSI', 'Communication'],
    mission: 'EC-focused club building signal-processing prototypes, embedded systems, and communication stacks for real-world deployments.',
    roles: ['Technical', 'Design', 'Documentation', 'Operations', 'Embedded Engineer'],
    roi: ['Signal chain project experience', 'Hands-on MCU + FPGA practice', 'Electronics interview prep labs'],
    roadmap: ['Electronics aptitude round', 'Circuit debugging task', 'Prototype + viva'],
    proTip: 'Current members say: “Revise filters, sampling, and one microcontroller project.”'
  },
  {
    id: 'iris-ec',
    name: 'Iris',
    category: 'Technical',
    theme: 'theme-tech',
    banner: 'linear-gradient(150deg, rgba(64,200,180,.26), rgba(8,18,24,.96)), radial-gradient(90% 120% at 15% 10%, rgba(120,240,215,.4), transparent 60%)',
    tags: ['IoT', 'Circuits', 'PCB', 'Networking'],
    mission: 'EC innovation circle focused on smart devices, PCB builds, and campus IoT deployments with clean documentation.',
    roles: ['Technical', 'Design', 'Documentation', 'Operations', 'PCB Designer'],
    roi: ['PCB design workflow mastery', 'IoT device deployments', 'Team-based hardware documentation practice'],
    roadmap: ['Application form', 'Circuit design quiz', 'PCB mini-project'],
    proTip: 'Current members say: “Practice reading schematics and routing a simple PCB.”'
  },
  {
    id: 'geek-mayhem',
    name: 'Geek Mayhem',
    category: 'Management',
    theme: 'theme-management',
    banner: 'linear-gradient(150deg, rgba(240,77,174,.26), rgba(28,10,23,.96)), radial-gradient(90% 120% at 15% 10%, rgba(255,148,212,.42), transparent 60%)',
    tags: ['EventOps', 'Community', 'Branding', 'Sponsorship'],
    mission: 'Run high-scale campus experiences where execution, branding, and coordination meet.',
    roles: ['Event Manager', 'Brand Designer', 'Sponsorship Lead', 'Operations Coordinator'],
    roi: ['Hands-on event leadership', 'Communication + negotiation skills', 'Portfolio of executed campus events'],
    roadmap: ['Application Form', 'Situation Judgment Round', 'Panel Interview'],
    proTip: 'Current members say: “Show one example where you handled chaos calmly.”'
  },
  {
    id: 'nss',
    name: 'NSS Club',
    category: 'Social Service',
    theme: 'theme-social',
    banner: 'linear-gradient(150deg, rgba(62,188,116,.24), rgba(8,22,14,.96)), radial-gradient(90% 120% at 15% 10%, rgba(130,242,173,.4), transparent 60%)',
    tags: ['Volunteering', 'Leadership', 'SocialImpact', 'Community'],
    mission: 'Build responsible leaders through service drives, awareness programs, and rural outreach.',
    roles: ['Drive Coordinator', 'Campaign Lead', 'Volunteer Mentor', 'Outreach Partner'],
    roi: ['Impact certificate pathways', 'Public leadership opportunities', 'Ground-level social project experience'],
    roadmap: ['Application Form', 'Intent + Commitment Round', 'Interaction Interview'],
    proTip: 'Current members say: “Be authentic about why service matters to you.”'
  },
  {
    id: 'csi',
    name: 'CSI Chapter',
    category: 'Technical',
    theme: 'theme-tech',
    banner: 'linear-gradient(150deg, rgba(43,132,255,.26), rgba(10,16,32,.96)), radial-gradient(90% 120% at 15% 10%, rgba(118,191,255,.42), transparent 60%)',
    tags: ['Coding', 'Java', 'ReactJS', 'InterviewPrep'],
    mission: 'Create industry-ready coders with coding rounds, mock interviews, and practical product tasks.',
    roles: ['Tech Lead', 'Training Mentor', 'Contest Curator', 'Frontend Developer'],
    roi: ['Interview prep bootcamps', 'Coding contest exposure', 'Team project reviews from seniors'],
    roadmap: ['Application Form', 'Coding Challenge', 'Technical + HR Interview'],
    proTip: 'Current members say: “Revise OOP + one frontend project you can explain confidently.”'
  },
  {
    id: 'gdsc',
    name: 'Google DSC',
    category: 'Technical',
    theme: 'theme-cloud',
    banner: 'linear-gradient(150deg, rgba(80,188,255,.24), rgba(8,18,30,.96)), radial-gradient(90% 120% at 15% 10%, rgba(149,221,255,.4), transparent 60%)',
    tags: ['Android', 'Firebase', 'Cloud', 'Workshops'],
    mission: 'Bridge classroom and industry through Google tech stacks, talks, and buildathons.',
    roles: ['Community Lead', 'Android Core', 'Cloud Core', 'Design + Outreach'],
    roi: ['Google ecosystem project exposure', 'Speaker-led workshops', 'Community leadership credentials'],
    roadmap: ['Application Form', 'Problem-Solving Round', 'Communication + Tech Interview'],
    proTip: 'Current members say: “Show one project where you used APIs or Firebase.”'
  },
  {
    id: 'rotaract',
    name: 'Rotaract',
    category: 'Social Service',
    theme: 'theme-social',
    banner: 'linear-gradient(150deg, rgba(255,132,180,.25), rgba(26,10,20,.96)), radial-gradient(90% 120% at 15% 10%, rgba(255,187,220,.42), transparent 60%)',
    tags: ['PublicSpeaking', 'Networking', 'Service', 'Leadership'],
    mission: 'Develop empathetic leaders through social impact campaigns, networking, and public speaking.',
    roles: ['Project Officer', 'PR Lead', 'Volunteer Coordinator', 'Speaker Host'],
    roi: ['Leadership credits', 'Network expansion events', 'Public speaking confidence pathway'],
    roadmap: ['Application Form', 'Communication Round', 'Panel Interview'],
    proTip: 'Current members say: “Speak clearly about one real event you planned or volunteered in.”'
  },
  {
    id: 'nihon-kai',
    name: 'Nihon Kai',
    category: 'Cultural',
    theme: 'theme-cultural',
    banner: 'linear-gradient(150deg, rgba(255,168,92,.24), rgba(28,18,8,.96)), radial-gradient(90% 120% at 15% 10%, rgba(255,220,150,.42), transparent 60%)',
    tags: ['Japanese', 'Language', 'Anime', 'Culture'],
    mission: 'Celebrate Japanese language and culture through conversation circles, anime screenings, and campus cultural showcases.',
    roles: ['Technical (Stage/AV)', 'Design', 'Documentation', 'Operations', 'Culture Lead'],
    roi: ['Language practice sprints', 'Cultural event leadership', 'Creative portfolio opportunities'],
    roadmap: ['Intro session', 'Basic language round', 'Event contribution + review'],
    proTip: 'Current members say: “Learn basic greetings and one cultural reference before the first meetup.”'
  },
  {
    id: 'cultural-collective',
    name: 'Cultural Collective',
    category: 'Cultural',
    theme: 'theme-cultural',
    banner: 'linear-gradient(150deg, rgba(255,196,70,.24), rgba(30,19,8,.96)), radial-gradient(90% 120% at 15% 10%, rgba(255,228,146,.42), transparent 60%)',
    tags: ['Stage', 'Dance', 'Music', 'Production'],
    mission: 'Power campus culture with stage-ready performances and festival-grade production.',
    roles: ['Performer', 'Stage Coordinator', 'Production Manager', 'Creative Director'],
    roi: ['Performance exposure', 'Production management skills', 'Portfolio for creative roles'],
    roadmap: ['Application Form', 'Audition / Skill Trial', 'Team Fit Interaction'],
    proTip: 'Current members say: “Bring one polished sample performance — confidence matters.”'
  }
];

const EVENTS = [
  {
    id: 'hack-realm-2026',
    title: 'Hack Realm 2026',
    subtitle: '48h national hackathon by NMIT Hacks',
    status: 'REGISTRATIONS OPEN',
    priority: 'high',
    startsAt: '2026-06-24T09:00:00+05:30',
    endsAt: '2026-06-26T18:00:00+05:30',
    poster: 'linear-gradient(145deg, rgba(42,126,255,.44), rgba(8,14,30,.94))'
  },
  {
    id: 'cypher-ctf',
    title: 'Cypher CTF Sprint',
    subtitle: 'Campus CTF challenge',
    status: 'REGISTRATIONS OPEN',
    priority: 'critical',
    startsAt: '2026-05-28T09:00:00+05:30',
    endsAt: '2026-05-29T21:00:00+05:30',
    poster: 'linear-gradient(145deg, rgba(48,209,123,.42), rgba(7,19,13,.94))'
  },
  {
    id: 'cloudzilla-interview',
    title: 'CloudZilla Core Team Interviews',
    subtitle: 'Round 2 shortlist out',
    status: 'RESULTS PENDING',
    priority: 'high',
    startsAt: '2026-06-07T17:00:00+05:30',
    endsAt: '2026-06-08T20:00:00+05:30',
    poster: 'linear-gradient(145deg, rgba(40,185,215,.43), rgba(8,17,27,.94))'
  },
  {
    id: 'iot-demo-day',
    title: 'IoTronics Demo Day',
    subtitle: 'Drones + smart systems showcase',
    status: 'REGISTRATIONS OPEN',
    priority: 'medium',
    startsAt: '2026-06-28T10:00:00+05:30',
    endsAt: '2026-06-28T16:00:00+05:30',
    poster: 'linear-gradient(145deg, rgba(255,129,74,.42), rgba(27,11,8,.94))'
  },
  {
    id: 'datawiz-casewar',
    title: 'DataWiz Case War',
    subtitle: 'Analytics + dashboard showdown',
    status: 'REGISTRATIONS OPEN',
    priority: 'medium',
    startsAt: '2026-06-22T11:00:00+05:30',
    endsAt: '2026-06-22T17:00:00+05:30',
    poster: 'linear-gradient(145deg, rgba(255,174,65,.44), rgba(29,16,8,.94))'
  }
];

const state = {
  category: 'all',
  query: '',
  selectedClubId: null,
  tickTimer: null,
  detailAnchorEl: null
};

function getEl(id) {
  return document.getElementById(id);
}

function lower(value) {
  return String(value || '').toLowerCase();
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function clearContextualPanelStyle(panel) {
  if (!panel) return;
  panel.classList.remove('contextual-open');
  ['top', 'left', 'right', 'bottom', 'width', 'maxHeight'].forEach(prop => {
    panel.style.removeProperty(prop);
  });
}

function positionGuildDetailBesideAnchor(panel, anchorEl) {
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

  const panelHeight = panel.getBoundingClientRect().height || 460;
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

function syncGuildDetailPosition() {
  const detail = getEl('guild-detail');
  if (!detail || detail.hidden) return;
  positionGuildDetailBesideAnchor(detail, state.detailAnchorEl);
}

function formatDuration(ms) {
  if (ms <= 0) return '00d : 00h : 00m';
  const totalMinutes = Math.floor(ms / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  return `${String(days).padStart(2, '0')}d : ${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m`;
}

function countdownLabel(event) {
  const now = Date.now();
  const starts = new Date(event.startsAt).getTime();
  const ends = new Date(event.endsAt).getTime();

  if (event.status === 'LIVE NOW') {
    return `Ends in ${formatDuration(ends - now)}`;
  }

  if (event.status === 'RESULTS PENDING') {
    return `Results in ${formatDuration(starts - now)}`;
  }

  return `Starts in ${formatDuration(starts - now)}`;
}

function categoryMatch(club, category) {
  if (category === 'all') return true;
  return club.category === category;
}

function queryMatch(club, query) {
  if (!query.trim()) return true;
  const hay = lower([
    club.name,
    club.category,
    club.mission,
    ...club.tags,
    ...club.roles,
    ...club.roi,
    club.proTip
  ].join(' '));

  return query
    .split(/\s+/)
    .filter(Boolean)
    .every(token => hay.includes(lower(token)));
}

function filteredClubs() {
  return CLUBS.filter(club => categoryMatch(club, state.category) && queryMatch(club, state.query));
}

function emblemForClub(club) {
  const byTheme = {
    'theme-tech': '⚔️',
    'theme-open': '🧩',
    'theme-cloud': '☁️',
    'theme-cyber': '🛡️',
    'theme-data': '📊',
    'theme-robotics': '🤖',
    'theme-management': '👑',
    'theme-social': '🤝',
    'theme-cultural': '🎭'
  };

  return byTheme[club.theme] || '✨';
}

function clubCardTemplate(club) {
  return `
    <article class="guild-card ${club.theme}" data-club-id="${club.id}">
      <div class="guild-card-media" style="background:${club.banner}">
        <span class="guild-emblem">${emblemForClub(club)}</span>
        <span class="guild-category-pill">${club.category}</span>
      </div>
      <div class="guild-card-body">
        <h4>${club.name}</h4>
        <div class="guild-tags">
          ${club.tags.map(tag => `<span class="guild-tag">#${tag}</span>`).join('')}
        </div>
        <button type="button" class="guild-open-btn" data-club-id="${club.id}">View Roles</button>
      </div>
    </article>
  `;
}

function statusClass(status) {
  if (status === 'LIVE NOW') return 'status-live';
  if (status === 'REGISTRATIONS OPEN') return 'status-open';
  return 'status-pending';
}

function pulseCardTemplate(event) {
  return `
    <article class="guild-pulse-card">
      <div class="guild-pulse-poster" style="background:${event.poster}">
        <span class="guild-status ${statusClass(event.status)}">${event.status}</span>
      </div>
      <div class="guild-pulse-body">
        <h4>${event.title}</h4>
        <p>${event.subtitle}</p>
        <small data-countdown-id="${event.id}">${countdownLabel(event)}</small>
      </div>
    </article>
  `;
}

function announcementItemTemplate(event) {
  return `
    <article class="guild-announcement-card ${event.priority === 'critical' ? 'critical' : ''}">
      <div>
        <h4>${event.title}</h4>
        <p>${event.subtitle}</p>
      </div>
      <div class="guild-announcement-meta">
        <span class="guild-status ${statusClass(event.status)}">${event.status}</span>
        <small data-countdown-id="${event.id}">${countdownLabel(event)}</small>
      </div>
    </article>
  `;
}

function renderPulse() {
  const pulseTrack = getEl('guild-pulse-track');
  if (pulseTrack) {
    pulseTrack.innerHTML = EVENTS.map(pulseCardTemplate).join('');
  }

  const announcementsPulse = getEl('announcements-pulse-row');
  if (announcementsPulse) {
    announcementsPulse.innerHTML = EVENTS.slice(0, 4).map(pulseCardTemplate).join('');
  }

  const announcementsList = getEl('announcements-list');
  if (announcementsList) {
    announcementsList.innerHTML = EVENTS.map(announcementItemTemplate).join('');
  }
}

function renderCatalog() {
  const catalog = getEl('guild-catalog');
  if (!catalog) return;

  const list = filteredClubs();
  catalog.innerHTML = list.length
    ? list.map(clubCardTemplate).join('')
    : '<p class="guild-empty">No guilds match that search yet. Try broader keywords like coding, cloud, speaking, or social.</p>';

  const feedback = getEl('guild-search-feedback');
  if (!feedback) return;

  if (!state.query.trim()) {
    feedback.textContent = 'Try: Coding, Public Speaking, Robotics, Cloud, AI, Social Service.';
    return;
  }

  if (!list.length) {
    feedback.textContent = `No exact guild found for “${state.query}”. Try related skills or remove some words.`;
    return;
  }

  const top = list.slice(0, 3).map(club => club.name).join(' · ');
  feedback.textContent = `Top guild matches for “${state.query}”: ${top}`;
}

function renderDetail(clubId, anchorEl = null) {
  const detail = getEl('guild-detail');
  if (!detail) return;

  const club = CLUBS.find(item => item.id === clubId);
  if (!club) {
    detail.hidden = true;
    return;
  }

  state.selectedClubId = club.id;
  getEl('guild-detail-name').textContent = club.name;
  getEl('guild-detail-meta').textContent = `${club.category} · ${club.tags.slice(0, 2).map(tag => `#${tag}`).join(' · ')}`;
  getEl('guild-detail-mission').textContent = club.mission;

  const roles = getEl('guild-detail-roles');
  if (roles) roles.innerHTML = club.roles.map(item => `<li>${item}</li>`).join('');

  const roi = getEl('guild-detail-roi');
  if (roi) roi.innerHTML = club.roi.map(item => `<li>${item}</li>`).join('');

  const roadmap = getEl('guild-detail-roadmap');
  if (roadmap) roadmap.innerHTML = club.roadmap.map(step => `<li>${step}</li>`).join('');

  const proTip = getEl('guild-detail-protip');
  if (proTip) proTip.textContent = `Pro-Tip: ${club.proTip}`;

  state.detailAnchorEl = anchorEl;
  detail.hidden = false;
  positionGuildDetailBesideAnchor(detail, anchorEl);
}

function updateCountdowns() {
  EVENTS.forEach(event => {
    document.querySelectorAll(`[data-countdown-id="${event.id}"]`).forEach(el => {
      el.textContent = countdownLabel(event);
    });
  });
}

function syncSearchFromInput() {
  state.query = getEl('guild-search-input')?.value?.trim() || '';
  renderCatalog();
}

function attachHandlers() {
  getEl('guild-search-btn')?.addEventListener('click', syncSearchFromInput);

  getEl('guild-search-input')?.addEventListener('keydown', event => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    syncSearchFromInput();
  });

  getEl('guild-search-input')?.addEventListener('input', syncSearchFromInput);

  const filterRow = getEl('guild-filter-row');
  filterRow?.addEventListener('click', event => {
    const button = event.target.closest('.guild-filter-btn');
    if (!button) return;

    state.category = button.dataset.category || 'all';
    filterRow.querySelectorAll('.guild-filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn === button);
    });
    renderCatalog();
  });

  getEl('guild-catalog')?.addEventListener('click', event => {
    const trigger = event.target.closest('[data-club-id]');
    if (!trigger) return;

    const clubId = trigger.dataset.clubId;
    const card = trigger.closest('.guild-card') || null;
    renderDetail(clubId, card);
  });

  getEl('guild-detail-close')?.addEventListener('click', () => {
    const detail = getEl('guild-detail');
    if (detail) {
      detail.hidden = true;
      clearContextualPanelStyle(detail);
      state.detailAnchorEl = null;
    }
  });

  window.addEventListener('resize', syncGuildDetailPosition);
  getEl('clubs')?.addEventListener('scroll', syncGuildDetailPosition, true);
}

export function initCareerHub() {
  const clubsPage = getEl('clubs');
  const announcementsPage = getEl('announcements');
  if (!clubsPage && !announcementsPage) return;

  renderPulse();
  renderCatalog();
  attachHandlers();
  updateCountdowns();

  if (state.tickTimer) clearInterval(state.tickTimer);
  state.tickTimer = setInterval(updateCountdowns, 1000);
}
