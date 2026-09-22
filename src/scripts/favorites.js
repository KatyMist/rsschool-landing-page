const SWIPE_THRESHOLD = 40; // px — минимальное горизонтальное смещение, чтобы засчитать свайп

export function initFavoritesSlider() {
  const slider = document.querySelector('.favorites__slider');
  if (!slider) return;

  const viewport = slider.querySelector('.favorites__viewport');
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

  // Свайп на мобильном (стрелки там скрыты — .favorites__arrow{@include mobile{display:none}}).
  // Pointer Events покрывают и touch, и mouse-драг одним кодом; вертикальный
  // скролл страницы не трогаем — оцениваем только жест целиком по pointerup,
  // без preventDefault на месте.
  let pointerId = null;
  let startX = 0;
  let startY = 0;

  viewport?.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
  });

  viewport?.addEventListener('pointerup', (event) => {
    if (pointerId === null || event.pointerId !== pointerId) return;
    pointerId = null;

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY)) {
      goTo(deltaX < 0 ? 1 : -1);
    }
  });

  viewport?.addEventListener('pointercancel', () => {
    pointerId = null;
  });

  render();
}
