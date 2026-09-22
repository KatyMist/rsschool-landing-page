import { products } from '../data/products.js';

const CAP = 4;

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function createCardElement(product) {
  const card = document.createElement('article');
  card.className = 'card';
  card.dataset.category = product.category;
  card.dataset.id = product.id;
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `${product.name} — ${formatPrice(product.price)}`);

  const image = document.createElement('img');
  image.className = 'card__image';
  image.src = product.image;
  image.alt = product.name;
  image.loading = 'lazy';

  const body = document.createElement('div');
  body.className = 'card__body';
  body.innerHTML = `
    <h3 class="card__title">${product.name}</h3>
    <p class="card__desc">${product.desc}</p>
    <p class="card__price">${formatPrice(product.price)}</p>
  `;

  card.append(image, body);
  return card;
}

export function initCatalog() {
  const grid = document.querySelector('[data-catalog-grid]');
  const tabs = document.querySelectorAll('[data-category-tab]');
  const reloadBtn = document.querySelector('[data-catalog-reload]');
  if (!grid || !tabs.length) return null;

  const cards = products.map((product) => {
    const card = createCardElement(product);
    grid.appendChild(card);
    return { product, card };
  });

  let activeCategory =
    document.querySelector('[data-category-tab].catalog__category--active')?.dataset.categoryTab ||
    tabs[0].dataset.categoryTab;
  let expanded = false;

  const isCapped = () => window.matchMedia('(max-width: 768px)').matches;

  function render() {
    const capApplies = isCapped();
    let visibleIndex = 0;

    cards.forEach(({ product, card }) => {
      const matches = product.category === activeCategory;
      if (!matches) {
        card.hidden = true;
        return;
      }
      visibleIndex += 1;
      card.hidden = capApplies && !expanded && visibleIndex > CAP;
    });

    const totalInCategory = cards.filter(({ product }) => product.category === activeCategory).length;
    const needsReload = capApplies && !expanded && totalInCategory > CAP;
    if (reloadBtn) reloadBtn.hidden = !needsReload;
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (tab.dataset.categoryTab === activeCategory) return;
      tabs.forEach((t) => t.classList.remove('catalog__category--active'));
      tab.classList.add('catalog__category--active');
      activeCategory = tab.dataset.categoryTab;
      expanded = false;
      render();
    });
  });

  if (reloadBtn) {
    reloadBtn.addEventListener('click', () => {
      expanded = true;
      render();
    });
  }

  window.addEventListener('resize', render);

  render();

  return cards;
}

function getFocusable(container) {
  return Array.from(
    container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hidden && el.offsetParent !== null);
}

export function initProductModal(cards) {
  const modal = document.querySelector('[data-modal]');
  if (!modal || !cards) return;

  const panel = modal.querySelector('.modal__panel');
  const imageEl = modal.querySelector('[data-modal-image]');
  const titleEl = modal.querySelector('[data-modal-title]');
  const descEl = modal.querySelector('[data-modal-desc]');
  const sizesEl = modal.querySelector('[data-modal-sizes]');
  const additivesEl = modal.querySelector('[data-modal-additives]');
  const totalEl = modal.querySelector('[data-modal-total]');

  let lastTrigger = null;
  let basePrice = 0;

  function renderSizes(sizes) {
    sizesEl.innerHTML = sizes
      .map((s, i) => {
        const active = i === 0 ? ' modal__chip--active' : '';
        return `<button type="button" class="modal__chip modal__chip--size${active}" data-add-price="${s.addPrice}"><span class="modal__chip-letter">${s.label}</span>${s.size}</button>`;
      })
      .join('');
  }

  function renderAdditives(additives) {
    additivesEl.innerHTML = additives
      .map((a, i) => `<button type="button" class="modal__chip modal__chip--additive" data-add-price="${a.addPrice}"><span class="modal__chip-num">${i + 1}</span>${a.name}</button>`)
      .join('');
  }

  // Итог = базовая цена (размер S без добавок) + доплата за выбранный размер
  // + сумма доплат за выбранные добавки. Источник истины — сами чипы в DOM
  // (их data-add-price и класс --active), а не отдельный JS-стейт.
  function updateTotal() {
    const activeSize = sizesEl.querySelector('.modal__chip--active');
    const sizeAddPrice = activeSize ? Number(activeSize.dataset.addPrice) : 0;
    const additivesAddPrice = Array.from(additivesEl.querySelectorAll('.modal__chip--active')).reduce(
      (sum, chip) => sum + Number(chip.dataset.addPrice),
      0,
    );
    totalEl.textContent = formatPrice(basePrice + sizeAddPrice + additivesAddPrice);
  }

  function open(product, triggerEl) {
    lastTrigger = triggerEl || document.activeElement;
    basePrice = product.price;

    imageEl.src = product.image;
    imageEl.alt = product.name;
    titleEl.textContent = product.name;
    descEl.textContent = product.desc;
    renderSizes(product.sizes);
    renderAdditives(product.additives);
    updateTotal();

    modal.hidden = false;
    document.body.classList.add('no-scroll');
    panel.focus();
  }

  function close() {
    modal.hidden = true;
    document.body.classList.remove('no-scroll');
    if (lastTrigger && typeof lastTrigger.focus === 'function') {
      lastTrigger.focus();
    }
    lastTrigger = null;
  }

  cards.forEach(({ product, card }) => {
    card.addEventListener('click', () => open(product, card));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(product, card);
      }
    });
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.closest('[data-modal-close]')) {
      close();
      return;
    }

    const sizeChip = event.target.closest('.modal__chip--size');
    if (sizeChip) {
      modal.querySelectorAll('.modal__chip--size').forEach((c) => c.classList.remove('modal__chip--active'));
      sizeChip.classList.add('modal__chip--active');
      updateTotal();
      return;
    }

    const additiveChip = event.target.closest('.modal__chip--additive');
    if (additiveChip) {
      additiveChip.classList.toggle('modal__chip--active');
      updateTotal();
    }
  });

  modal.addEventListener('keydown', (event) => {
    if (modal.hidden) return;

    if (event.key === 'Escape') {
      close();
      return;
    }

    if (event.key === 'Tab') {
      const focusable = getFocusable(panel);
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
}
