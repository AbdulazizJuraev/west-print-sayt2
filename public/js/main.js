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

  const productImages = {
    business_card: 'https://images.unsplash.com/photo-1633415565464-e1d69c3fd906?w=500&q=80&auto=format&fit=crop',
    flyer: 'https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?w=500&q=80&auto=format&fit=crop',
    booklet: 'https://images.unsplash.com/photo-1695634365373-642d56c01884?w=500&q=80&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1763256552751-db613582fb2c?w=500&q=80&auto=format&fit=crop',
    signboard: 'https://images.unsplash.com/photo-1513757378314-e46255f6ed16?w=500&q=80&auto=format&fit=crop',
    brand_tag: 'https://images.unsplash.com/photo-1763757933131-93f78c24f012?w=500&q=80&auto=format&fit=crop'
  };

  const servicesGrid = document.getElementById('servicesGrid');
  const faqList = document.getElementById('faqList');
  const bottomNav = document.getElementById('bottomNav');

  function productName(product) {
    return I18n.getLang() === 'ru' ? product.nameRu : product.nameUz;
  }
  function productBadge(product) {
    return I18n.getLang() === 'ru' ? product.badgeRu : product.badgeUz;
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
      const title = I18n.getLang() === 'ru' ? (item.titleRu || '') : (item.titleUz || '');
      return `<img src="${item.src}" alt="${title}" title="${title}" loading="lazy">`;
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
      image.src = img.getAttribute('src');
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

  function updateNavTooltips() {
    bottomNav.querySelectorAll('.bottom-nav-item').forEach((item) => {
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

  function initHeroSlider() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const slides = hero.querySelectorAll('.hero-slide');
    if (slides.length < 2) return;

    let current = 0;

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === current);
        const video = slide.querySelector('video');
        if (!video) return;
        if (i === current) video.play().catch(() => {});
        else video.pause();
      });
    }

    setInterval(() => goTo(current + 1), 6000);
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
    renderPortfolio();
    renderFaq();
    updateNavTooltips();
    markActiveNav();
    initPosterCarousel();
    initHeroSlider();
    initWhyCards();
    initLightbox();
    initSettingsDropdown();

    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      btn.addEventListener('click', () => I18n.setLanguage(btn.getAttribute('data-lang-btn')));
    });

    document.addEventListener('languagechange', () => {
      renderServiceCards();
      renderPortfolio();
      renderFaq();
      updateNavTooltips();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
