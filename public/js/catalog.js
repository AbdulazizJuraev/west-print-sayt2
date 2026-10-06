'use strict';

/*
 * Mahsulotlar katalogi: nomi, marketing yorlig'i (badge) va qisqa tavsifi.
 * Xizmatlar sahifasi va bosh sahifadagi mahsulotlar karuseli shundan chiziladi.
 */
const ProductCatalog = (function () {
  const CATALOG = [
    {
      id: 'business_card', nameUz: 'Vizitka', nameRu: 'Визитка', badgeUz: 'Ommabop', badgeRu: 'Хит',
      descUz: "Kompaniya yoki shaxsiy vizitkalar — dizayndan tayyor mahsulotgacha.",
      descRu: 'Корпоративные и личные визитки — от дизайна до готового тиража.'
    },
    {
      id: 'flyer', nameUz: 'Flayer', nameRu: 'Флаер', badgeUz: 'Reklama uchun', badgeRu: 'Для рекламы',
      descUz: "Aksiya, menyu va reklama uchun flayerlar — kichik va katta tirajlarda.",
      descRu: 'Флаеры для акций, меню и рекламы — малыми и большими тиражами.'
    },
    {
      id: 'booklet', nameUz: 'Buklet', nameRu: 'Буклет', badgeUz: 'Biznes uchun', badgeRu: 'Для бизнеса',
      descUz: "Kompaniya, xizmat va mahsulotlaringiz haqida buklet va kataloglar.",
      descRu: 'Буклеты и каталоги о вашей компании, услугах и продукции.'
    },
    {
      id: 'banner', nameUz: 'Banner', nameRu: 'Баннер', badgeUz: 'Katta formatli', badgeRu: 'Широкий формат',
      descUz: "Ichki va tashqi reklama uchun katta formatli bannerlar.",
      descRu: 'Широкоформатные баннеры для внутренней и наружной рекламы.'
    },
    {
      id: 'signboard', nameUz: 'Reklama taxtasi', nameRu: 'Рекламная табличка', badgeUz: 'Tashqi reklama', badgeRu: 'Наружная реклама',
      descUz: "Do'kon, ofis va binolar uchun reklama taxtalari.",
      descRu: 'Рекламные таблички для магазинов, офисов и зданий.'
    },
    {
      id: 'brand_tag', nameUz: 'Brend belgi / yorliq', nameRu: 'Брендовый ярлык', badgeUz: 'Brend uchun', badgeRu: 'Для бренда',
      descUz: "Mahsulot qadoqlari uchun yorliq va brend belgilari.",
      descRu: 'Этикетки и брендовые ярлыки для упаковки продукции.'
    }
  ];

  function listProducts() {
    return CATALOG.slice();
  }

  function getProduct(productId) {
    for (let i = 0; i < CATALOG.length; i++) {
      if (CATALOG[i].id === productId) return CATALOG[i];
    }
    return null;
  }

  return { CATALOG, listProducts, getProduct };
})();
