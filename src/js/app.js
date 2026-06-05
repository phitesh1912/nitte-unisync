import { initNavigation, showPage, toggleMenu } from './modules/navigation.js';
import { au, db } from '../firebase.js';
import { initProfile }  from './modules/profile.js';
import { initTodo }     from './modules/todo.js';
import { initWellbeing }from './modules/wellbeing.js';
import { initTheme, toggleTheme } from './modules/theme.js';
import { initQuotes }   from './modules/quotes.js';
import { initPartnerUp }from './modules/partner.js';
import { initEntertainment } from './modules/entertainment.js';
import { initCareerHub } from './modules/careerHub.js';
import { initTravel } from './modules/travel.js';
import { initAuth, login, logout, getCurrentUser } from './modules/auth.js';
import { initFocusHub } from './modules/focusHub.js';

let hasInit = false;

function safeInit(name, initFn) {
	try {
		initFn();
	} catch (error) {
		console.error(`Failed to initialize ${name}:`, error);
	}
}

export function initApp() {
	if (hasInit) return;
	hasInit = true;

	// ─── Init all modules ───────────────────────────────────────────────────────
	safeInit('navigation', initNavigation);
	safeInit('auth', initAuth);       // sets up onAuthStateChanged listener — must be first
	safeInit('profile', initProfile);
	safeInit('todo', initTodo);
	safeInit('wellbeing', initWellbeing);
	safeInit('theme', initTheme);
	safeInit('quotes', initQuotes);
	safeInit('partner', initPartnerUp);
	safeInit('travel', initTravel);
	safeInit('entertainment', initEntertainment);
	safeInit('career-hub', initCareerHub);
	safeInit('focus-hub', initFocusHub);

	// ─── Expose to HTML onclick attributes ─────────────────────────────────────
	window.toggleMenu  = toggleMenu;
	window.showPage    = showPage;
	window.toggleTheme = toggleTheme;
	window.login       = login;
	window.logout      = logout;
	window.getCurrentUser = getCurrentUser;

	// ─── Start on home page ───────────────────────────────────────────────────
	showPage('home');
}