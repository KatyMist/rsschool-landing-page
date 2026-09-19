const CAP = 4;

export function initCatalog() {
  const grid = document.querySelector('[data-catalog-grid]');
  const tabs = document.querySelectorAll('[data-category-tab]');
  const cards = document.querySelectorAll('[data-card]');
  const reloadBtn = document.querySelector('[data-catalog-reload]');
  if (!grid || !tabs.length || !cards.length) return;

  let activeCategory =
    document.querySelector('[data-category-tab].catalog__category--active')?.dataset.categoryTab ||
    tabs[0].dataset.categoryTab;
  let expanded = false;

  const isCapped = () => window.matchMedia('(max-width: 1023px)').matches;

  function render() {
    const capApplies = isCapped();
    let visibleIndex = 0;

    cards.forEach((card) => {
      const matches = card.dataset.card === activeCategory;
      if (!matches) {
        card.hidden = true;
        return;
      }
      visibleIndex += 1;
      card.hidden = capApplies && !expanded && visibleIndex > CAP;
    });

    const totalInCategory = Array.from(cards).filter((c) => c.dataset.card === activeCategory).length;
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
}

export function initProductModal() {
  const modal = document.querySelector('[data-modal]');
  if (!modal) return;

  const imageEl = modal.querySelector('[data-modal-image]');
  const titleEl = modal.querySelector('[data-modal-title]');
  const descEl = modal.querySelector('[data-modal-desc]');
  const sizesEl = modal.querySelector('[data-modal-sizes]');
  const additivesEl = modal.querySelector('[data-modal-additives]');
  const totalEl = modal.querySelector('[data-modal-total]');

  function renderSizes(sizes) {
    sizesEl.innerHTML = sizes
      .split('|')
      .map((s, i) => {
        const [letter, ...rest] = s.trim().split(' ');
        const active = i === 0 ? ' modal__chip--active' : '';
        return `<button type="button" class="modal__chip modal__chip--size${active}"><span class="modal__chip-letter">${letter}</span>${rest.join(' ')}</button>`;
      })
      .join('');
  }

  function renderAdditives(additives) {
    additivesEl.innerHTML = additives
      .split(',')
      .map((a, i) => `<button type="button" class="modal__chip modal__chip--additive"><span class="modal__chip-num">${i + 1}</span>${a.trim()}</button>`)
      .join('');
  }

  function open(card) {
    imageEl.src = card.dataset.image;
    imageEl.alt = card.dataset.name;
    titleEl.textContent = card.dataset.name;
    descEl.textContent = card.dataset.desc;
    totalEl.textContent = card.dataset.price;
    renderSizes(card.dataset.sizes);
    renderAdditives(card.dataset.additives);

    modal.hidden = false;
    document.body.classList.add('no-scroll');
  }

  function close() {
    modal.hidden = true;
    document.body.classList.remove('no-scroll');
  }

  document.querySelectorAll('[data-card]').forEach((card) => {
    card.addEventListener('click', () => open(card));
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
