export function initFavoritesSlider() {
  const slider = document.querySelector('.favorites__slider');
  if (!slider) return;

  const track = slider.querySelector('.favorites__track');
  const slides = Array.from(slider.querySelectorAll('.favorites__slide'));
  const prevBtn = slider.querySelector('.favorites__arrow--prev');
  const nextBtn = slider.querySelector('.favorites__arrow--next');
  const dots = Array.from(document.querySelectorAll('.favorites__dot'));
  if (!track || slides.length === 0) return;

  let index = 0;

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('favorites__dot--active', i === index));
  }

  function goTo(delta) {
    index = (index + delta + slides.length) % slides.length;
    render();
  }

  prevBtn?.addEventListener('click', () => goTo(-1));
  nextBtn?.addEventListener('click', () => goTo(1));
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      index = i;
      render();
    });
  });

  render();
}
