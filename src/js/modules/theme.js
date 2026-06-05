export function setHeroImageForTheme() {
  const img = document.getElementById('heroImg');
  if (!img) return;
  img.src = 'assets/hero-blue.svg';
}

export function toggleTheme() {
  if (document.body.classList.contains('dark-theme')) {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'default');
  } else {
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  }
  setHeroImageForTheme();
}

export function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || savedTheme === 'alt') {
    document.body.classList.add('dark-theme');
  }
  setHeroImageForTheme();
}
