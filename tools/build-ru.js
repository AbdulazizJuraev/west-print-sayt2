'use strict';

/*
 * Ruscha sahifalarni yasaydi: public/*.html → public/ru/*.html.
 *
 * Saytda til almashtirish JavaScript bilan ishlaydi, Google esa faqat HTML'dagi
 * matnni ko'radi. Shuning uchun ruscha matn oldindan HTML'ga yozib qo'yiladi va
 * har bir sahifa uchun alohida /ru/ manzil bo'ladi (hreflang bilan bog'langan).
 *
 * Yana: o'zbekcha sahifalarning sarlavha/tavsif/hreflang teglarini seo-meta.js
 * bo'yicha yangilaydi, tools/landings.js dan mahsulot sahifalarini (vizitka.html,
 * flayer.html, ...) ikkala tilda yasaydi, Google uchun JSON-LD va futerdagi
 * mahsulot havolalarini qo'yadi, sitemap.xml ni qaytadan yozadi.
 *
 * Ishga tushirish: node tools/build-ru.js  (deploy paytida avtomatik ishlaydi)
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SITE = 'https://westprint.uz/';
const PUBLIC = path.join(__dirname, '..', 'public');
const META = require('./seo-meta');
const LANDINGS = require('./landings');

const I18N = (() => {
  const src = fs.readFileSync(path.join(PUBLIC, 'js', 'i18n.js'), 'utf8');
  const ctx = {
    localStorage: { getItem: () => null, setItem() {} },
    document: { documentElement: { getAttribute: () => null } },
    location: {}
  };
  vm.runInNewContext(src + ';this.I18N = I18N;', ctx);
  return ctx.I18N;
})();

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => esc(s).replace(/"/g, '&quot;');
const pageUrl = (page, lang) => SITE + (lang === 'ru' ? 'ru/' : '') + (page === 'index.html' ? '' : page);

function setHead(html, page, lang) {
  const m = META[page][lang];
  const url = pageUrl(page, lang);
  const alternates = [
    `<link rel="alternate" hreflang="uz" href="${pageUrl(page, 'uz')}">`,
    `<link rel="alternate" hreflang="ru" href="${pageUrl(page, 'ru')}">`,
    `<link rel="alternate" hreflang="x-default" href="${pageUrl(page, 'uz')}">`
  ].join('\n');
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(m.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*"/, `$1${escAttr(m.desc)}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${escAttr(m.title)}"`)
    .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${escAttr(m.desc)}"`)
    .replace(/(<meta property="og:locale" content=")[^"]*"/, `$1${lang === 'ru' ? 'ru_RU' : 'uz_UZ'}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
    .replace(/<link rel="alternate" hreflang="[^"]*" href="[^"]*">\n/g, '')
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">\n${alternates}`);
}

// Ruscha tanlagan mehmon o'zbekcha sahifaga kirsa — darhol /ru/ ga o'tkaziladi.
const REDIRECT = '<script id="langRedirect">try{if(localStorage.getItem(\'wp_lang\')===\'ru\')' +
  'location.replace(\'/ru/\'+location.pathname.split(\'/\').pop()+location.search+location.hash)}catch(e){}</script>';

function withRedirect(html) {
  html = html.replace(/<script id="langRedirect">.*?<\/script>\n/, '');
  return html.replace(/(<meta name="viewport"[^>]*>\n)/, `$1${REDIRECT}\n`);
}

function toRussian(html) {
  const ru = I18N.ru;
  return html
    .replace('<html lang="uz">', '<html lang="ru" data-page-lang="ru">')
    .replace(/<script id="langRedirect">.*?<\/script>\n/, '')
    .replace(/(href|src)="(css|js|images)\//g, '$1="/$2/')
    .replace(/(<([a-z0-9]+)\b[^>]*\sdata-i18n="([^"]+)"[^>]*>)([^<]*)(<\/\2>)/g,
      (all, open, tag, key, text, close) => (ru[key] ? open + esc(ru[key]) + close : all))
    .replace(/<[a-z]+\b[^>]*\sdata-i18n-placeholder="([^"]+)"[^>]*>/g,
      (tag, key) => (ru[key] ? tag.replace(/placeholder="[^"]*"/, `placeholder="${escAttr(ru[key])}"`) : tag));
}

// Futerdagi mahsulot havolalari — har bir sahifadan mahsulot sahifalariga ichki havola.
function withFooterLinks(html) {
  const links = LANDINGS.map((l, i) =>
    `      <a href="${l.slug}" data-i18n="${FOOTER_KEYS[i]}">${esc(I18N.uz[FOOTER_KEYS[i]])}</a>`).join('\n');
  return html
    .replace(/    <nav class="footer-links"[\s\S]*?<\/nav>\n/, '')
    .replace('<footer class="site-footer">\n  <div class="container">\n',
      `<footer class="site-footer">\n  <div class="container">\n    <nav class="footer-links" aria-label="West Print">\n${links}\n    </nav>\n`);
}
const FOOTER_KEYS = ['price_card', 'price_flyer', 'price_booklet', 'price_bag'];

// Google/Yandex uchun tuzilgan ma'lumot (JSON-LD). data-schema bilan belgilanadi,
// qayta yig'ilganda eskisi olib tashlanadi.
function withSchema(html, data) {
  const tag = `<script type="application/ld+json" data-schema>\n${JSON.stringify(data, null, 2)}\n</script>\n`;
  return html.replace(/<script type="application\/ld\+json" data-schema>[\s\S]*?<\/script>\n/g, '')
    .replace('</head>', tag + '</head>');
}
const faqPairs = (lang) => [1, 2, 3, 4, 5].map((n) => [I18N[lang]['faq_q' + n], I18N[lang]['faq_a' + n]]);
const faqSchema = (pairs) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: pairs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
});
const BUSINESS = {
  '@type': 'LocalBusiness', name: 'West Print', url: SITE, telephone: '+998959803037',
  address: { '@type': 'PostalAddress', streetAddress: "Muqimiy ko'chasi, 100", addressLocality: 'Toshkent', addressCountry: 'UZ' }
};
function serviceSchema(l, lang) {
  const t = l[lang];
  return {
    '@context': 'https://schema.org', '@type': 'Service',
    name: t.h1, serviceType: t.crumb, description: t.desc, url: pageUrl(l.slug, lang),
    image: SITE + l.image, provider: BUSINESS, areaServed: { '@type': 'City', name: lang === 'ru' ? 'Ташкент' : 'Toshkent' },
    offers: {
      '@type': 'Offer', price: l.price.value, priceCurrency: 'UZS',
      eligibleQuantity: { '@type': 'QuantitativeValue', value: l.price.qty, unitText: lang === 'ru' ? 'шт' : 'dona' },
      description: t.priceText + ' — ' + t.priceNote.replace(/ /g, ' ')
    }
  };
}
function breadcrumbSchema(l, lang) {
  const c = LANDINGS.common[lang];
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [[c.home, pageUrl('index.html', lang)], [c.services, pageUrl('services.html', lang)], [l[lang].crumb, pageUrl(l.slug, lang)]]
      .map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item }))
  };
}

function landingMain(l, lang) {
  const t = l[lang];
  const c = LANDINGS.common[lang];
  const others = LANDINGS.filter((o) => o !== l)
    .map((o) => `          <a class="b-pill" href="${o.slug}">${esc(o[lang].crumb)}</a>`).join('\n');
  return `<main>
  <section class="services">
    <div class="container svc-page land">
      <nav class="land-crumbs" aria-label="breadcrumb"><a href="index.html">${esc(c.home)}</a> / <a href="services.html">${esc(c.services)}</a> / <span>${esc(t.crumb)}</span></nav>

      <div class="b-card land-hero">
        <div class="land-hero-text">
          <h1 class="svc-title">${esc(t.h1)}</h1>
          <p class="svc-sub">${esc(t.lead)}</p>
          <div class="land-price">
            <strong>${esc(t.priceText)}</strong>
            <span>${esc(t.priceNote)}</span>
          </div>
          <div class="land-actions">
            <a class="btn btn-primary" href="https://t.me/wpmaxuz" target="_blank" rel="noopener">${esc(c.order)}</a>
            <a class="btn land-call" href="tel:+998959803037">+998 95 980 30 37</a>
          </div>
        </div>
        <img class="land-hero-img" src="${l.image}" alt="${escAttr(t.h1)}" width="600" height="450">
      </div>

      <div class="b-card">
        <h2>${esc(t.kindsTitle)}</h2>
        <ul class="land-kinds">
${t.kinds.map(([k, d]) => `          <li><strong>${esc(k)}</strong><span>${esc(d)}</span></li>`).join('\n')}
        </ul>
        <p class="land-note">${esc(c.note)}</p>
      </div>

      <div class="land-row">
        <div class="b-card">
          <h2>${esc(c.stepsTitle)}</h2>
          <ol class="land-steps">
${c.steps.map(([s, d]) => `            <li><strong>${esc(s)}</strong><span>${esc(d)}</span></li>`).join('\n')}
          </ol>
        </div>
        <div class="b-card">
          <h2>${esc(c.faqTitle)}</h2>
${c.faq.map(([q, a]) => `          <details class="land-faq"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n')}
        </div>
      </div>

      <div class="b-card">
        <h2>${esc(c.moreTitle)}</h2>
        <div class="land-more">
${others}
          <a class="b-pill" href="services.html">${esc(c.allServices)}</a>
        </div>
        <p class="land-note">${esc(c.address)}</p>
      </div>
    </div>
  </section>
</main>`;
}

fs.mkdirSync(path.join(PUBLIC, 'ru'), { recursive: true });
for (const page of Object.keys(META)) {
  const file = path.join(PUBLIC, page);
  let uz = withRedirect(setHead(withFooterLinks(fs.readFileSync(file, 'utf8')), page, 'uz'));
  if (page === 'contact.html') uz = withSchema(uz, faqSchema(faqPairs('uz')));
  fs.writeFileSync(file, uz);
  let ru = setHead(toRussian(uz), page, 'ru');
  if (page === 'contact.html') ru = withSchema(ru, faqSchema(faqPairs('ru')));
  fs.writeFileSync(path.join(PUBLIC, 'ru', page), ru);
}

// Mahsulot sahifalari (tools/landings.js): Xizmatlar sahifasining menyusi va
// futeri bilan, <main> o'rniga mahsulot matni.
const shell = fs.readFileSync(path.join(PUBLIC, 'services.html'), 'utf8');
for (const l of LANDINGS) {
  META[l.slug] = { uz: l.uz, ru: l.ru };
  const build = (lang) => withSchema(
    shell.replace(/<main>[\s\S]*<\/main>/, landingMain(l, lang)),
    [serviceSchema(l, lang), breadcrumbSchema(l, lang), faqSchema(LANDINGS.common[lang].faq)]);
  fs.writeFileSync(path.join(PUBLIC, l.slug), setHead(build('uz'), l.slug, 'uz'));
  fs.writeFileSync(path.join(PUBLIC, 'ru', l.slug), setHead(toRussian(build('ru')), l.slug, 'ru'));
}

const urls = Object.keys(META).filter((p) => !META[p].noindex).flatMap((page) => ['uz', 'ru'].map((lang) =>
  `  <url>\n    <loc>${pageUrl(page, lang)}</loc>\n` +
  ['uz', 'ru'].map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${pageUrl(page, l)}"/>`).join('\n') +
  '\n  </url>'));
fs.writeFileSync(path.join(PUBLIC, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
  urls.join('\n') + '\n</urlset>\n');

console.log('ru sahifalar:', Object.keys(META).length, '| sitemap URL:', urls.length);
