import '../styles/main.scss';
import { initThemeToggle } from './theme.js';
import { initBurgerMenu } from './nav.js';
import { initCatalog, initProductModal } from './catalog.js';
import { initFavoritesSlider } from './favorites.js';

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initBurgerMenu();
  const cards = initCatalog();
  initProductModal(cards);
  initFavoritesSlider();
});
