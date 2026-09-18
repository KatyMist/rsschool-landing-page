import '../styles/main.scss';
import { initThemeToggle } from './theme.js';
import { initBurgerMenu } from './nav.js';

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initBurgerMenu();
});
