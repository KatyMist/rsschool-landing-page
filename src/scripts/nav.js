const OFF_CANVAS_QUERY = '(max-width: 1023px)';

function getFocusable(container) {
  return Array.from(
    container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hidden && el.offsetParent !== null);
}

export function initBurgerMenu() {
  const burgerBtn = document.querySelector('[data-burger-toggle]');
  const nav = document.querySelector('[data-nav]');
  const header = document.querySelector('.header');
  if (!burgerBtn || !nav || !header) return;

  const isOffCanvas = () => window.matchMedia(OFF_CANVAS_QUERY).matches;
  const isOpen = () => nav.classList.contains('nav--open');

  // Пока меню закрыто на планшете/мобильном, панель уезжает за экран через
  // transform, но остаётся в DOM — без inert её ссылки всё равно ловятся
  // табом и скринридером. На десктопе nav всегда обычная видимая строка,
  // туда inert никогда не должен попадать.
  function syncClosedState() {
    nav.inert = isOffCanvas() && !isOpen();
  }

  function setBackgroundInert(inert) {
    Array.from(document.body.children).forEach((el) => {
      if (el !== header) el.inert = inert;
    });
  }

  function open() {
    nav.classList.add('nav--open');
    burgerBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
    nav.inert = false;
    setBackgroundInert(true);

    const focusable = getFocusable(nav);
    (focusable[0] || burgerBtn).focus();
  }

  function close() {
    nav.classList.remove('nav--open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
    setBackgroundInert(false);
    syncClosedState();
    burgerBtn.focus();
  }

  burgerBtn.addEventListener('click', () => {
    if (isOpen()) {
      close();
    } else {
      open();
    }
  });

  // Клик по пункту меню (переход по якорю/ссылке) должен сам закрывать панель.
  nav.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      if (isOpen()) close();
    });
  });

  // Фокус-трап на время открытой панели: заголовок (лого, ссылки, тема,
  // сам бургер) остаётся видимым над оверлеем, поэтому крутим Tab именно
  // внутри header, а не только внутри nav.
  header.addEventListener('keydown', (event) => {
    if (!isOpen()) return;

    if (event.key === 'Escape') {
      close();
      return;
    }

    if (event.key === 'Tab') {
      const focusable = getFocusable(header);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  // Ресайз через брейкпоинт (напр. поворот экрана/переход на десктоп)
  // с открытой панелью — сбрасываем в закрытое состояние, чтобы не
  // остаться с задизабленным фоном на десктопной раскладке.
  window.addEventListener('resize', () => {
    if (isOpen() && !isOffCanvas()) {
      nav.classList.remove('nav--open');
      burgerBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
      setBackgroundInert(false);
    }
    syncClosedState();
  });

  syncClosedState();
}
