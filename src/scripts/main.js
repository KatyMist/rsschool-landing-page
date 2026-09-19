import '../styles/main.scss';
import { initThemeToggle } from './theme.js';
import { initBurgerMenu } from './nav.js';
import { initCatalog, initProductModal } from './catalog.js';

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initBurgerMenu();
  initCatalog();
  initProductModal();
});
