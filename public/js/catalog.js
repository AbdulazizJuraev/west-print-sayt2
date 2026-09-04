'use strict';

/*
 * Mahsulotlar katalogi. Faqat mahsulotning nomi va marketing yorlig'i
 * (badge) saqlanadi, xizmatlar bo'limini chizish uchun.
 */
const ProductCatalog = (function () {
  const CATALOG = [
    { id: 'business_card', nameUz: 'Vizitka', nameRu: 'Визитка', badgeUz: 'Ommabop', badgeRu: 'Хит' },
    { id: 'flyer', nameUz: 'Flayer', nameRu: 'Флаер', badgeUz: 'Reklama uchun', badgeRu: 'Для рекламы' },
    { id: 'booklet', nameUz: 'Buklet', nameRu: 'Буклет', badgeUz: 'Biznes uchun', badgeRu: 'Для бизнеса' },
    { id: 'banner', nameUz: 'Banner', nameRu: 'Баннер', badgeUz: 'Katta formatli', badgeRu: 'Широкий формат' },
    { id: 'signboard', nameUz: 'Reklama taxtasi', nameRu: 'Рекламная табличка', badgeUz: 'Tashqi reklama', badgeRu: 'Наружная реклама' },
    { id: 'brand_tag', nameUz: 'Brend belgi / yorliq', nameRu: 'Брендовый ярлык', badgeUz: 'Brend uchun', badgeRu: 'Для бренда' }
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
