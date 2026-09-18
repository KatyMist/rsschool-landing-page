export function initBurgerMenu() {
  const burgerBtn = document.querySelector('[data-burger-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (!burgerBtn || !nav) return;

  burgerBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open');
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('no-scroll', isOpen);
  });
}
