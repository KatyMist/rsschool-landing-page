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

  const isCapped = () => window.matchMedia('(max-width: 1023px)').matches;

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

export function initProductModal(cards) {
  const modal = document.querySelector('[data-modal]');
  if (!modal || !cards) return;

  const imageEl = modal.querySelector('[data-modal-image]');
  const titleEl = modal.querySelector('[data-modal-title]');
  const descEl = modal.querySelector('[data-modal-desc]');
  const sizesEl = modal.querySelector('[data-modal-sizes]');
  const additivesEl = modal.querySelector('[data-modal-additives]');
  const totalEl = modal.querySelector('[data-modal-total]');

  function renderSizes(sizes) {
    sizesEl.innerHTML = sizes
      .map((s, i) => {
        const [letter, ...rest] = s.trim().split(' ');
        const active = i === 0 ? ' modal__chip--active' : '';
        return `<button type="button" class="modal__chip modal__chip--size${active}"><span class="modal__chip-letter">${letter}</span>${rest.join(' ')}</button>`;
      })
      .join('');
  }

  function renderAdditives(additives) {
    additivesEl.innerHTML = additives
      .map((a, i) => `<button type="button" class="modal__chip modal__chip--additive"><span class="modal__chip-num">${i + 1}</span>${a.trim()}</button>`)
      .join('');
  }

  function open(product) {
    imageEl.src = product.image;
    imageEl.alt = product.name;
    titleEl.textContent = product.name;
    descEl.textContent = product.desc;
    totalEl.textContent = formatPrice(product.price);
    renderSizes(product.sizes);
    renderAdditives(product.additives);

    modal.hidden = false;
    document.body.classList.add('no-scroll');
  }

  function close() {
    modal.hidden = true;
    document.body.classList.remove('no-scroll');
  }

  cards.forEach(({ product, card }) => {
    card.addEventListener('click', () => open(product));
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
      return;
    }

    const additiveChip = event.target.closest('.modal__chip--additive');
    if (additiveChip) {
      additiveChip.classList.toggle('modal__chip--active');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) close();
  });
}
