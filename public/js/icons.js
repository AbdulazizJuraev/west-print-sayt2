'use strict';

/*
 * Bir xil uslubdagi (single-color, line-style) SVG ikonkalar to'plami.
 * Har biri currentColor'dan foydalanadi — rangi CSS orqali boshqariladi.
 */
const Icons = (function () {
  const STROKE = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

  const ICONS = {
    home: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/><path d="M9.5 20v-6h5v6"/></svg>`,
    lightning: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>`,
    target: `<svg viewBox="0 0 24 24" ${STROKE}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/></svg>`,
    shieldCheck: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3z"/><path d="M9 12l2 2 4-4"/></svg>`,
    palette: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M12 2a10 10 0 1 0 0 20c1.5 0 2-1 2-2 0-.6-.3-1-.6-1.4-.3-.4-.4-.8-.4-1.1 0-.8.7-1.5 1.5-1.5H16a4 4 0 0 0 4-4c0-5.5-4.5-10-8-10z"/><circle cx="7.5" cy="10.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="10.5" cy="7" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="8" r="1.1" fill="currentColor" stroke="none"/><circle cx="17" cy="12" r="1.1" fill="currentColor" stroke="none"/></svg>`,
    businessCard: `<svg viewBox="0 0 24 24" ${STROKE}><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="6" y1="14" x2="10" y2="14"/></svg>`,
    fileText: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>`,
    bookOpen: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M2 5c2-1 5-1 7 0v14c-2-1-5-1-7 0V5z"/><path d="M22 5c-2-1-5-1-7 0v14c2-1 5-1 7 0V5z"/></svg>`,
    image: `<svg viewBox="0 0 24 24" ${STROKE}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>`,
    signpost: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M3 9h13l3 3-3 3H3z"/><line x1="7" y1="9" x2="7" y2="21"/></svg>`,
    tag: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
    printer: `<svg viewBox="0 0 24 24" ${STROKE}><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8.1 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" ${STROKE}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>`,
    mapPin: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" ${STROKE}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    settings: `<svg viewBox="0 0 24 24" ${STROKE}><circle cx="12" cy="12" r="3.5"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>`,
    moon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`,
    sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4" y1="12" x2="2" y2="12"/><line x1="22" y1="12" x2="20" y2="12"/><line x1="19.07" y1="4.93" x2="17.66" y2="6.34"/><line x1="6.34" y1="17.66" x2="4.93" y2="19.07"/><line x1="19.07" y1="19.07" x2="17.66" y2="17.66"/><line x1="6.34" y1="6.34" x2="4.93" y2="4.93"/></svg>`
  };

  function get(name) {
    return ICONS[name] || '';
  }

  return { get };
})();
