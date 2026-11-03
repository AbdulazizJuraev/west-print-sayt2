'use strict';

/*
 * Ruscha sahifalarni yasaydi: public/*.html → public/ru/*.html.
 *
 * Saytda til almashtirish JavaScript bilan ishlaydi, Google esa faqat HTML'dagi
 * matnni ko'radi. Shuning uchun ruscha matn oldindan HTML'ga yozib qo'yiladi va
 * har bir sahifa uchun alohida /ru/ manzil bo'ladi (hreflang bilan bog'langan).
 *
 * Yana: o'zbekcha sahifalarning sarlavha/tavsif/hreflang teglarini seo-meta.js
 * bo'yicha yangilaydi va sitemap.xml ni qaytadan yozadi.
 *
 * Ishga tushirish: node tools/build-ru.js  (deploy paytida avtomatik ishlaydi)
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SITE = 'https://westprint.uz/';
const PUBLIC = path.join(__dirname, '..', 'public');
const META = require('./seo-meta');

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

fs.mkdirSync(path.join(PUBLIC, 'ru'), { recursive: true });
for (const page of Object.keys(META)) {
  const file = path.join(PUBLIC, page);
  const uz = withRedirect(setHead(fs.readFileSync(file, 'utf8'), page, 'uz'));
  fs.writeFileSync(file, uz);
  fs.writeFileSync(path.join(PUBLIC, 'ru', page), setHead(toRussian(uz), page, 'ru'));
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
