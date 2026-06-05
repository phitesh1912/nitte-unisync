import { useEffect } from 'react';
import { initApp } from './js/app.js';
import { showPage, toggleMenu } from './js/modules/navigation.js';
import { toggleTheme } from './js/modules/theme.js';
import { login, logout } from './js/modules/auth.js';

export default function App() {
  useEffect(() => {
    initApp();
  }, []);

  const handleNavClick = (pageId) => (event) => {
    event.preventDefault();
    showPage(pageId);
  };

  const handleShowPage = (pageId) => () => {
    showPage(pageId);
  };

  const handleScrollToPartnerMatches = () => {
    document.getElementById('partner-cards')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <svg className="icon-sprite" aria-hidden="true" focusable="false">
        <symbol id="i-home" viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" /></symbol>
        <symbol id="i-list" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></symbol>
        <symbol id="i-megaphone" viewBox="0 0 24 24"><path d="M3 11v2a2 2 0 0 0 2 2h2l2.2 4H12l-1.4-4H13l7 3V6l-7 3H5a2 2 0 0 0-2 2z" /></symbol>
        <symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></symbol>
        <symbol id="i-users" viewBox="0 0 24 24"><path d="M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" /><circle cx="9" cy="8" r="3" /><path d="M22 19v-1a4 4 0 0 0-3-3.87" /><path d="M16 3.13a3 3 0 0 1 0 5.75" /></symbol>
        <symbol id="i-route" viewBox="0 0 24 24"><circle cx="6" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="M8 6h3a4 4 0 0 1 4 4v2a4 4 0 0 0 4 4h1" /></symbol>
        <symbol id="i-compass" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="m16.5 7.5-3.5 9-9 3.5 3.5-9z" /></symbol>
        <symbol id="i-briefcase" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /><path d="M3 13h18" /></symbol>
        <symbol id="i-film" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M7 4v16M17 4v16M2 9h5M2 15h5M17 9h5M17 15h5" /></symbol>
        <symbol id="i-check-square" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="m8 12 2.5 2.5L16 9" /></symbol>
        <symbol id="i-heart" viewBox="0 0 24 24"><path d="M20.8 6.6a5.5 5.5 0 0 0-7.8 0L12 7.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 22l7.8-6.6 1-1a5.5 5.5 0 0 0 0-7.8z" /></symbol>
        <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></symbol>
        <symbol id="i-bell" viewBox="0 0 24 24"><path d="M15 17H5l1.5-2.5V10a5.5 5.5 0 1 1 11 0v4.5L19 17h-4" /><path d="M10 17a2 2 0 1 0 4 0" /></symbol>
        <symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></symbol>
        <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v6l4 2" /></symbol>
        <symbol id="i-alert" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 8v5" /><circle cx="12" cy="16.5" r=".8" /></symbol>
        <symbol id="i-chart" viewBox="0 0 24 24"><path d="M3 3v18h18" /><path d="m7 14 3-3 3 2 4-5" /></symbol>
      </svg>

      <div className="app-shell">
        <nav id="sidebar" aria-label="Primary">
          <div className="brand-block">
            <div className="brand-icon">NC</div>
            <div>
              <h2>NITTE Connect</h2>
              <p>Campus Companion</p>
            </div>
          </div>

          <div className="nav-group">
            <p className="nav-label">Main</p>
            <a href="#" className="nav-link active" data-page-link="home" onClick={handleNavClick('home')}>
              <span className="nav-icon"><svg className="ui-icon"><use href="#i-home" /></svg></span>
              <span>Home</span>
            </a>
            <a href="#" className="nav-link" data-page-link="announcements" onClick={handleNavClick('announcements')}>
              <span className="nav-icon"><svg className="ui-icon"><use href="#i-megaphone" /></svg></span>
              <span>Announcements</span>
            </a>
            <a href="#" className="nav-link" data-page-link="events" onClick={handleNavClick('events')}>
              <span className="nav-icon"><svg className="ui-icon"><use href="#i-calendar" /></svg></span>
              <span>Events</span>
            </a>
          </div>

          <div className="nav-group">
            <p className="nav-label">Campus Life</p>
            <a href="#" className="nav-link" data-page-link="partner" onClick={handleNavClick('partner')} data-role="student-only">
              <span className="nav-icon"><svg className="ui-icon"><use href="#i-users" /></svg></span>
              <span>Partner Up</span>
            </a>
            <a href="#" className="nav-link" data-page-link="travel" onClick={handleNavClick('travel')} data-role="student-only">
              <span className="nav-icon"><svg className="ui-icon"><use href="#i-route" /></svg></span>
              <span>Travel</span>
            </a>
            <a href="#" className="nav-link" data-page-link="discover" onClick={handleNavClick('discover')}>
              <span className="nav-icon"><svg className="ui-icon"><use href="#i-compass" /></svg></span>
              <span>Discover</span>
            </a>
            <a href="#" className="nav-link" data-page-link="clubs" onClick={handleNavClick('clubs')}>
              <span className="nav-icon"><svg className="ui-icon"><use href="#i-briefcase" /></svg></span>
              <span>Clubs</span>
            </a>
            <a href="#" className="nav-link" data-page-link="entertainment" onClick={handleNavClick('entertainment')}>
              <span className="nav-icon"><svg className="ui-icon"><use href="#i-film" /></svg></span>
              <span>Entertainment</span>
            </a>
          </div>

          <div className="nav-group">
            <p className="nav-label">You</p>
            <a href="#" id="nav-login" className="nav-link" data-page-link="auth" onClick={handleNavClick('auth')}>
              <span className="nav-icon"><svg className="ui-icon"><use href="#i-user" /></svg></span>
              <span>Login / Sign up</span>
            </a>
            <a href="#" className="nav-link" data-page-link="todo" onClick={handleNavClick('todo')}>
              <span className="nav-icon"><svg className="ui-icon"><use href="#i-check-square" /></svg></span>
              <span>To-Do</span>
            </a>
            <a href="#" className="nav-link" data-page-link="wellbeing" onClick={handleNavClick('wellbeing')}>
              <span className="nav-icon"><svg className="ui-icon"><use href="#i-heart" /></svg></span>
              <span>Well-being</span>
            </a>
            <a href="#" className="nav-link" data-page-link="profile" onClick={handleNavClick('profile')}>
              <span className="nav-icon"><svg className="ui-icon"><use href="#i-user" /></svg></span>
              <span>Profile</span>
            </a>
          </div>

          <div className="sidebar-settings">
            <p className="nav-label">Settings</p>

            <div className="role-toggle">
              <label htmlFor="role-select">Role</label>
              <select id="role-select">
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
              </select>
            </div>

            <div className="sidebar-actions">
              <button id="login-btn" onClick={login} type="button">Login with Google</button>
              <button id="logout-btn" onClick={logout} type="button" style={{ display: 'none' }}>Logout</button>
              <button onClick={toggleTheme} type="button">Toggle theme</button>
            </div>
          </div>

          <div className="sidebar-user">
            <img id="user-photo" src="/assets/profile-placeholder.svg" alt="User" />
            <div>
              <h3 id="user-name">Student</h3>
              <p id="user-meta">Campus member</p>
            </div>
          </div>
        </nav>

        <div className="menu-overlay" onClick={toggleMenu}></div>

        <main className="main-panel" id="main-content">
          <header className="topbar">
            <button className="hamburger" onClick={toggleMenu} type="button" aria-label="Open Menu" aria-expanded="false">
              <svg className="ui-icon"><use href="#i-list" /></svg>
            </button>
            <h1 id="topbar-greeting">Hi</h1>
            <div className="topbar-right">
              <span className="pill">Campus companion</span>
              <button className="icon-btn" type="button" aria-label="Notifications">
                <svg className="ui-icon"><use href="#i-bell" /></svg>
              </button>
            </div>
          </header>

          <section id="home" className="page home-page">
            <p className="subheading">Executive summary</p>

            <div className="kpi-strip">
              <article className="kpi-card">
                <p className="kpi-label">Tasks today</p>
                <h3 className="kpi-value" id="home-task-total">0</h3>
                <p className="kpi-meta" id="home-task-remaining">0 remaining</p>
              </article>
              <article className="kpi-card">
                <p className="kpi-label">Live announcements</p>
                <h3 className="kpi-value" id="home-ann-live">0</h3>
                <p className="kpi-meta" id="home-ann-open">0 open</p>
              </article>
              <article className="kpi-card">
                <p className="kpi-label">Open carpools</p>
                <h3 className="kpi-value" id="home-travel-open">0</h3>
                <p className="kpi-meta" id="home-travel-connected">0 connected</p>
              </article>
              <article className="kpi-card">
                <p className="kpi-label">Match quality</p>
                <h3 className="kpi-value" id="home-partner-top-vibe">0%</h3>
                <p className="kpi-meta" id="home-partner-match-count">0 suggestions</p>
              </article>
            </div>

            <div className="module-grid">
              <article className="module-card">
                <div className="module-card-head">
                  <span className="module-icon"><svg className="ui-icon"><use href="#i-megaphone" /></svg></span>
                  <h3 className="module-title">Announcements</h3>
                </div>
                <p className="module-purpose">Live campus updates, registrations, and result windows.</p>
                <div className="module-stats">
                  <span className="module-chip info">Live feed</span>
                  <small><strong id="home-ann-live-2">0</strong> live · <strong id="home-ann-open-2">0</strong> open</small>
                </div>
                <button type="button" className="module-link" onClick={handleShowPage('announcements')}>Open module <svg className="ui-icon"><use href="#i-arrow-right" /></svg></button>
              </article>

              <article className="module-card" data-role="student-only">
                <div className="module-card-head">
                  <span className="module-icon"><svg className="ui-icon"><use href="#i-users" /></svg></span>
                  <h3 className="module-title">Partner Up</h3>
                </div>
                <p className="module-purpose">Guided student matching for projects, prep, and campus goals.</p>
                <div className="module-stats">
                  <span className="module-chip primary">Guided journey</span>
                  <small><strong id="home-partner-match-count-2">0</strong> matches · <strong id="home-partner-top-vibe-2">0%</strong> best fit</small>
                </div>
                <button type="button" className="module-link" onClick={handleShowPage('partner')}>Open module <svg className="ui-icon"><use href="#i-arrow-right" /></svg></button>
              </article>

              <article className="module-card" data-role="student-only">
                <div className="module-card-head">
                  <span className="module-icon"><svg className="ui-icon"><use href="#i-route" /></svg></span>
                  <h3 className="module-title">Travel</h3>
                </div>
                <p className="module-purpose">Coordinate hometown companions and intercity carpools.</p>
                <div className="module-stats">
                  <span className="module-chip warning">Coordination</span>
                  <small><strong id="home-travel-open-2">0</strong> open trips · <strong id="home-travel-connected-2">0</strong> connections</small>
                </div>
                <button type="button" className="module-link" onClick={handleShowPage('travel')}>Open module <svg className="ui-icon"><use href="#i-arrow-right" /></svg></button>
              </article>

              <article className="module-card">
                <div className="module-card-head">
                  <span className="module-icon"><svg className="ui-icon"><use href="#i-calendar" /></svg></span>
                  <h3 className="module-title">Events</h3>
                </div>
                <p className="module-purpose">Track registrations, schedules, and important event milestones.</p>
                <div className="module-stats">
                  <span className="module-chip success">Active</span>
                  <small><strong id="home-events-upcoming">7</strong> upcoming</small>
                </div>
                <button type="button" className="module-link" onClick={handleShowPage('events')}>Open module <svg className="ui-icon"><use href="#i-arrow-right" /></svg></button>
              </article>

              <article className="module-card">
                <div className="module-card-head">
                  <span className="module-icon"><svg className="ui-icon"><use href="#i-compass" /></svg></span>
                  <h3 className="module-title">Discover</h3>
                </div>
                <p className="module-purpose">Explore opportunities across campus communities and interests.</p>
                <div className="module-stats">
                  <span className="module-chip info">Explore</span>
                  <small><strong id="home-discover-opps">12</strong> opportunities</small>
                </div>
                <button type="button" className="module-link" onClick={handleShowPage('discover')}>Open module <svg className="ui-icon"><use href="#i-arrow-right" /></svg></button>
              </article>

              <article className="module-card">
                <div className="module-card-head">
                  <span className="module-icon"><svg className="ui-icon"><use href="#i-briefcase" /></svg></span>
                  <h3 className="module-title">Clubs</h3>
                </div>
                <p className="module-purpose">Navigate club roles, pathways, and recruitment roadmaps.</p>
                <div className="module-stats">
                  <span className="module-chip primary">Career growth</span>
                  <small><strong id="home-club-count">0</strong> clubs listed</small>
                </div>
                <button type="button" className="module-link" onClick={handleShowPage('clubs')}>Open module <svg className="ui-icon"><use href="#i-arrow-right" /></svg></button>
              </article>

              <article className="module-card">
                <div className="module-card-head">
                  <span className="module-icon"><svg className="ui-icon"><use href="#i-check-square" /></svg></span>
                  <h3 className="module-title">To-Do</h3>
                </div>
                <p className="module-purpose">Organize daily, weekly, monthly, and yearly action plans.</p>
                <div className="module-stats">
                  <span className="module-chip success">Execution</span>
                  <small><strong id="home-module-task-total">0</strong> total tasks</small>
                </div>
                <button type="button" className="module-link" onClick={handleShowPage('todo')}>Open module <svg className="ui-icon"><use href="#i-arrow-right" /></svg></button>
              </article>

              <article className="module-card">
                <div className="module-card-head">
                  <span className="module-icon"><svg className="ui-icon"><use href="#i-heart" /></svg></span>
                  <h3 className="module-title">Well-being</h3>
                </div>
                <p className="module-purpose">Maintain hydration, eye-care, and posture with smart reminders.</p>
                <div className="module-stats">
                  <span className="module-chip warning">Habits</span>
                  <small><strong id="home-wellbeing-score">0%</strong> daily progress</small>
                </div>
                <button type="button" className="module-link" onClick={handleShowPage('wellbeing')}>Open module <svg className="ui-icon"><use href="#i-arrow-right" /></svg></button>
              </article>
            </div>

            <div className="home-workbench">
              <article className="panel-card">
                <div className="panel-head">
                  <h2>Pending actions</h2>
                  <button type="button" className="text-btn" onClick={handleShowPage('todo')}>Open To-Do</button>
                </div>
                <ul className="pending-list quick-tasks" id="home-quick-tasks"></ul>
              </article>

              <article className="panel-card">
                <div className="panel-head">
                  <h2>Upcoming timeline</h2>
                  <button type="button" className="text-btn" onClick={handleShowPage('events')}>Open Events</button>
                </div>
                <ul className="timeline-list">
                  <li>
                    <span className="timeline-time"><svg className="ui-icon"><use href="#i-clock" /></svg> 09:00</span>
                    <div>
                      <strong>Hackathon registration briefing</strong>
                      <p>Auditorium Block A</p>
                    </div>
                  </li>
                  <li>
                    <span className="timeline-time"><svg className="ui-icon"><use href="#i-clock" /></svg> 14:30</span>
                    <div>
                      <strong>Cloud workshop screening round</strong>
                      <p>Lab 3</p>
                    </div>
                  </li>
                  <li>
                    <span className="timeline-time"><svg className="ui-icon"><use href="#i-clock" /></svg> 17:45</span>
                    <div>
                      <strong>Carpool planning check-in</strong>
                      <p>Travel module sync</p>
                    </div>
                  </li>
                </ul>
              </article>
            </div>

            <div className="home-boost">
              <article className="panel-card focus-card" id="focus-sprint">
                <div className="panel-head">
                  <h2>Focus sprint</h2>
                  <span className="trust-badge">Pomodoro-ready</span>
                </div>
                <p className="focus-sub">Lock in for a deep work sprint and keep your momentum score climbing.</p>

                <div className="focus-timer">
                  <div>
                    <div id="focus-time" className="focus-time" aria-live="polite">25:00</div>
                    <div id="focus-meta" className="focus-meta">Ready for a 25-minute sprint.</div>
                  </div>
                  <div className="focus-stats">
                    <span>Streak <strong id="focus-streak">0</strong>d</span>
                    <span>Sessions <strong id="focus-sessions">0</strong></span>
                  </div>
                </div>

                <div className="focus-presets" id="focus-presets">
                  <button type="button" className="preset-chip" data-duration="25">25 min</button>
                  <button type="button" className="preset-chip" data-duration="45">45 min</button>
                  <button type="button" className="preset-chip" data-duration="60">60 min</button>
                </div>

                <div className="focus-controls">
                  <button type="button" id="focus-start">Start sprint</button>
                  <button type="button" id="focus-pause" className="action-btn subtle">Pause</button>
                  <button type="button" id="focus-reset" className="action-btn subtle">Reset</button>
                </div>

                <div className="focus-next">
                  <h4>Suggested tasks</h4>
                  <ul id="focus-task-list" className="focus-task-list"></ul>
                </div>
              </article>

              <article className="panel-card momentum-card">
                <div className="panel-head">
                  <h2>Momentum score</h2>
                  <span className="trust-badge">Student OS</span>
                </div>

                <div className="momentum-grid">
                  <div className="momentum-ring" id="momentum-ring" style={{ '--score': 0 }}>
                    <span id="momentum-score-value">0</span>
                    <small>Momentum</small>
                  </div>
                  <div className="momentum-metrics">
                    <div className="momentum-metric">
                      <h4 id="momentum-focus-score">0%</h4>
                      <p>Focus</p>
                    </div>
                    <div className="momentum-metric">
                      <h4 id="momentum-wellbeing-score">0%</h4>
                      <p>Well-being</p>
                    </div>
                    <div className="momentum-metric">
                      <h4 id="momentum-campus-score">0%</h4>
                      <p>Campus</p>
                    </div>
                  </div>
                </div>

                <ul id="momentum-insights" className="momentum-insights"></ul>
              </article>
            </div>

            <section className="quotes quote-card">
              <p id="quote-text">Small steps every day lead to big results.</p>
            </section>

            <img id="heroImg" src="/assets/hero-blue.svg" alt="Theme helper" hidden />
          </section>

          <section id="auth" className="page auth-page" style={{ display: 'none' }}>
            <div className="auth-shell">
              <div className="content-card auth-hero">
                <span className="hero-kicker">NMIT Connect</span>
                <h2>Welcome back 👋</h2>
                <p className="auth-subtitle">Sign in with your NMIT Google account to unlock campus features, save your profile, and sync tasks across devices.</p>

                <div className="auth-feature-grid">
                  <article className="auth-feature-card">
                    <h4>Hometown map</h4>
                    <p>Find classmates from the same city and stay connected.</p>
                  </article>
                  <article className="auth-feature-card">
                    <h4>Partner Up</h4>
                    <p>Match with peers for projects, study groups, and goals.</p>
                  </article>
                  <article className="auth-feature-card">
                    <h4>Smart To‑Do</h4>
                    <p>Keep daily, weekly, and yearly plans synced to your account.</p>
                  </article>
                </div>
              </div>

              <div className="content-card auth-card">
                <div className="auth-card-head">
                  <span className="trust-badge">NMIT domain only</span>
                  <h3>Login / Sign up</h3>
                  <p>We’ll create your profile automatically the first time you log in.</p>
                </div>

                <div className="auth-actions">
                  <button type="button" onClick={login}>Continue with Google</button>
                  <button type="button" className="auth-secondary-btn" onClick={handleShowPage('profile')}>View profile</button>
                </div>

                <p className="auth-note">Only <strong>@nmit.ac.in</strong> accounts are allowed. Your data stays private to you.</p>
              </div>
            </div>
          </section>

          <section id="announcements" className="page" style={{ display: 'none' }}>
            <div className="content-card ann-shell">
              <div className="module-purpose">
                <div>
                  <h2>Announcements</h2>
                  <p>Live campus pulse for deadlines, results, and registration windows.</p>
                </div>
                <span className="trust-badge">Campus live feed</span>
              </div>

              <div className="metrics-row">
                <article className="metric-card">
                  <p>Live now</p>
                  <h4 id="ann-metric-live">0</h4>
                </article>
                <article className="metric-card">
                  <p>Open windows</p>
                  <h4 id="ann-metric-open">0</h4>
                </article>
                <article className="metric-card">
                  <p>Closing soon</p>
                  <h4 id="ann-metric-closing">0</h4>
                </article>
              </div>

              <div className="ann-page-layout">
                <div className="ann-main">
                  <article className="panel-card feed-card">
                    <div className="panel-head">
                      <h3>Pulse stream</h3>
                      <span className="row-meta">Live updates</span>
                    </div>
                    <div id="announcements-pulse-row" className="guild-pulse-row"></div>
                  </article>

                  <article className="panel-card feed-card">
                    <div className="panel-head">
                      <h3>Priority updates</h3>
                      <button type="button" className="text-btn" onClick={handleShowPage('clubs')}>Open Career Hub</button>
                    </div>
                    <div id="announcements-list" className="guild-announcement-list"></div>
                  </article>
                </div>

                <aside className="ann-side">
                  <article className="panel-card">
                    <h3>Timeline view</h3>
                    <ul className="timeline-list compact">
                      <li>
                        <span className="timeline-time">Today</span>
                        <div>
                          <strong>Interview shortlist release</strong>
                          <p>Cloud and Security tracks</p>
                        </div>
                      </li>
                      <li>
                        <span className="timeline-time">Tomorrow</span>
                        <div>
                          <strong>Hackathon registration closes</strong>
                          <p>Submit before 18:00</p>
                        </div>
                      </li>
                      <li>
                        <span className="timeline-time">Friday</span>
                        <div>
                          <strong>Results publication cycle</strong>
                          <p>Official portal refresh</p>
                        </div>
                      </li>
                    </ul>
                  </article>

                  <article className="panel-card module-next-action">
                    <h3>Next action</h3>
                    <p>Review updates marked critical and confirm required submissions.</p>
                    <button type="button" onClick={handleShowPage('clubs')}>Open career actions</button>
                  </article>
                </aside>
              </div>
            </div>
          </section>

          <section id="events" className="page" style={{ display: 'none' }}>
            <div className="content-card">
              <div className="module-purpose">
                <div>
                  <h2>Events</h2>
                  <p>Track event cards, registration links, and reminders in one place.</p>
                </div>
                <span className="trust-badge">Calendar board</span>
              </div>
              <div className="state-empty">
                <h3>Event board is ready</h3>
                <p>Plug in event records here to activate this workspace.</p>
              </div>
            </div>
          </section>

          <section id="entertainment" className="page" style={{ display: 'none' }}>
            <div className="content-card cinema-shell netflix-shell">
              <div className="module-purpose">
                <div>
                  <h2>Entertainment</h2>
                  <p>Campus leisure hub with cleaner trending rows and personalized picks.</p>
                </div>
                <span className="trust-badge">Curated recommendations</span>
              </div>

              <div className="metrics-row ent-metrics">
                <article className="metric-card">
                  <p>Trending rows</p>
                  <h4>5</h4>
                </article>
                <article className="metric-card">
                  <p>Recommendation confidence</p>
                  <h4 id="ent-metric-confidence">--</h4>
                </article>
                <article className="metric-card">
                  <p>Search mode</p>
                  <h4 id="ent-metric-mode">Live</h4>
                </article>
              </div>

              <section className="tmdb-discover-shell">
                <div className="tmdb-top-search">
                  <svg className="ui-icon tmdb-search-icon"><use href="#i-compass" /></svg>
                  <input id="tmdb-global-search" type="text" placeholder="Search for a movie, show, or creator" />
                </div>

                <div className="tmdb-hero-banner" id="tmdb-hero-banner">
                  <div className="tmdb-hero-overlay">
                    <span className="hero-kicker">Now trending</span>
                    <h2 id="tmdb-hero-title">Welcome.</h2>
                    <p id="tmdb-hero-tagline">Discover movies, series, and anime curated for your mood.</p>
                    <p id="tmdb-hero-meta" className="hero-meta">TMDB live discovery</p>
                    <div className="hero-actions">
                      <button id="tmdb-hero-play" type="button">Play preview</button>
                    </div>
                    <div className="tmdb-hero-search-row">
                      <input id="tmdb-hero-search" type="text" placeholder="Search title or vibe" />
                      <button id="tmdb-hero-search-btn" type="button">Search</button>
                    </div>
                  </div>
                </div>
              </section>

              <div className="stream-layout">
                <div className="stream-main cinematic-rows">
                  <section className="ent-row-block" id="tmdb-row-day-block">
                    <div className="panel-head">
                      <h3>Trending today</h3>
                      <div className="row-tools">
                        <span className="row-meta">/trending/all/day</span>
                        <button type="button" className="row-scroll-btn" data-track-id="tmdb-row-day-track" data-direction="prev" aria-label="Scroll Trending Today left">◀</button>
                        <button type="button" className="row-scroll-btn" data-track-id="tmdb-row-day-track" data-direction="next" aria-label="Scroll Trending Today right">▶</button>
                      </div>
                    </div>
                    <div id="tmdb-row-day-track" className="tmdb-trending-track"></div>
                  </section>

                  <section className="ent-row-block" id="tmdb-row-week-block">
                    <div className="panel-head">
                      <h3>Trending this week</h3>
                      <div className="row-tools">
                        <span className="row-meta">/trending/all/week</span>
                        <button type="button" className="row-scroll-btn" data-track-id="tmdb-row-week-track" data-direction="prev" aria-label="Scroll Trending This Week left">◀</button>
                        <button type="button" className="row-scroll-btn" data-track-id="tmdb-row-week-track" data-direction="next" aria-label="Scroll Trending This Week right">▶</button>
                      </div>
                    </div>
                    <div id="tmdb-row-week-track" className="tmdb-trending-track"></div>
                  </section>

                  <section className="ent-row-block" id="tmdb-row-popular-block">
                    <div className="panel-head">
                      <h3>Popular movies</h3>
                      <div className="row-tools">
                        <span className="row-meta">/movie/popular</span>
                        <button type="button" className="row-scroll-btn" data-track-id="tmdb-row-popular-track" data-direction="prev" aria-label="Scroll Popular Movies left">◀</button>
                        <button type="button" className="row-scroll-btn" data-track-id="tmdb-row-popular-track" data-direction="next" aria-label="Scroll Popular Movies right">▶</button>
                      </div>
                    </div>
                    <div id="tmdb-row-popular-track" className="tmdb-trending-track"></div>
                  </section>

                  <section className="ent-row-block" id="tmdb-row-toprated-block">
                    <div className="panel-head">
                      <h3>Top rated movies</h3>
                      <div className="row-tools">
                        <span className="row-meta">/movie/top_rated</span>
                        <button type="button" className="row-scroll-btn" data-track-id="tmdb-row-toprated-track" data-direction="prev" aria-label="Scroll Top Rated Movies left">◀</button>
                        <button type="button" className="row-scroll-btn" data-track-id="tmdb-row-toprated-track" data-direction="next" aria-label="Scroll Top Rated Movies right">▶</button>
                      </div>
                    </div>
                    <div id="tmdb-row-toprated-track" className="tmdb-trending-track"></div>
                  </section>

                  <section className="ent-row-block" id="tmdb-row-anime-block">
                    <div className="panel-head">
                      <h3>Top anime</h3>
                      <div className="row-tools">
                        <span className="row-meta">Jikan /top/anime</span>
                        <button type="button" className="row-scroll-btn" data-track-id="tmdb-row-anime-track" data-direction="prev" aria-label="Scroll Top Anime left">◀</button>
                        <button type="button" className="row-scroll-btn" data-track-id="tmdb-row-anime-track" data-direction="next" aria-label="Scroll Top Anime right">▶</button>
                      </div>
                    </div>
                    <div id="tmdb-row-anime-track" className="tmdb-trending-track"></div>
                  </section>

                  <section className="vibe-center vibe-search-container" id="vibe-center">
                    <div className="panel-head">
                      <h3>My recommendations</h3>
                      <span className="trust-badge">Personalized</span>
                    </div>
                    <p className="partner-sub">Describe your mood and get focused recommendations from the campus engine.</p>

                    <div className="vibe-controls">
                      <input id="vibe-query" type="text" defaultValue="Action packed with a bittersweet ending" placeholder="Example: action packed with a bittersweet ending" />
                      <button id="run-vibe-search" type="button">Vibe search</button>
                    </div>

                    <div id="mood-presets" className="mood-presets">
                      <button type="button" className="preset-chip" data-query="Brain-dead after work, fun and easy watch">Easy watch</button>
                      <button type="button" className="preset-chip" data-query="Need an adrenaline shot with fast pacing">Adrenaline</button>
                      <button type="button" className="preset-chip" data-query="Dark gritty solo deep-dive">Dark solo</button>
                      <button type="button" className="preset-chip" data-query="Bright group party watch with humor">Group watch</button>
                    </div>

                    <div id="dna-options" className="dna-toggles">
                      <label><input type="checkbox" value="Fast pacing" defaultChecked /> Fast pacing</label>
                      <label><input type="checkbox" value="Non-linear storytelling" /> Non-linear storytelling</label>
                      <label><input type="checkbox" value="High-contrast visuals" defaultChecked /> High-contrast visuals</label>
                      <label><input type="checkbox" value="Bittersweet" /> Bittersweet endings</label>
                      <label><input type="checkbox" value="Heroic" /> Heroic arcs</label>
                      <label><input type="checkbox" value="Wholesome" /> Wholesome tone</label>
                    </div>

                    <div className="dealbreaker-grid compact">
                      <label className="switch-line"><input id="safe-ending-toggle" type="checkbox" /> Avoid sad endings</label>
                      <label className="switch-line"><input id="hidden-gems-toggle" type="checkbox" /> Hidden gems only (&lt;1M views)</label>
                      <label className="switch-line"><input id="strict-runtime-toggle" type="checkbox" /> Strict runtime</label>
                      <label className="runtime-line" htmlFor="runtime-minutes">
                        Runtime limit (minutes)
                        <input id="runtime-minutes" type="number" min="60" max="240" defaultValue={135} />
                      </label>
                    </div>

                    <p id="confidence-message" className="confidence-banner"></p>

                    <div className="ent-actions">
                      <button id="wildcard-reco" type="button" className="action-btn subtle">Try wildcard</button>
                    </div>
                  </section>

                  <section className="ent-row-block" id="row-perfect-block">
                    <div className="panel-head">
                      <h3>Personalized picks</h3>
                      <div className="row-tools">
                        <span className="row-meta">Mood + reliability scoring</span>
                        <button type="button" className="row-scroll-btn" data-track-id="row-perfect-track" data-direction="prev" aria-label="Scroll vibe picks left">◀</button>
                        <button type="button" className="row-scroll-btn" data-track-id="row-perfect-track" data-direction="next" aria-label="Scroll vibe picks right">▶</button>
                      </div>
                    </div>
                    <div id="row-perfect-track" className="row-track"></div>
                  </section>
                </div>
              </div>

              <section id="expanded-card" className="expanded-card" hidden>
                <div className="expanded-head">
                  <div>
                    <h3 id="expanded-title">Title</h3>
                    <p id="expanded-meta" className="feature-meta"></p>
                  </div>
                  <div className="expanded-actions">
                    <span id="expanded-score" className="score-pill">--</span>
                    <button id="expanded-close" type="button" className="action-btn subtle">Close</button>
                  </div>
                </div>

                <div id="expanded-tabs" className="tabs-row">
                  <button type="button" className="tab-btn active" data-tab-target="overview">Overview</button>
                  <button type="button" className="tab-btn" data-tab-target="dna">Vibe DNA</button>
                  <button type="button" className="tab-btn" data-tab-target="comments">Comments</button>
                </div>

                <div id="tab-overview" className="tab-panel active">
                  <p id="overview-plot" className="feature-description"></p>
                  <p id="overview-endtime" className="feature-endtime"></p>
                  <p id="overview-source" className="feature-meta"></p>
                </div>

                <div id="tab-dna" className="tab-panel">
                  <div id="dna-tags" className="chip-row"></div>
                  <p id="dna-because" className="feature-because"></p>
                </div>

                <div id="tab-comments" className="tab-panel">
                  <ul id="comments-list" className="comments-list"></ul>
                </div>
              </section>

              <article className="panel-card module-alerts">
                <h3>Alerts and exceptions</h3>
                <ul className="timeline-list compact">
                  <li>
                    <span className="timeline-time"><svg className="ui-icon"><use href="#i-alert" /></svg></span>
                    <div>
                      <strong>No match fallback</strong>
                      <p>If your query is too strict, use wildcard mode.</p>
                    </div>
                  </li>
                  <li>
                    <span className="timeline-time"><svg className="ui-icon"><use href="#i-alert" /></svg></span>
                    <div>
                      <strong>API degradation</strong>
                      <p>System automatically falls back to local catalog.</p>
                    </div>
                  </li>
                </ul>
              </article>

              <article className="panel-card module-next-action">
                <h3>Next action</h3>
                <p>Run a vibe search and save one pick for tonight.</p>
                <button type="button" id="ent-next-action">Open personalized picks</button>
              </article>
            </div>
          </section>

          <section id="discover" className="page" style={{ display: 'none' }}>
            <div className="content-card">
              <div className="module-purpose">
                <div>
                  <h2>Discover</h2>
                  <p>Find clubs, study circles, internships, and campus opportunities.</p>
                </div>
                <span className="trust-badge">Opportunity board</span>
              </div>
              <div className="state-empty">
                <h3>Discovery board is ready</h3>
                <p>Add recommendation sources to activate this page.</p>
              </div>
            </div>
          </section>

          <section id="clubs" className="page" style={{ display: 'none' }}>
            <div className="content-card guild-shell" id="career-hub">
              <section className="guild-hero">
                <div className="guild-hero-overlay">
                  <span className="hero-kicker">NMIT Career Hub</span>
                  <h2>Guild selection</h2>
                  <p>Find clubs by skills, recruitment roadmap, and growth outcomes.</p>

                  <div className="guild-search-row">
                    <input id="guild-search-input" type="text" placeholder="What do you want to learn today?" />
                    <button id="guild-search-btn" type="button">Search</button>
                  </div>
                  <p id="guild-search-feedback" className="guild-search-feedback">Try: Coding, Public Speaking, Robotics, Cloud, AI, Social Service.</p>
                </div>
              </section>

              <section className="guild-live-pulse">
                <div className="panel-head">
                  <h3>The pulse</h3>
                  <span className="row-meta">Hackathons · interview calls · shortlists</span>
                </div>
                <div id="guild-pulse-track" className="guild-pulse-track"></div>
              </section>

              <section className="guild-library">
                <div className="panel-head">
                  <h3>The guild library</h3>
                  <div className="guild-filter-row" id="guild-filter-row">
                    <button type="button" className="guild-filter-btn active" data-category="all">All</button>
                    <button type="button" className="guild-filter-btn" data-category="Technical">Technical</button>
                    <button type="button" className="guild-filter-btn" data-category="Cultural">Cultural</button>
                    <button type="button" className="guild-filter-btn" data-category="Management">Management</button>
                    <button type="button" className="guild-filter-btn" data-category="Social Service">Social Service</button>
                  </div>
                </div>

                <div id="guild-catalog" className="guild-catalog-grid"></div>
              </section>

              <section id="guild-detail" className="guild-detail" hidden>
                <div className="expanded-head">
                  <div>
                    <h3 id="guild-detail-name">Club name</h3>
                    <p id="guild-detail-meta" className="feature-meta"></p>
                  </div>
                  <div className="expanded-actions">
                    <button id="guild-detail-close" type="button" className="action-btn subtle">Close</button>
                  </div>
                </div>

                <p id="guild-detail-mission" className="feature-description"></p>

                <div className="guild-detail-columns">
                  <article className="guild-detail-card">
                    <h4>Roles available</h4>
                    <ul id="guild-detail-roles" className="guild-list"></ul>
                  </article>
                  <article className="guild-detail-card">
                    <h4>What is in it for you?</h4>
                    <ul id="guild-detail-roi" className="guild-list"></ul>
                  </article>
                </div>

                <article className="guild-detail-card roadmap-card">
                  <h4>Recruitment roadmap</h4>
                  <ol id="guild-detail-roadmap" className="guild-roadmap"></ol>
                  <p id="guild-detail-protip" className="guild-protip"></p>
                </article>
              </section>
            </div>
          </section>

          <section id="profile" className="page" style={{ display: 'none' }}>
            <div className="content-card profile-shell">
              <div className="profile-sidebar">
                <h2>Student profile</h2>
                <p className="profile-subtitle">Keep your details updated so matching and hometown maps stay accurate.</p>

                <div className="profile-card">
                  <img id="student-photo" src="/assets/profile-placeholder.svg" alt="Profile Picture" />
                  <h3 id="student-name">Your name</h3>
                  <p id="student-branch">Branch: Computer Science</p>
                  <p id="student-year">Year: 3rd Year</p>
                  <p id="student-city">City: --</p>
                  <p id="student-state">State: --</p>
                  <p id="student-bio">Bio: Loves coding and anime.</p>
                </div>

                <div className="profile-badges">
                  <span className="module-chip info">NMIT verified</span>
                  <span className="module-chip success">Profile synced</span>
                  <span className="module-chip warning">Keep it fresh</span>
                </div>
              </div>

              <div className="profile-form-card">
                <h3>Update details</h3>
                <form id="profile-form" className="stack-form">
                  <input type="text" id="name-input" placeholder="Enter Name" />
                  <select id="branch-input" defaultValue="">
                    <option value="" disabled>Select branch</option>
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
                  <input type="number" id="year-input" min="1" max="4" placeholder="Enter Year" />
                  <input type="text" id="city-input" placeholder="Enter City" />
                  <input type="text" id="state-input" placeholder="Enter State" />
                  <input type="url" id="photo-input" placeholder="Photo URL (optional)" />
                  <input type="text" id="bio-input" placeholder="Enter Bio" />
                  <div className="profile-actions">
                    <button type="submit">Save profile</button>
                    <button id="reset-profile" type="button" className="auth-secondary-btn">Reset profile</button>
                  </div>
                </form>
              </div>
            </div>
          </section>

          <section id="todo" className="page todo-page" style={{ display: 'none' }}>
            <div className="todo-page-top">
              <div>
                <h2 className="todo-page-title">To-Do</h2>
                <p className="todo-page-sub">Your workboard across daily, weekly, monthly, and yearly plans.</p>
              </div>
              <div className="todo-stats-row">
                <div className="todo-stat-pill">
                  <span className="todo-stat-num" id="todo-task-total">0</span>
                  <span className="todo-stat-label">total</span>
                </div>
                <div className="todo-stat-pill">
                  <span className="todo-stat-num remaining" id="todo-task-remaining-count">0</span>
                  <span className="todo-stat-label">left</span>
                </div>
              </div>
            </div>

            <div className="notes-grid">
              <div className="note-card note-daily">
                <div className="note-pin pin-yellow"></div>
                <h3 className="note-title">Daily tasks</h3>
                <form id="daily-form" className="note-input-row">
                  <input id="daily-input" className="note-input" placeholder="Add a daily task" />
                  <button type="submit" className="note-add add-yellow">Add</button>
                </form>
                <ul id="daily-list" className="note-task-list"></ul>
              </div>

              <div className="note-card note-weekly">
                <div className="note-pin pin-pink"></div>
                <h3 className="note-title">Weekly tasks</h3>
                <form id="weekly-form" className="note-input-row">
                  <input id="weekly-input" className="note-input" placeholder="Add a weekly task" />
                  <button type="submit" className="note-add add-pink">Add</button>
                </form>
                <ul id="weekly-list" className="note-task-list"></ul>
              </div>

              <div className="note-card note-monthly">
                <div className="note-pin pin-blue"></div>
                <h3 className="note-title">Monthly tasks</h3>
                <form id="monthly-form" className="note-input-row">
                  <input id="monthly-input" className="note-input" placeholder="Add a monthly task" />
                  <button type="submit" className="note-add add-blue">Add</button>
                </form>
                <ul id="monthly-list" className="note-task-list"></ul>
              </div>

              <div className="note-card note-yearly">
                <div className="note-pin pin-green"></div>
                <h3 className="note-title">Yearly goals</h3>
                <form id="yearly-form" className="note-input-row">
                  <input id="yearly-input" className="note-input" placeholder="Add a yearly goal" />
                  <button type="submit" className="note-add add-green">Add</button>
                </form>
                <ul id="yearly-list" className="note-task-list"></ul>
              </div>
            </div>
          </section>

          <section id="wellbeing" className="page wb-page" style={{ display: 'none' }}>
            <div className="wb-page-top">
              <div>
                <h2 className="wb-page-title">Well-being</h2>
                <p className="wb-page-sub">Track healthy habits and keep consistent routines.</p>
              </div>
              <div className="wb-streak">
                <span className="wb-streak-num">7</span>
                <span className="wb-streak-label">day streak</span>
              </div>
            </div>

            <div className="wb-trackers">
              <div className="wb-tracker tc-green">
                <div className="wb-tracker-blob"></div>
                <div className="wb-tracker-icon">H2O</div>
                <div className="wb-tracker-name">Hydration</div>
                <div className="wb-tracker-count" id="water-count-display">0</div>
                <div className="wb-tracker-unit">glasses today · goal: 8</div>
                <div className="wb-bar"><div className="wb-bar-fill fill-green" id="water-bar" style={{ width: '0%' }}></div></div>
                <p id="water-log" style={{ display: 'none' }}>Cups today: 0</p>
                <button id="drink-water" type="button" className="wb-btn btn-green">Log hydration</button>
              </div>

              <div className="wb-tracker tc-mint">
                <div className="wb-tracker-blob"></div>
                <div className="wb-tracker-icon">Eye</div>
                <div className="wb-tracker-name">Eye break</div>
                <div className="wb-tracker-count" id="eye-count-display">0</div>
                <div className="wb-tracker-unit">breaks today · goal: 6</div>
                <div className="wb-bar"><div className="wb-bar-fill fill-mint" id="eye-bar" style={{ width: '0%' }}></div></div>
                <p id="eye-log" style={{ display: 'none' }}>Breaks today: 0</p>
                <button id="eye-break" type="button" className="wb-btn btn-mint">Log eye break</button>
              </div>

              <div className="wb-tracker tc-sage">
                <div className="wb-tracker-blob"></div>
                <div className="wb-tracker-icon">Posture</div>
                <div className="wb-tracker-name">Posture</div>
                <div className="wb-tracker-count" id="posture-count-display">0</div>
                <div className="wb-tracker-unit">checks today · goal: 5</div>
                <div className="wb-bar"><div className="wb-bar-fill fill-sage" id="posture-bar" style={{ width: '0%' }}></div></div>
                <p id="posture-log" style={{ display: 'none' }}>Reminders done: 0</p>
                <button id="posture-check" type="button" className="wb-btn btn-sage">Log posture check</button>
              </div>
            </div>

            <div className="wb-bottom-row">
              <div className="wb-settings-card">
                <h3 className="wb-card-title">Reminder intervals</h3>
                <form id="reminder-form" className="wb-form">
                  <div className="wb-field">
                    <label>Hydration (minutes)</label>
                    <input type="number" id="hydration-interval" defaultValue={120} />
                  </div>
                  <div className="wb-field">
                    <label>Eye break (minutes)</label>
                    <input type="number" id="eye-interval" defaultValue={20} />
                  </div>
                  <div className="wb-field">
                    <label>Posture check (minutes)</label>
                    <input type="number" id="posture-interval" defaultValue={45} />
                  </div>
                  <button type="submit" className="wb-save-btn">Save settings</button>
                </form>
              </div>

              <div className="wb-log-card">
                <h3 className="wb-card-title">Reminder log</h3>
                <ul id="reminder-log" className="wb-log-list">
                  <li className="wb-log-empty">No reminders yet. Start tracking habits.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="partner" className="page pulse-night-page" style={{ display: 'none' }} data-role="student-only">
            <div className="content-card">
              <div className="module-purpose">
                <div>
                  <h2>Partner Up</h2>
                  <p>Guided matching journey for collaborators, study peers, and campus goals.</p>
                </div>
                <span className="trust-badge">Verified campus users</span>
              </div>

              <div className="metrics-row partner-metrics">
                <article className="metric-card">
                  <p>Profile completion</p>
                  <h4 id="partner-metric-profile">0%</h4>
                </article>
                <article className="metric-card">
                  <p>Suggestions</p>
                  <h4 id="partner-metric-suggestions">0</h4>
                </article>
                <article className="metric-card">
                  <p>Confidence</p>
                  <h4 id="partner-metric-confidence">Low</h4>
                </article>
              </div>

              <form id="partner-form" className="stack-form campus-form">
                <div className="partner-grid-form">
                  <label>
                    Display Name
                    <input type="text" id="partner-name" placeholder="e.g., Hari Coder" />
                  </label>

                  <label>
                    Branch
                    <select id="partner-branch">
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

                  <label>
                    Year
                    <select id="partner-year">
                      <option value="">Select year</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                  </label>

                  <label>
                    Current Status
                    <select id="partner-status">
                      <option value="Bored in Placement Cell">Bored in Placement Cell</option>
                      <option value="At the OAT">At the OAT</option>
                      <option value="In the Lab">In the Lab</option>
                      <option value="At the Library">At the Library</option>
                      <option value="At the Canteen">At the Canteen</option>
                    </select>
                  </label>
                </div>

                <div className="interest-group">
                  <h4>Club affiliations</h4>
                  <div className="interest-boxes" id="club-options">
                    <input type="checkbox" id="club-hack" value="Hack Club" /><label htmlFor="club-hack">Hack Club</label>
                    <input type="checkbox" id="club-robotics" value="Robotics" /><label htmlFor="club-robotics">Robotics</label>
                    <input type="checkbox" id="club-rotaract" value="Rotaract" /><label htmlFor="club-rotaract">Rotaract</label>
                    <input type="checkbox" id="club-anaadyanta" value="Anaadyanta Organizers" /><label htmlFor="club-anaadyanta">Anaadyanta Organizers</label>
                    <input type="checkbox" id="club-ncc" value="NCC" /><label htmlFor="club-ncc">NCC</label>
                    <input type="checkbox" id="club-ecell" value="E-Cell" /><label htmlFor="club-ecell">E-Cell</label>
                    <input type="checkbox" id="club-cricket" value="NMIT Cricket Team" /><label htmlFor="club-cricket">NMIT Cricket Team</label>
                  </div>
                </div>

                <div className="interest-group">
                  <h4>Campus hangout spots</h4>
                  <div className="interest-boxes" id="hangout-options">
                    <input type="checkbox" id="spot-canteen" value="The Canteen" /><label htmlFor="spot-canteen">The Canteen</label>
                    <input type="checkbox" id="spot-juice" value="Juice Center" /><label htmlFor="spot-juice">Juice Center</label>
                    <input type="checkbox" id="spot-library" value="Library" /><label htmlFor="spot-library">Library</label>
                    <input type="checkbox" id="spot-oat" value="OAT" /><label htmlFor="spot-oat">OAT</label>
                    <input type="checkbox" id="spot-indoor" value="Indoor Sports Complex" /><label htmlFor="spot-indoor">Indoor Sports Complex</label>
                  </div>
                </div>

                <div className="interest-group">
                  <h4>Common goals</h4>
                  <div className="interest-boxes" id="goal-options">
                    <input type="checkbox" id="goal-hackathon" value="Hackathon Partner" /><label htmlFor="goal-hackathon">Hackathon Partner</label>
                    <input type="checkbox" id="goal-notes" value="Need Notes" /><label htmlFor="goal-notes">Need Notes</label>
                    <input type="checkbox" id="goal-chai" value="Grab Chai at Gate" /><label htmlFor="goal-chai">Grab Chai at Gate</label>
                    <input type="checkbox" id="goal-gym" value="Gym Buddy" /><label htmlFor="goal-gym">Gym Buddy</label>
                    <input type="checkbox" id="goal-anaadyanta" value="Anaadyanta Team" /><label htmlFor="goal-anaadyanta">Anaadyanta Team</label>
                    <input type="checkbox" id="goal-placement" value="Placement Prep Buddy" /><label htmlFor="goal-placement">Placement Prep Buddy</label>
                  </div>
                </div>

                <div className="prompt-stack">
                  <label>
                    My favorite memory from last year's Anaadyanta was...
                    <textarea id="prompt-memory" placeholder="Tell us your best festival moment"></textarea>
                  </label>

                  <label>
                    If you see me at the NMIT library, I’m probably...
                    <input type="text" id="prompt-library" placeholder="Studying hard or charging my phone" />
                  </label>

                  <label>
                    Best place to hang out near Yelahanka is...
                    <input type="text" id="prompt-yelahanka" placeholder="Drop your go-to spot" />
                  </label>

                  <label>
                    I am currently struggling with [Subject Name] and need a savior.
                    <input type="text" id="prompt-subject" placeholder="e.g., Signals and Systems" />
                  </label>

                  <label>
                    My go-to order at the canteen is...
                    <input type="text" id="prompt-canteen" placeholder="e.g., Masala dosa + chai" />
                  </label>
                </div>

                <button type="submit">Save partner profile</button>
              </form>

              <article className="panel-card module-alerts">
                <h3>Alerts and exceptions</h3>
                <ul className="timeline-list compact">
                  <li>
                    <span className="timeline-time"><svg className="ui-icon"><use href="#i-alert" /></svg></span>
                    <div>
                      <strong>Low-confidence signals</strong>
                      <p>Complete branch, year, and preferences to improve matching quality.</p>
                    </div>
                  </li>
                  <li>
                    <span className="timeline-time"><svg className="ui-icon"><use href="#i-alert" /></svg></span>
                    <div>
                      <strong>Missing profile fields</strong>
                      <p>Profiles without essential fields receive fewer relevant suggestions.</p>
                    </div>
                  </li>
                </ul>
              </article>

              <div className="panel-head">
                <h3>Suggested matches</h3>
                <button id="refresh-matches" type="button">Re-run match score</button>
              </div>

              <div id="partner-cards" className="partner-cards"></div>

              <h3>Your matches</h3>
              <ul id="match-list"></ul>

              <article className="panel-card module-next-action">
                <h3>Next action</h3>
                <p>Review your top three suggestions and connect with one profile today.</p>
                <button type="button" onClick={handleScrollToPartnerMatches}>Review top matches</button>
              </article>
            </div>
          </section>

          <section id="travel" className="page travel-page" style={{ display: 'none' }} data-role="student-only">
            <div className="content-card travel-shell">
              <div className="module-purpose">
                <div>
                  <h2>Travel</h2>
                  <p>Coordinate hometown companions and intercity carpools with verified campus users.</p>
                </div>
                <span className="trust-badge">Hometown + carpool coordination</span>
              </div>

              <div className="metrics-row travel-metrics">
                <article className="metric-card">
                  <p>Open trips</p>
                  <h4 id="travel-metric-open">0</h4>
                </article>
                <article className="metric-card">
                  <p>Connected companions</p>
                  <h4 id="travel-metric-connected">0</h4>
                </article>
                <article className="metric-card">
                  <p>Joined carpools</p>
                  <h4 id="travel-metric-joined">0</h4>
                </article>
              </div>

              <div className="travel-tabs" role="tablist" aria-label="Travel sections">
                <button type="button" className="travel-tab-btn active" data-travel-view="companion" aria-selected="true">Hometown</button>
                <button type="button" className="travel-tab-btn" data-travel-view="carpool" aria-selected="false">Carpool</button>
              </div>

              <article id="travel-companion-component" className="travel-component travel-tab-panel active" data-travel-view-panel="companion">
                <div className="panel-head">
                  <h3>Hometown companion</h3>
                  <button id="companion-refresh" type="button" className="action-btn subtle">Refresh</button>
                </div>
                <p className="travel-component-sub">Find classmates from your hometown and connect with confidence indicators.</p>

                <form id="companion-town-form" className="travel-hometown-form">
                  <label htmlFor="companion-town-input">Your hometown</label>
                  <div className="travel-hometown-row">
                    <input type="text" id="companion-town-input" placeholder="e.g., Mangalore" />
                    <button type="submit">Save hometown</button>
                  </div>
                </form>

                <form id="companion-filter-form" className="travel-filter-grid">
                  <label>
                    Hometown to match
                    <input type="text" id="companion-filter-town" placeholder="e.g., Mangalore" />
                  </label>

                  <label>
                    Name / branch keyword
                    <input type="text" id="companion-filter-query" placeholder="e.g., CSE or Ananya" />
                  </label>

                  <button type="submit" className="travel-search-btn">Find companions</button>
                </form>

                <div className="travel-mine-head">
                  <h3>Available companions</h3>
                </div>
                <div id="companion-list" className="travel-cards"></div>

                <div className="travel-mine-head secondary">
                  <h3>Connected companions</h3>
                </div>
                <div id="companion-connected-list" className="travel-cards"></div>
              </article>

              <article id="travel-carpool-component" className="travel-component travel-tab-panel" data-travel-view-panel="carpool" hidden>
                <div className="panel-head">
                  <h3>Carpool (intercity)</h3>
                  <button id="carpool-refresh-feed" type="button" className="action-btn subtle">Refresh</button>
                </div>
                <p className="travel-component-sub">Post and join shared routes such as Hebbal, Bagalur Cross, and Yelahanka.</p>

                <datalist id="carpool-route-suggestions">
                  <option value="Hebbal"></option>
                  <option value="Bagalur Cross"></option>
                  <option value="Yelahanka"></option>
                  <option value="Airport Road"></option>
                  <option value="NMIT"></option>
                </datalist>

                <form id="carpool-form" className="stack-form travel-form">
                  <div className="travel-form-grid">
                    <label>
                      From
                      <input type="text" id="carpool-from" list="carpool-route-suggestions" required placeholder="e.g., NMIT" />
                    </label>

                    <label>
                      To
                      <input type="text" id="carpool-to" list="carpool-route-suggestions" required placeholder="e.g., Hebbal" />
                    </label>

                    <label>
                      Date
                      <input type="date" id="carpool-date" required />
                    </label>

                    <label>
                      Time
                      <input type="text" id="carpool-time" required placeholder="e.g., 6:30 PM" />
                    </label>

                    <label>
                      Seats available
                      <input type="number" id="carpool-seats" min="1" max="6" defaultValue={1} required />
                    </label>
                  </div>

                  <label>
                    Notes
                    <textarea id="carpool-notes" placeholder="Pickup point, flexibility, luggage info"></textarea>
                  </label>

                  <button type="submit">Post carpool trip</button>
                </form>

                <div className="travel-mine-head">
                  <h3>Open carpool trips</h3>
                </div>
                <div id="carpool-feed" className="travel-cards"></div>

                <div className="travel-mine-head secondary">
                  <h3>My posted carpools</h3>
                </div>
                <div id="carpool-my-list" className="travel-cards"></div>

                <div className="travel-mine-head secondary">
                  <h3>Joined carpools</h3>
                </div>
                <div id="carpool-joined-list" className="travel-cards"></div>
              </article>

              <article className="panel-card module-alerts">
                <h3>Alerts and exceptions</h3>
                <ul className="timeline-list compact">
                  <li>
                    <span className="timeline-time"><svg className="ui-icon"><use href="#i-alert" /></svg></span>
                    <div>
                      <strong>Route conflicts</strong>
                      <p>Duplicate from/to locations are blocked at posting time.</p>
                    </div>
                  </li>
                  <li>
                    <span className="timeline-time"><svg className="ui-icon"><use href="#i-alert" /></svg></span>
                    <div>
                      <strong>Seat limits</strong>
                      <p>Join action is disabled automatically when no seats are left.</p>
                    </div>
                  </li>
                </ul>
              </article>

              <article className="panel-card module-next-action">
                <h3>Next action</h3>
                <p>Set your hometown, apply a route filter, and join your next trip.</p>
                <button type="button" onClick={handleShowPage('travel')}>Plan next trip</button>
              </article>
            </div>
          </section>
        </main>
      </div>

      <button className="theme-toggle-btn" onClick={toggleTheme} type="button">
        Toggle theme
      </button>
    </>
  );
}
