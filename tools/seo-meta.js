'use strict';

/*
 * Har bir sahifaning Google uchun sarlavhasi va tavsifi (uz va ru).
 * build-ru.js shu ro'yxatdan public/ru/ sahifalarini va sitemap.xml ni yasaydi.
 * O'zbekcha matnlar public/*.html ning o'zida ham shunday turibdi —
 * birini o'zgartirsangiz, ikkinchisini ham yangilang.
 */
module.exports = {
  'index.html': {
    uz: {
      title: 'Poligrafiya Toshkentda — vizitka, banner, paket chop etish | West Print',
      desc: "West Print — Toshkentdagi poligrafiya va reklama agentligi: vizitka, flayer, buklet, banner, logotipli paket, yorliq va tashqi reklama. Dizayndan tayyor mahsulotgacha. +998 95 980 30 37"
    },
    ru: {
      title: 'Полиграфия в Ташкенте — визитки, баннеры, пакеты с логотипом | West Print',
      desc: 'West Print — полиграфия и рекламное агентство в Ташкенте: визитки, флаеры, буклеты, баннеры, пакеты с логотипом, этикетки и наружная реклама. От дизайна до готового тиража. +998 95 980 30 37'
    }
  },
  'services.html': {
    uz: {
      title: "Xizmatlar — 115 turdagi bosma mahsulot | West Print, Toshkent",
      desc: "Vizitka, flayer, buklet, katalog, banner, qog'oz paket, yorliq, futbolkaga bosma, suvenir va tashqi reklama — 10 yo'nalishda 115 mahsulot. Toshkent."
    },
    ru: {
      title: 'Услуги полиграфии — 115 видов продукции | West Print, Ташкент',
      desc: 'Визитки, флаеры, буклеты, каталоги, баннеры, бумажные пакеты, этикетки, печать на футболках, сувениры и наружная реклама — 115 видов продукции в Ташкенте.'
    }
  },
  'advantages.html': {
    uz: {
      title: 'Afzalliklarimiz — nega West Print | Toshkentda poligrafiya',
      desc: 'Nega aynan West Print: tezkor bajarish, yuqori sifat, professional dizayn va oldindan aniq narx hamda muddat.'
    },
    ru: {
      title: 'Наши преимущества — почему West Print | Полиграфия в Ташкенте',
      desc: 'Почему West Print: быстрое выполнение, высокое качество, профессиональный дизайн, заранее известные цена и сроки.'
    }
  },
  'portfolio.html': {
    uz: {
      title: 'Portfolio — bizning ishlarimiz | West Print',
      desc: 'West Print portfoliosi: mijozlarimiz uchun tayyorlagan yorliq, katalog, vizitka, paket va reklama ishlari.'
    },
    ru: {
      title: 'Портфолио — наши работы | West Print',
      desc: 'Портфолио West Print: этикетки, каталоги, визитки, пакеты и рекламные материалы, сделанные для наших клиентов.'
    }
  },
  'contact.html': {
    uz: {
      title: "Bog'lanish — West Print, Toshkent, Muqimiy ko'chasi 100",
      desc: "West Print bilan bog'lanish: +998 95 980 30 37, Telegram @wpmaxuz. Toshkent, Muqimiy ko'chasi 100-uy. Ish vaqti 09:00—19:00."
    },
    ru: {
      title: 'Контакты — West Print, Ташкент, ул. Мукими 100',
      desc: 'Связаться с West Print: +998 95 980 30 37, Telegram @wpmaxuz. Ташкент, ул. Мукими, 100. Время работы 09:00—19:00.'
    }
  },
  'gallery.html': {
    noindex: true,
    uz: {
      title: 'Bizning ishlarimiz — West Print',
      desc: 'West Print tayyorlagan ishlar: brendli paketlar, yorliqlar, kataloglar, vizitkalar va reklama posterlari.'
    },
    ru: {
      title: 'Наши работы — West Print',
      desc: 'Работы West Print: брендированные пакеты, этикетки, каталоги, визитки и рекламные постеры.'
    }
  }
};
