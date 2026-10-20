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
    telegram: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" ${STROKE}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`,
    briefcase: `<svg viewBox="0 0 24 24" ${STROKE}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    megaphone: `<svg viewBox="0 0 24 24" ${STROKE}><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`,
    box: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    flag: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`,
    gift: `<svg viewBox="0 0 24 24" ${STROKE}><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>`,
    shirt: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>`,
    stamp: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M5 22h14"/><path d="M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z"/><path d="M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13"/></svg>`,
    penTool: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>`,
    scissors: `<svg viewBox="0 0 24 24" ${STROKE}><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`,
    star: `<svg viewBox="0 0 24 24" ${STROKE}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    search: `<svg viewBox="0 0 24 24" ${STROKE}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    chevronLeft: `<svg viewBox="0 0 24 24" ${STROKE}><polyline points="15 18 9 12 15 6"/></svg>`,
    chevronRight: `<svg viewBox="0 0 24 24" ${STROKE}><polyline points="9 18 15 12 9 6"/></svg>`,
    moon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`,
    sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4" y1="12" x2="2" y2="12"/><line x1="22" y1="12" x2="20" y2="12"/><line x1="19.07" y1="4.93" x2="17.66" y2="6.34"/><line x1="6.34" y1="17.66" x2="4.93" y2="19.07"/><line x1="19.07" y1="19.07" x2="17.66" y2="17.66"/><line x1="6.34" y1="6.34" x2="4.93" y2="4.93"/></svg>`,
    // Bayroqlar (rangli, 3:2 — haqiqiy bayroq shaklida ko'rsatiladi).
    // Emoji bayroqlar Windows'da ko'rinmaydi, shuning uchun SVG.
    flagUz: `<svg viewBox="0 0 36 24"><rect width="36" height="8" fill="#0099B5"/><rect y="8" width="36" height="8" fill="#fff"/><rect y="16" width="36" height="8" fill="#1EB53A"/><rect y="7.4" width="36" height="0.9" fill="#CE1126"/><rect y="15.7" width="36" height="0.9" fill="#CE1126"/><circle cx="6.6" cy="4" r="2.6" fill="#fff"/><circle cx="7.6" cy="4" r="2.2" fill="#0099B5"/><circle cx="11.6" cy="2.4" r="0.55" fill="#fff"/><circle cx="13.4" cy="2.4" r="0.55" fill="#fff"/><circle cx="15.2" cy="2.4" r="0.55" fill="#fff"/><circle cx="11.6" cy="4.2" r="0.55" fill="#fff"/><circle cx="13.4" cy="4.2" r="0.55" fill="#fff"/><circle cx="15.2" cy="4.2" r="0.55" fill="#fff"/><circle cx="11.6" cy="6" r="0.55" fill="#fff"/><circle cx="13.4" cy="6" r="0.55" fill="#fff"/><circle cx="15.2" cy="6" r="0.55" fill="#fff"/></svg>`,
    flagRu: `<svg viewBox="0 0 36 24"><rect width="36" height="8" fill="#fff"/><rect y="8" width="36" height="8" fill="#0039A6"/><rect y="16" width="36" height="8" fill="#D52B1E"/></svg>`,
    flagEn: `<svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice"><clipPath id="ukT"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath><rect width="60" height="30" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#ukT)" stroke="#C8102E" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></svg>`,
  };

  function get(name) {
    return ICONS[name] || '';
  }

  return { get };
})();
