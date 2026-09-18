const THEME_KEY = 'coffee-house-theme';
const DARK = 'dark';
const LIGHT = 'light';

function getStoredTheme() {
  return localStorage.getItem(THEME_KEY);
}

function getPreferredTheme() {
  const stored = getStoredTheme();
  if (stored === DARK || stored === LIGHT) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  const toggleBtn = document.querySelector('[data-theme-toggle]');
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-pressed', String(theme === DARK));
  }
}

function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
}

export function initThemeToggle() {
  applyTheme(getPreferredTheme());

  const toggleBtn = document.querySelector('[data-theme-toggle]');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === DARK ? LIGHT : DARK);
  });
}
