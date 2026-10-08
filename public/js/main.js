'use strict';

(function () {
  const productIcons = {
    business_card: 'businessCard',
    flyer: 'fileText',
    booklet: 'bookOpen',
    banner: 'image',
    signboard: 'signpost',
    brand_tag: 'tag'
  };

  // O'zimizning ishlarimiz (images/portfolio/) — stok suratlar o'rniga.
  const productImages = {
    business_card: 'images/portfolio/vizitka-2.jpg',
    flyer: 'images/portfolio/menyu-2.jpg',
    booklet: 'images/portfolio/katalog-3.jpg',
    banner: 'images/portfolio/poster-1.jpg',
    signboard: 'images/portfolio/tashqi-reklama.jpg',
    brand_tag: 'images/portfolio/yorliq-7.jpg'
  };

  const servicesGrid = document.getElementById('servicesGrid');
  const faqList = document.getElementById('faqList');
  const bottomNav = document.getElementById('bottomNav');

  // Picks field + Uz/Ru/En for the current language (Uzbek as fallback).
  function pick(obj, field) {
    const suffix = { uz: 'Uz', ru: 'Ru', en: 'En' }[I18n.getLang()] || 'Uz';
    return obj[field + suffix] || obj[field + 'Uz'] || '';
  }
  function productName(product) {
    return pick(product, 'name');
  }
  function productBadge(product) {
    return pick(product, 'badge');
  }

  function renderServiceCards() {
    if (!servicesGrid) return;
    const products = ProductCatalog.listProducts();
    servicesGrid.innerHTML = products.map((p) => `
      <div class="service-card">
        <div class="service-image">
          <img src="${productImages[p.id] || ''}" alt="${productName(p)}" loading="lazy">
          <span class="service-icon">${Icons.get(productIcons[p.id] || 'printer')}</span>
          ${productBadge(p) ? `<span class="service-badge">${productBadge(p)}</span>` : ''}
        </div>
        <h3>${productName(p)}</h3>
      </div>
    `).join('');
  }

  function productDesc(product) {
    return pick(product, 'desc');
  }

  /* Bosh sahifadagi mahsulotlar karuseli (print.uz uslubida). */
  function renderProductTrack() {
    const track = document.getElementById('productTrack');
    if (!track) return;
    track.innerHTML = ProductCatalog.listProducts().map((p) => `
      <button type="button" class="product-card" data-id="${p.id}" aria-haspopup="dialog">
        <span class="product-image">
          <img src="${productImages[p.id] || ''}" alt="" loading="lazy">
          <span class="product-badge">${productBadge(p)}</span>
        </span>
        <span class="product-name">${productName(p)}</span>
      </button>
    `).join('');
  }

  /* Mahsulot kartochkasi bosilsa — katta surat, tavsif va buyurtma tugmasi. */
  function initProductModal() {
    const track = document.getElementById('productTrack');
    const modal = document.getElementById('productModal');
    if (!track || !modal) return;

    const closeBtn = document.getElementById('productModalClose');
    let lastFocused = null;

    function close() {
      if (!modal.classList.contains('open')) return;
      modal.classList.remove('open');
      document.body.classList.remove('modal-open');
      if (lastFocused) lastFocused.focus();
      setTimeout(() => {
        if (!modal.classList.contains('open')) modal.hidden = true;
      }, 220);
    }

    // Delegated: the track is re-rendered whenever the language changes.
    track.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (!card) return;
      const p = ProductCatalog.getProduct(card.getAttribute('data-id'));
      if (!p) return;
      lastFocused = card;
      document.getElementById('productModalImage').src = productImages[p.id] || '';
      document.getElementById('productModalBadge').textContent = productBadge(p);
      document.getElementById('productModalTitle').textContent = productName(p);
      document.getElementById('productModalText').textContent = productDesc(p);
      closeBtn.setAttribute('aria-label', I18n.t('modal_close'));
      modal.hidden = false;
      void modal.offsetHeight;
      modal.classList.add('open');
      document.body.classList.add('modal-open');
      closeBtn.focus();
    });

    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  /* Portfolio sahifasi: ishlar ro'yxati js/portfolio.js dan olinadi.
     Ro'yxat bo'sh bo'lsa "tez orada" yozuvi ko'rsatiladi. */
  function renderPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    if (!grid || typeof PORTFOLIO === 'undefined') return;

    if (!PORTFOLIO.length) {
      grid.classList.add('is-empty');
      grid.innerHTML = `<p class="empty-state">${I18n.t('portfolio_empty')}</p>`;
      return;
    }

    grid.classList.remove('is-empty');
    grid.innerHTML = PORTFOLIO.map((item) => {
      const title = pick(item, 'title');
      return `<img src="${thumbOf(item.src)}" data-full="${item.src}" alt="${title}" title="${title}" loading="lazy" onerror="this.onerror=null;this.src=this.dataset.full">`;
    }).join('');
  }

  /* Portfolio kartochkalari kesib ko'rsatiladi — bosilganda ishni
     to'liq ko'rish uchun katta oynada ochamiz. */
  function initLightbox() {
    const grid = document.getElementById('portfolioGrid');
    const box = document.getElementById('lightbox');
    if (!grid || !box) return;

    const image = document.getElementById('lightboxImage');
    const closeBtn = document.getElementById('lightboxClose');
    let lastFocused = null;

    function close() {
      if (!box.classList.contains('open')) return;
      box.classList.remove('open');
      document.body.classList.remove('modal-open');
      if (lastFocused) lastFocused.focus();
      setTimeout(() => {
        if (!box.classList.contains('open')) box.hidden = true;
      }, 220);
    }

    // Delegated: the grid is re-rendered whenever the language changes.
    grid.addEventListener('click', (e) => {
      const img = e.target.closest('img');
      if (!img) return;
      lastFocused = img;
      image.src = img.getAttribute('data-full') || img.getAttribute('src');
      image.alt = img.getAttribute('alt') || '';
      box.hidden = false;
      void box.offsetHeight;
      box.classList.add('open');
      document.body.classList.add('modal-open');
      closeBtn.focus();
    });

    closeBtn.addEventListener('click', close);
    box.addEventListener('click', (e) => { if (e.target === box) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  /* Narxlar sahifasi: js/prices.js dagi jadvallar — bo'limlar, qidiruv va
     ochiladigan kartochkalar. */
  const fmtNum = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const tr = (v) => (v && typeof v === 'object' ? v[I18n.getLang()] || v.uz : v);
  let priceFilter = 'all';

  function priceTable(item) {
    const head = item.head || 'qty';
    const unit = item.unit || 'dona';
    const numericQty = head === 'qty' || head === 'meter';
    const qtyLabel = (q) => (typeof q === 'number' && numericQty ? `${fmtNum(q)} ${I18n.t('prices_u_' + unit)}` : tr(q));
    const cell = (p) => (p === null ? '—' : fmtNum(p));
    const firstCol = I18n.t(head === 'size' ? 'prices_col_size' : head === 'meter' ? 'prices_col_meter' : 'prices_col_qty');

    if (item.cols) {
      return `<table class="price-table"><thead><tr><th>${firstCol}</th>${item.cols.map((c) => `<th>${tr(c)}</th>`).join('')}</tr></thead>
        <tbody>${item.rows.map((r) => `<tr><td>${qtyLabel(r[0])}</td>${r.slice(1).map((p) => `<td>${cell(p)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    }
    const priceCol = head === 'size' ? I18n.t('prices_col_price') : I18n.t('prices_col_per_' + unit);
    const withTotal = numericQty && item.rows.every((r) => typeof r[0] === 'number');
    return `<table class="price-table"><thead><tr><th>${firstCol}</th><th>${priceCol}</th>${withTotal ? `<th>${I18n.t('prices_col_total')}</th>` : ''}</tr></thead>
      <tbody>${item.rows.map((r) => `<tr><td>${qtyLabel(r[0])}</td><td>${cell(r[1])}</td>${withTotal ? `<td>${fmtNum(r[0] * r[1])}</td>` : ''}</tr>`).join('')}</tbody></table>`;
  }

  function renderPrices() {
    const list = document.getElementById('priceList');
    const chips = document.getElementById('priceChips');
    if (!list || !chips || typeof PRICE_DATA === 'undefined') return;

    chips.innerHTML = [{ id: 'all', name: I18n.t('prices_all') }]
      .concat(PRICE_DATA.map((c) => ({ id: c.id, name: tr(c) })))
      .map((c) => `<button type="button" class="price-chip${c.id === priceFilter ? ' active' : ''}" data-cat="${c.id}">${c.name}</button>`)
      .join('');

    const chevron = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>';
    list.innerHTML = PRICE_DATA.map((cat) => `
      <section class="price-cat" data-cat="${cat.id}">
        <h3 class="price-cat-title">${tr(cat)}</h3>
        ${cat.items.map((it) => {
          const all = it.rows.flatMap((r) => r.slice(1)).filter((p) => p !== null);
          const from = I18n.t('prices_from').replace('{p}', fmtNum(Math.min(...all)));
          const search = `${it.uz} ${it.ru} ${cat.uz} ${cat.ru}`.toLowerCase();
          const notes = (it.notes || []).map((n) => `<span class="price-note">${tr(n)}</span>`).join('');
          return `<article class="price-card" data-search="${search.replace(/"/g, '&quot;')}">
            <button type="button" class="price-head" aria-expanded="false">
              <span class="price-name">${tr(it)}</span>
              <span class="price-from">${from}</span>
              <span class="price-chevron">${chevron}</span>
            </button>
            <div class="price-body" hidden>
              ${notes ? `<div class="price-notes">${notes}</div>` : ''}
              <div class="price-table-wrap">${priceTable(it)}</div>
              <a class="btn btn-primary price-order" href="https://t.me/wpmaxuz" target="_blank" rel="noopener">${I18n.t('hero_cta')}</a>
            </div>
          </article>`;
        }).join('')}
      </section>
    `).join('');
    filterPrices();
  }

  function filterPrices() {
    const list = document.getElementById('priceList');
    if (!list) return;
    const term = (document.getElementById('priceSearch').value || '').trim().toLowerCase();
    let shown = 0;
    list.querySelectorAll('.price-cat').forEach((cat) => {
      const catOk = priceFilter === 'all' || cat.dataset.cat === priceFilter;
      let visible = 0;
      cat.querySelectorAll('.price-card').forEach((card) => {
        const ok = catOk && (!term || card.dataset.search.includes(term));
        card.hidden = !ok;
        if (ok) visible++;
      });
      cat.hidden = visible === 0;
      shown += visible;
    });
    document.getElementById('priceEmpty').hidden = shown > 0;
  }

  function initPrices() {
    const list = document.getElementById('priceList');
    if (!list) return;
    // Delegated: the list and chips are re-rendered on language change.
    list.addEventListener('click', (e) => {
      const head = e.target.closest('.price-head');
      if (!head) return;
      const card = head.parentElement;
      const open = !card.classList.contains('open');
      card.classList.toggle('open', open);
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
      card.querySelector('.price-body').hidden = !open;
    });
    document.getElementById('priceChips').addEventListener('click', (e) => {
      const chip = e.target.closest('.price-chip');
      if (!chip) return;
      priceFilter = chip.dataset.cat;
      document.querySelectorAll('.price-chip').forEach((c) => c.classList.toggle('active', c === chip));
      filterPrices();
    });
    document.getElementById('priceSearch').addEventListener('input', filterPrices);
  }

  const FAQ_IDS = [1, 2, 3, 4, 5];

  function renderFaq() {
    if (!faqList) return;
    faqList.innerHTML = FAQ_IDS.map((n) => `
      <div class="faq-item">
        <button type="button" class="faq-question">
          <span>${I18n.t('faq_q' + n)}</span>
          <span class="faq-toggle-icon"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg></span>
        </button>
        <div class="faq-answer"><p>${I18n.t('faq_a' + n)}</p></div>
      </div>
    `).join('');

    faqList.querySelectorAll('.faq-item').forEach((item) => {
      item.querySelector('.faq-question').addEventListener('click', () => {
        item.classList.toggle('open');
      });
    });
  }

  function renderStaticIcons() {
    document.querySelectorAll('[data-icon]').forEach((el) => {
      el.innerHTML = Icons.get(el.getAttribute('data-icon'));
    });
  }

  /* Har sahifada pastki o'ng burchakda turadigan Telegram tugmasi —
     mijoz buyurtma uchun aloqa sahifasini qidirib o'tirmasin. */
  function initTelegramFab() {
    const fab = document.createElement('a');
    fab.className = 'tg-fab';
    fab.href = 'https://t.me/wpmaxuz';
    fab.target = '_blank';
    fab.rel = 'noopener';
    fab.innerHTML = Icons.get('telegram');
    const syncLabel = () => {
      fab.setAttribute('aria-label', I18n.t('fab_telegram'));
      fab.title = I18n.t('fab_telegram');
    };
    syncLabel();
    document.addEventListener('languagechange', syncLabel);
    document.body.appendChild(fab);
  }

  function updateNavTooltips() {
    // Document-wide: on phones the Settings button lives in the header.
    document.querySelectorAll('.bottom-nav-item').forEach((item) => {
      const label = item.querySelector('span:last-child');
      if (label) item.title = label.textContent.trim();
    });
  }

  function markActiveNav() {
    const currentPage = document.body.getAttribute('data-page');
    bottomNav.querySelectorAll('.bottom-nav-item').forEach((item) => {
      item.classList.toggle('active', item.getAttribute('data-page') === currentPage);
    });
  }

  function initPosterCarousel() {
    const track = document.getElementById('posterTrack');
    const dotsWrap = document.getElementById('posterDots');
    if (!track || !dotsWrap) return;
    const slides = track.querySelectorAll('.poster-slide');
    if (slides.length < 2) return;

    dotsWrap.innerHTML = Array.from(slides).map((_, i) =>
      `<button type="button" class="poster-dot${i === 0 ? ' active' : ''}" aria-label="${i + 1}"></button>`
    ).join('');
    const dots = dotsWrap.querySelectorAll('.poster-dot');

    let current = 0;
    let syncFromScroll = true;

    function setActiveDot(index) {
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      syncFromScroll = false;
      const slide = slides[current];
      track.scrollTo({ left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2, behavior: 'smooth' });
      setActiveDot(current);
      setTimeout(() => { syncFromScroll = true; }, 500);
    }

    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    setInterval(() => goTo(current + 1), 5000);

    let scrollTimer;
    track.addEventListener('scroll', () => {
      if (!syncFromScroll) return;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        let closest = 0;
        let minDist = Infinity;
        slides.forEach((s, i) => {
          const dist = Math.abs(s.offsetLeft - track.scrollLeft);
          if (dist < minDist) { minDist = dist; closest = i; }
        });
        current = closest;
        setActiveDot(current);
      }, 120);
    });
  }

  /* Portfolio rasmining kichik nusxasi (images/portfolio/thumbs/) —
     kartochka va mozaikalarda shu, to'liq rasm faqat kattalashtirilganda. */
  function thumbOf(src) {
    return src.replace('images/portfolio/', 'images/portfolio/thumbs/');
  }

  /* Bosh sahifadagi ishlar slayderi: bittadan katta surat, avtomatik
     almashadi, pastidagi nuqtalar bilan boshqariladi. portfolio.js da
     `featured: true` belgilangan ishlar ko'rsatiladi (bo'lmasa hammasi). */
  function initIntroMosaic() {
    const wrap = document.getElementById('introMosaic');
    const dotsWrap = document.getElementById('introDots');
    if (!wrap || !dotsWrap || typeof PORTFOLIO === 'undefined' || !PORTFOLIO.length) return;

    const featured = PORTFOLIO.filter((it) => it.featured);
    const pages = (featured.length ? featured : PORTFOLIO).map((it) => [it]);
    const pageCount = pages.length;

    // Full-size image: a 360px thumbnail would look soft at card size.
    wrap.innerHTML = `<div class="mosaic-track">${pages.map((items, p) => `
      <div class="mosaic-page${p === 0 ? ' active' : ''}">
        ${items.map((it) => `<a href="portfolio.html" tabindex="${p === 0 ? 0 : -1}"><img src="${it.src}" alt="${pick(it, 'title')}" ${p === 0 ? '' : 'loading="lazy"'}></a>`).join('')}
      </div>
    `).join('')}</div>`;
    if (pageCount < 2) return;

    dotsWrap.innerHTML = pages.map((_, p) =>
      `<button type="button" class="mosaic-dot${p === 0 ? ' active' : ''}" aria-label="${p + 1}"></button>`
    ).join('');

    const pageEls = wrap.querySelectorAll('.mosaic-page');
    const dots = dotsWrap.querySelectorAll('.mosaic-dot');
    let current = 0;

    function goTo(index) {
      current = (index + pageCount) % pageCount;
      pageEls.forEach((el, i) => {
        el.classList.toggle('active', i === current);
        el.querySelectorAll('a').forEach((a) => { a.tabIndex = i === current ? 0 : -1; });
      });
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }
    // Auto-advance: the active dot's progress-bar animation (CSS) ending
    // moves to the next photo, so pausing it on hover pauses the slider.
    dotsWrap.addEventListener('animationend', (e) => {
      if (e.target.classList.contains('active')) goTo(current + 1);
    });
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    // Barmoq bilan surish (telefonda).
    let startX = null;
    wrap.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    wrap.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1));
    });
  }

  /* "Nega biz" kartochkalari: bosilganda batafsil ma'lumot qalqib
     chiquvchi oynada (modal) ochiladi. */
  function initWhyCards() {
    const modal = document.getElementById('whyModal');
    const cards = document.querySelectorAll('.why-card');
    if (!modal || !cards.length) return;

    const panel = modal.querySelector('.modal-panel');
    const imageEl = document.getElementById('whyModalImage');
    const iconEl = document.getElementById('whyModalIcon');
    const titleEl = document.getElementById('whyModalTitle');
    const textEl = document.getElementById('whyModalText');
    const closeBtn = document.getElementById('whyModalClose');
    let lastFocused = null;

    function openModal(card) {
      lastFocused = card;
      // The photo is only fetched when a card is actually opened, so it
      // costs nothing on page load.
      const src = card.getAttribute('data-image');
      imageEl.hidden = !src;
      panel.classList.toggle('no-image', !src);
      if (src) imageEl.src = src;
      iconEl.innerHTML = card.querySelector('.why-icon').innerHTML;
      titleEl.textContent = card.querySelector('.why-card-title').textContent;
      textEl.textContent = card.querySelector('.why-detail-text').textContent;
      closeBtn.setAttribute('aria-label', I18n.t('modal_close'));
      modal.hidden = false;
      // Flush layout so the fade-in has a start state to animate from.
      void modal.offsetHeight;
      modal.classList.add('open');
      document.body.classList.add('modal-open');
      closeBtn.focus();
    }

    function closeModal() {
      if (!modal.classList.contains('open')) return;
      modal.classList.remove('open');
      document.body.classList.remove('modal-open');
      if (lastFocused) lastFocused.focus();
      // Hide only after the fade-out; the guard keeps a quick re-open
      // from being hidden by this stale timer.
      setTimeout(() => {
        if (!modal.classList.contains('open')) modal.hidden = true;
      }, 220);
    }

    // Offline or a dead URL: drop the photo rather than showing a broken one.
    imageEl.addEventListener('error', () => {
      imageEl.hidden = true;
      panel.classList.add('no-image');
    });

    cards.forEach((card) => card.addEventListener('click', () => openModal(card)));
    closeBtn.addEventListener('click', closeModal);
    // Only a click on the backdrop itself closes — not one inside the panel.
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  }

  /* Telefonda Sozlamalar pastki menyudan tepaga (header'ga) ko'chadi,
     kompyuterda esa menyuda qoladi. Bitta element ko'chiriladi — id'lar
     va hodisalar (click) o'zgarmay saqlanadi. */
  function placeSettings() {
    const settings = document.querySelector('.nav-settings');
    const header = document.querySelector('.header-inner');
    if (!settings || !header || !bottomNav) return;
    const phone = window.matchMedia('(max-width: 820px)');
    function apply() {
      const target = phone.matches ? header : bottomNav;
      if (settings.parentElement !== target) target.appendChild(settings);
    }
    apply();
    phone.addEventListener('change', apply);
  }

  function initSettingsDropdown() {
    const toggle = document.getElementById('settingsToggle');
    const dropdown = document.getElementById('settingsDropdown');
    if (!toggle || !dropdown) return;

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
    });

    document.addEventListener('click', (e) => {
      if (dropdown.contains(e.target) || e.target === toggle) return;
      dropdown.classList.remove('open');
      toggle.classList.remove('open');
    });
  }

  function init() {
    document.getElementById('year').textContent = new Date().getFullYear();
    I18n.applyStaticText();

    renderStaticIcons();
    renderServiceCards();
    renderProductTrack();
    renderPortfolio();
    renderPrices();
    renderFaq();
    updateNavTooltips();
    markActiveNav();
    initTelegramFab();
    initPosterCarousel();
    initIntroMosaic();
    initWhyCards();
    initLightbox();
    initPrices();
    initProductModal();
    placeSettings();
    initSettingsDropdown();

    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      btn.addEventListener('click', () => I18n.setLanguage(btn.getAttribute('data-lang-btn')));
    });

    // Telefondagi bayroq: bosilsa keyingi tilga o'tadi (UZ → RU → EN → UZ).
    const langFlag = document.getElementById('langFlag');
    if (langFlag) {
      const order = ['uz', 'ru', 'en'];
      const nextLang = () => order[(order.indexOf(I18n.getLang()) + 1) % order.length];
      const labels = {
        ru: "Tilni o'zgartirish: ruscha",
        en: 'Сменить язык: английский',
        uz: 'Change language: Uzbek'
      };
      const syncFlagLabel = () => langFlag.setAttribute('aria-label', labels[nextLang()]);
      langFlag.addEventListener('click', () => I18n.setLanguage(nextLang()));
      syncFlagLabel();
      document.addEventListener('languagechange', syncFlagLabel);
    }

    document.addEventListener('languagechange', () => {
      renderServiceCards();
      renderProductTrack();
      renderPortfolio();
      renderPrices();
      renderFaq();
      updateNavTooltips();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
