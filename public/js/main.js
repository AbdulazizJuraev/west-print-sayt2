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

  const FAQ_IDS = [1, 2, 3, 4, 5];

  function renderFaq() {
    if (!faqList) return;
    faqList.innerHTML = FAQ_IDS.map((n) => `
      <div class="faq-item">
        <button type="button" class="faq-question">
          <span>${I18n.t('faq_q' + n)}</span>
          <span class="faq-toggle-icon">+</span>
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

  function init() {
    document.getElementById('year').textContent = new Date().getFullYear();
    I18n.applyStaticText();

    renderStaticIcons();
    renderServiceCards();
    renderFaq();
    updateNavTooltips();
    markActiveNav();
    initPosterCarousel();

    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      btn.addEventListener('click', () => I18n.setLanguage(btn.getAttribute('data-lang-btn')));
    });

    document.addEventListener('languagechange', () => {
      renderServiceCards();
      renderFaq();
      updateNavTooltips();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
