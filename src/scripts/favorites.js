export function initFavoritesSlider() {
  const slider = document.querySelector('.favorites__slider');
  if (!slider) return;

  const track = slider.querySelector('.favorites__track');
  const slides = Array.from(slider.querySelectorAll('.favorites__slide'));
  const prevBtn = slider.querySelector('.favorites__arrow--prev');
  const nextBtn = slider.querySelector('.favorites__arrow--next');
  const dots = Array.from(document.querySelectorAll('.favorites__dot'));
  const status = document.querySelector('[data-favorites-status]');
  if (!track || slides.length === 0) return;

  let index = 0;
  let announce = false;

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle('favorites__dot--active', active);
      dot.setAttribute('aria-current', String(active));
    });

    // Пропускаем объявление на первом рендере при загрузке страницы —
    // aria-live должен озвучивать смену слайда пользователем, а не сам факт,
    // что слайдер отрисовался.
    if (status && announce) {
      const name = slides[index].querySelector('.favorites__name')?.textContent ?? '';
      status.textContent = `${name}, slide ${index + 1} of ${slides.length}`;
    }
  }

  function goTo(delta) {
    index = (index + delta + slides.length) % slides.length;
    announce = true;
    render();
  }

  prevBtn?.addEventListener('click', () => goTo(-1));
  nextBtn?.addEventListener('click', () => goTo(1));
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      index = i;
      announce = true;
      render();
    });
  });

  render();
}
