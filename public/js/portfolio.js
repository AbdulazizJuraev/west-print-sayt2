'use strict';

/*
 * Portfolio ishlari ro'yxati.
 *
 * Yangi ish qo'shish uchun:
 *   1. Rasmni public/images/portfolio/ papkasiga tashlang (kichik nusxasi
 *      thumbs/ ichida bo'lsa sahifa tezroq ochiladi; bo'lmasa to'liq rasm ko'rsatiladi),
 *      so'ng `python tools/webp.py` — yengil .webp nusxalarini yasaydi
 *   2. Shu ro'yxatga bitta satr qo'shing, masalan:
 *      { src: '/images/portfolio/vizitka-6.webp', titleUz: 'Vizitka', titleRu: 'Визитка', titleEn: 'Business card' }
 *   3. Bosh sahifadagi slayderda chiqishi uchun featured: true qo'shing
 *
 * Ro'yxat bo'sh bo'lsa, sahifada "tez orada" degan yozuv chiqadi.
 * Ishlar turlari aralash tursin deb ataylab navbatma-navbat terilgan.
 */
const PORTFOLIO = [
  { src: '/images/portfolio/offset-pechat.webp', featured: true, titleUz: 'Ofset pechat', titleRu: 'Офсетная печать', titleEn: 'Offset printing' },
  { src: '/images/portfolio/paket-pont.webp', featured: true, titleUz: 'Brendli paket — Pont', titleRu: 'Брендированный пакет — Pont', titleEn: 'Branded bag — Pont' },
  { src: '/images/portfolio/qadoq-vitrina.webp', featured: true, titleUz: 'Qadoq va poligrafiya mahsulotlari', titleRu: 'Упаковка и полиграфия', titleEn: 'Packaging and print products' },
  { src: '/images/portfolio/paket-tumor.webp', featured: true, titleUz: 'Brendli paket — Tumor', titleRu: 'Брендированный пакет — Tumor', titleEn: 'Branded bag — Tumor' },
  { src: '/images/portfolio/qadoq-qutilar.webp', featured: true, titleUz: 'Qadoq qutilari', titleRu: 'Упаковочные коробки', titleEn: 'Packaging boxes' },
  { src: '/images/portfolio/paket-madam-muzi.webp', featured: true, titleUz: 'Brendli paket — Madam Muzi', titleRu: 'Брендированный пакет — Madam Muzi', titleEn: 'Branded bag — Madam Muzi' },
  { src: '/images/portfolio/tashqi-reklama.webp', featured: true, titleUz: 'Tashqi reklama', titleRu: 'Наружная реклама', titleEn: 'Outdoor advertising' },
  { src: '/images/portfolio/yorliq-1.webp', titleUz: "Mahsulot yorlig'i", titleRu: 'Этикетка продукции', titleEn: 'Product label' },
  { src: '/images/portfolio/katalog-1.webp', titleUz: 'Katalog', titleRu: 'Каталог', titleEn: 'Catalogue' },
  { src: '/images/portfolio/vizitka-6.webp', titleUz: 'Vizitka', titleRu: 'Визитка', titleEn: 'Business card' },
  { src: '/images/portfolio/poster-2.webp', titleUz: 'Dizayn posteri', titleRu: 'Дизайн-постер', titleEn: 'Design poster' },
  { src: '/images/portfolio/vizitka-1.webp', titleUz: 'Vizitka', titleRu: 'Визитка', titleEn: 'Business card' },
  { src: '/images/portfolio/poster-1.webp', titleUz: 'Reklama posteri', titleRu: 'Рекламный постер', titleEn: 'Advertising poster' },
  { src: '/images/portfolio/smm-1.webp', titleUz: 'Ijtimoiy tarmoq posti', titleRu: 'Пост для соцсетей', titleEn: 'Social media post' },
  { src: '/images/portfolio/menyu-1.webp', titleUz: 'Menyu flayer', titleRu: 'Меню-флаер', titleEn: 'Menu flyer' },
  { src: '/images/portfolio/yorliq-4.webp', titleUz: "Mahsulot yorlig'i", titleRu: 'Этикетка продукции', titleEn: 'Product label' },
  { src: '/images/portfolio/katalog-2.webp', titleUz: 'Katalog', titleRu: 'Каталог', titleEn: 'Catalogue' },
  { src: '/images/portfolio/vizitka-3.webp', titleUz: 'Vizitka', titleRu: 'Визитка', titleEn: 'Business card' },
  { src: '/images/portfolio/yorliq-2.webp', titleUz: "Mahsulot yorlig'i", titleRu: 'Этикетка продукции', titleEn: 'Product label' },
  { src: '/images/portfolio/menyu-2.webp', titleUz: 'Menyu flayer', titleRu: 'Меню-флаер', titleEn: 'Menu flyer' },
  { src: '/images/portfolio/vizitka-2.webp', titleUz: 'Vizitka', titleRu: 'Визитка', titleEn: 'Business card' },
  { src: '/images/portfolio/yorliq-5.webp', titleUz: "Mahsulot yorlig'i", titleRu: 'Этикетка продукции', titleEn: 'Product label' },
  { src: '/images/portfolio/katalog-3.webp', titleUz: 'Katalog', titleRu: 'Каталог', titleEn: 'Catalogue' },
  { src: '/images/portfolio/vizitka-4.webp', titleUz: 'Vizitka', titleRu: 'Визитка', titleEn: 'Business card' },
  { src: '/images/portfolio/yorliq-3.webp', titleUz: "Mahsulot yorlig'i", titleRu: 'Этикетка продукции', titleEn: 'Product label' },
  { src: '/images/portfolio/vizitka-5.webp', titleUz: 'Vizitka', titleRu: 'Визитка', titleEn: 'Business card' },
  { src: '/images/portfolio/yorliq-6.webp', titleUz: "Mahsulot yorlig'i", titleRu: 'Этикетка продукции', titleEn: 'Product label' },
  { src: '/images/portfolio/yorliq-7.webp', titleUz: "Mahsulot yorlig'i", titleRu: 'Этикетка продукции', titleEn: 'Product label' }
];
