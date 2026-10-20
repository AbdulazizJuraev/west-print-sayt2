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
      <button type="button" class="service-card" data-id="${p.id}" aria-haspopup="dialog">
        <span class="service-image">
          <img src="${productImages[p.id] || ''}" alt="${productName(p)}" loading="lazy">
          <span class="service-icon">${Icons.get(productIcons[p.id] || 'printer')}</span>
          ${productBadge(p) ? `<span class="service-badge">${productBadge(p)}</span>` : ''}
        </span>
        <span class="service-name">${productName(p)}</span>
      </button>
    `).join('');
  }

  /* Xizmatlar sahifasi: har bir yo'nalish (js/services-list.js) alohida
     gorizontal karusel. Plitka bosilsa — tavsifi bilan oyna ochiladi. */
  const svcGroupsEl = document.getElementById('svcGroups');
  function groupName(g) {
    return g[I18n.getLang()] || g.uz;
  }
  function langIndex() {
    return { uz: 0, ru: 1, en: 2 }[I18n.getLang()] || 0;
  }
  function itemName(item) {
    return item[langIndex()];
  }
  function itemDesc(item) {
    const info = typeof SERVICE_INFO !== 'undefined' && SERVICE_INFO[item[2]];
    return info ? info[langIndex()] : '';
  }
  function renderServiceGroups() {
    if (!svcGroupsEl || typeof SERVICE_GROUPS === 'undefined') return;
    const withLogo = I18n.t('svc_with_logo');
    svcGroupsEl.innerHTML = SERVICE_GROUPS.map((g, gi) => `
      <div class="svc-row" id="g-${g.id}" data-row="${g.id}" style="--hue: ${g.hue}">
        <div class="svc-row-head">
          <span class="svc-row-icon">${Icons.get(g.icon)}</span>
          <h2>${groupName(g)}</h2>
          <span class="svc-row-count">${g.items.length}</span>
          <div class="svc-arrows">
            <button type="button" class="svc-arrow" data-dir="-1" aria-label="‹">${Icons.get('chevronLeft')}</button>
            <button type="button" class="svc-arrow" data-dir="1" aria-label="›">${Icons.get('chevronRight')}</button>
          </div>
        </div>
        <div class="svc-track">
          ${g.items.map((it, i) => `
            <button type="button" class="svc-tile" data-g="${gi}" data-i="${i}" aria-haspopup="dialog" data-search="${it.slice(0, 3).join(' ').toLowerCase()}">
              <img class="svc-tile-img" src="https://images.unsplash.com/photo-${it[3]}?w=360&h=440&fit=crop&q=70&auto=format" alt="${itemName(it)}" loading="lazy">
              <span class="svc-tile-icon">${Icons.get(g.icon)}</span>
              <span class="svc-tile-text">
                <span class="svc-tile-name">${itemName(it)}</span>
                ${g.noLogo ? '' : `<span class="svc-tile-note">${withLogo}</span>`}
              </span>
            </button>`).join('')}
        </div>
      </div>`).join('');
    filterServices();
  }

  /* Yo'nalish tugmalari: "Hammasi" yoki bitta yo'nalish. Qidiruv bilan
     birga ishlaydi — tanlangan yo'nalish ichidan qidiradi. */
  let activeGroup = 'all';
  function renderServiceChips() {
    const wrap = document.getElementById('svcChips');
    if (!wrap || typeof SERVICE_GROUPS === 'undefined') return;
    const total = SERVICE_GROUPS.reduce((n, g) => n + g.items.length, 0);
    const chip = (id, label, count) =>
      `<button type="button" class="svc-chip${id === activeGroup ? ' active' : ''}" data-group="${id}" aria-pressed="${id === activeGroup}">${label} <span>${count}</span></button>`;
    wrap.innerHTML = chip('all', I18n.t('svc_all'), total) +
      SERVICE_GROUPS.map((g) => chip(g.id, groupName(g), g.items.length)).join('');
  }

  function filterServices() {
    const input = document.getElementById('svcSearch');
    if (!input) return;
    const q = input.value.trim().toLowerCase();
    let any = false;
    document.querySelectorAll('.svc-row').forEach((row) => {
      // Bitta yo'nalish tanlansa, qolganlari (va "Ommabop") yashiriladi.
      if (activeGroup !== 'all' && row.dataset.row !== activeGroup) {
        row.hidden = true;
        return;
      }
      let shown = 0;
      row.querySelectorAll('.svc-tile, .service-card').forEach((el) => {
        const hay = el.dataset.search || el.textContent.toLowerCase();
        const ok = !q || hay.includes(q);
        el.hidden = !ok;
        if (ok) shown++;
      });
      row.hidden = shown === 0;
      if (shown) any = true;
      const count = row.querySelector('.svc-row-count');
      if (count) count.textContent = shown;
    });
    const empty = document.getElementById('svcEmpty');
    if (empty) empty.hidden = any;
  }

  function initServiceRows() {
    const page = document.querySelector('.services');
    const input = document.getElementById('svcSearch');
    if (!page || !input) return;
    input.addEventListener('input', filterServices);
    // Delegated: rows are re-rendered when the language changes.
    page.addEventListener('click', (e) => {
      const chip = e.target.closest('.svc-chip');
      if (chip) {
        activeGroup = chip.dataset.group;
        renderServiceChips();
        filterServices();
        return;
      }
      const btn = e.target.closest('.svc-arrow');
      if (!btn) return;
      const track = btn.closest('.svc-row').querySelector('.svc-track');
      track.scrollBy({ left: Number(btn.dataset.dir) * track.clientWidth * 0.8, behavior: 'smooth' });
    });

    // Bosh sahifadan kelganda: ?q=... qidiruvni to'ldiradi, #g-... esa
    // o'sha yo'nalishni ochadi.
    const q = new URLSearchParams(location.search).get('q');
    if (q) {
      input.value = q;
      filterServices();
    }
    const hashGroup = location.hash.startsWith('#g-') && location.hash.slice(3);
    if (hashGroup && SERVICE_GROUPS.some((g) => g.id === hashGroup)) {
      activeGroup = hashGroup;
      renderServiceChips();
      filterServices();
    }

    // "Ommabop" qatori o'zi aylanadi; sichqoncha yoki barmoq tegsa to'xtaydi.
    const featured = document.getElementById('servicesGrid');
    if (!featured || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let paused = false;
    ['mouseenter', 'touchstart', 'focusin'].forEach((ev) =>
      featured.addEventListener(ev, () => { paused = true; }, { passive: true }));
    featured.addEventListener('mouseleave', () => { paused = false; });
    setInterval(() => {
      if (paused || input.value || document.hidden) return;
      const card = featured.querySelector('.service-card');
      if (!card) return;
      const step = card.getBoundingClientRect().width + 14;
      const atEnd = featured.scrollLeft + featured.clientWidth >= featured.scrollWidth - 4;
      featured.scrollTo({ left: atEnd ? 0 : featured.scrollLeft + step, behavior: 'smooth' });
    }, 3200);
  }

  function productDesc(product) {
    return pick(product, 'desc');
  }

  /* Bosh sahifadagi 10 ta yo'nalish plitkasi — har biri Xizmatlar
     sahifasidagi o'z qatoriga olib boradi. */
  const groupCovers = {
    office: 'vizitka', adprint: 'flayer', large: 'banner', outdoor: 'vyveska', pack: 'qogozpaket',
    events: 'parus', gifts: 'krujka', apparel: 'futbolka', design: 'logotip', finish: 'folga'
  };
  function renderHomeCats() {
    const wrap = document.getElementById('homeCats');
    if (!wrap || typeof SERVICE_GROUPS === 'undefined') return;
    wrap.innerHTML = SERVICE_GROUPS.map((g) => `
      <a class="b-cat" href="services.html#g-${g.id}">
        <img src="images/dizayn/${groupCovers[g.id]}.jpg" alt="" loading="lazy">
        <span class="b-cat-text">
          <strong>${groupName(g)}</strong>
          <span>${g.items.length} ${I18n.t(g.noLogo ? 'unit_services' : 'unit_products')}</span>
        </span>
      </a>`).join('');
  }

  /* Bosh sahifadagi qidiruv va "Ko'p so'raladi" tugmalari Xizmatlar
     sahifasini shu so'z bilan qidirilgan holda ochadi. */
  function syncHeroChips() {
    document.querySelectorAll('[data-chip]').forEach((a) => {
      a.href = 'services.html?q=' + encodeURIComponent(a.textContent.trim());
    });
  }
  function initHeroSearch() {
    const form = document.getElementById('heroSearch');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = form.elements.q.value.trim();
      location.href = 'services.html' + (q ? '?q=' + encodeURIComponent(q) : '');
    });
    syncHeroChips();
  }

  /* "Sozlamalar" kartochkasidagi Kunduzgi/Tungi tugmalari — mavzu boshqa
     joydan (sarlavhadagi tugma) o'zgarsa ham holati mos turadi. */
  function initThemeButtons() {
    const btns = document.querySelectorAll('[data-theme-btn]');
    if (!btns.length) return;
    const sync = () => {
      const theme = ThemeManager.getTheme();
      btns.forEach((b) => {
        const on = b.dataset.themeBtn === theme;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', on);
      });
    };
    btns.forEach((b) => b.addEventListener('click', () => ThemeManager.setTheme(b.dataset.themeBtn)));
    new MutationObserver(sync).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    sync();
  }

  /* Mahsulot kartochkasi yoki xizmat plitkasi bosilsa — katta surat,
     tavsif, buyurtma va qo'ng'iroq tugmalari bilan oyna ochiladi. */
  function initProductModal() {
    const modal = document.getElementById('productModal');
    if (!modal) return;

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

    function dataFor(card) {
      if (card.classList.contains('svc-tile')) {
        const g = SERVICE_GROUPS[Number(card.dataset.g)];
        const it = g && g.items[Number(card.dataset.i)];
        if (!it) return null;
        return {
          img: `https://images.unsplash.com/photo-${it[3]}?w=900&h=600&fit=crop&q=75&auto=format`,
          badge: groupName(g), title: itemName(it), text: itemDesc(it), logo: !g.noLogo
        };
      }
      const p = ProductCatalog.getProduct(card.getAttribute('data-id'));
      if (!p) return null;
      return { img: productImages[p.id] || '', badge: productBadge(p), title: productName(p), text: productDesc(p), logo: false };
    }

    // Delegated: the cards are re-rendered whenever the language changes.
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.service-card[data-id], .svc-tile');
      if (!card) return;
      const d = dataFor(card);
      if (!d) return;
      lastFocused = card;
      // Drop the previous product's photo first: otherwise it stays on
      // screen until the new one has downloaded. A shimmer shows meanwhile.
      const img = document.getElementById('productModalImage');
      img.removeAttribute('src');
      img.alt = '';
      img.classList.add('is-loading');
      img.onload = img.onerror = () => img.classList.remove('is-loading');
      img.src = d.img;
      img.alt = d.title;
      document.getElementById('productModalBadge').textContent = d.badge;
      document.getElementById('productModalTitle').textContent = d.title;
      document.getElementById('productModalText').textContent = d.text;
      const logo = document.getElementById('productModalLogo');
      if (logo) logo.hidden = !d.logo;
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

  /* Portfolio rasmining kichik nusxasi (images/portfolio/thumbs/) —
     kartochka va mozaikalarda shu, to'liq rasm faqat kattalashtirilganda. */
  function thumbOf(src) {
    return src.replace('images/portfolio/', 'images/portfolio/thumbs/');
  }

  /* Bosh sahifadagi "Bizning ishlarimiz" plitkasi: bittadan katta surat,
     o'zi almashadi (sichqoncha ustida turganda to'xtaydi), pastki
     paneldagi tugmalar va barmoq bilan surish orqali boshqariladi.
     portfolio.js da `featured: true` belgilangan ishlar ko'rsatiladi. */
  let refreshWorksCaption = () => {};
  function initIntroMosaic() {
    const wrap = document.getElementById('introMosaic');
    if (!wrap || typeof PORTFOLIO === 'undefined' || !PORTFOLIO.length) return;
    const featured = PORTFOLIO.filter((it) => it.featured);
    const items = featured.length ? featured : PORTFOLIO;
    const titleEl = document.getElementById('introTitle');
    const countEl = document.getElementById('introCount');
    const prev = document.getElementById('introPrev');
    const next = document.getElementById('introNext');

    // Full-size image: a 360px thumbnail would look soft at tile size.
    wrap.innerHTML = items.map((it, i) => `
      <a class="b-slide${i === 0 ? ' active' : ''}" href="portfolio.html" tabindex="${i === 0 ? 0 : -1}">
        <img src="${it.src}" alt="${pick(it, 'title')}" ${i === 0 ? '' : 'loading="lazy"'}>
      </a>`).join('');
    const slides = wrap.querySelectorAll('.b-slide');
    let current = 0;

    refreshWorksCaption = () => {
      titleEl.textContent = pick(items[current], 'title');
      countEl.textContent = `${current + 1} / ${items.length}`;
      slides.forEach((s, i) => { s.querySelector('img').alt = pick(items[i], 'title'); });
      prev.setAttribute('aria-label', I18n.t('works_prev'));
      next.setAttribute('aria-label', I18n.t('works_next'));
    };
    function goTo(index) {
      current = (index + items.length) % items.length;
      slides.forEach((s, i) => {
        s.classList.toggle('active', i === current);
        s.tabIndex = i === current ? 0 : -1;
      });
      refreshWorksCaption();
    }
    refreshWorksCaption();
    if (items.length < 2) return;

    prev.addEventListener('click', () => goTo(current - 1));
    next.addEventListener('click', () => goTo(current + 1));

    const tile = wrap.closest('.b-works');
    let paused = false;
    tile.addEventListener('mouseenter', () => { paused = true; });
    tile.addEventListener('mouseleave', () => { paused = false; });
    tile.addEventListener('focusin', () => { paused = true; });
    tile.addEventListener('focusout', () => { paused = false; });
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInterval(() => { if (!paused && !document.hidden) goTo(current + 1); }, 5000);
    }

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
    renderServiceGroups();
    renderServiceChips();
    initServiceRows();
    renderHomeCats();
    initHeroSearch();
    initThemeButtons();
    renderPortfolio();
    renderFaq();
    updateNavTooltips();
    markActiveNav();
    initTelegramFab();
    initIntroMosaic();
    initWhyCards();
    initLightbox();
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
      renderServiceGroups();
      renderServiceChips();
      renderHomeCats();
      syncHeroChips();
      refreshWorksCaption();
      renderPortfolio();
      renderFaq();
      updateNavTooltips();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
