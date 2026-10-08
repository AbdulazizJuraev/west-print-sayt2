'use strict';

/*
 * Portfolio ishlari ro'yxati.
 *
 * Yangi ish qo'shish uchun:
 *   1. Rasmni public/images/portfolio/ papkasiga tashlang (kichik nusxasi
 *      thumbs/ ichida bo'lsa sahifa tezroq ochiladi; bo'lmasa to'liq rasm ko'rsatiladi)
 *   2. Shu ro'yxatga bitta satr qo'shing, masalan:
 *      { src: 'images/portfolio/vizitka-6.jpg', titleUz: 'Vizitka', titleRu: 'Визитка', titleEn: 'Business card' }
 *   3. Bosh sahifadagi slayderda chiqishi uchun featured: true qo'shing
 *
 * Ro'yxat bo'sh bo'lsa, sahifada "tez orada" degan yozuv chiqadi.
 * Ishlar turlari aralash tursin deb ataylab navbatma-navbat terilgan.
 */
const PORTFOLIO = [
  { src: 'images/portfolio/offset-pechat.jpg', featured: true, titleUz: 'Ofset pechat', titleRu: 'Офсетная печать', titleEn: 'Offset printing' },
  { src: 'images/portfolio/paket-pont.jpg', featured: true, titleUz: 'Brendli paket — Pont', titleRu: 'Брендированный пакет — Pont', titleEn: 'Branded bag — Pont' },
  { src: 'images/portfolio/qadoq-vitrina.jpg', featured: true, titleUz: 'Qadoq va poligrafiya mahsulotlari', titleRu: 'Упаковка и полиграфия', titleEn: 'Packaging and print products' },
  { src: 'images/portfolio/paket-airlab.jpg', featured: true, titleUz: 'Brendli paket — Airlab', titleRu: 'Брендированный пакет — Airlab', titleEn: 'Branded bag — Airlab' },
  { src: 'images/portfolio/paket-madam-muzi.jpg', featured: true, titleUz: 'Brendli paket — Madam Muzi', titleRu: 'Брендированный пакет — Madam Muzi', titleEn: 'Branded bag — Madam Muzi' },
  { src: 'images/portfolio/tashqi-reklama.jpg', featured: true, titleUz: 'Tashqi reklama', titleRu: 'Наружная реклама', titleEn: 'Outdoor advertising' },
  { src: 'images/portfolio/yorliq-1.jpg', titleUz: "Mahsulot yorlig'i", titleRu: 'Этикетка продукции', titleEn: 'Product label' },
  { src: 'images/portfolio/katalog-1.jpg', titleUz: 'Katalog', titleRu: 'Каталог', titleEn: 'Catalogue' },
  { src: 'images/portfolio/vizitka-6.jpg', titleUz: 'Vizitka', titleRu: 'Визитка', titleEn: 'Business card' },
  { src: 'images/portfolio/poster-2.jpg', titleUz: 'Dizayn posteri', titleRu: 'Дизайн-постер', titleEn: 'Design poster' },
  { src: 'images/portfolio/vizitka-1.jpg', titleUz: 'Vizitka', titleRu: 'Визитка', titleEn: 'Business card' },
  { src: 'images/portfolio/poster-1.jpg', titleUz: 'Reklama posteri', titleRu: 'Рекламный постер', titleEn: 'Advertising poster' },
  { src: 'images/portfolio/smm-1.jpg', titleUz: 'Ijtimoiy tarmoq posti', titleRu: 'Пост для соцсетей', titleEn: 'Social media post' },
  { src: 'images/portfolio/menyu-1.jpg', titleUz: 'Menyu flayer', titleRu: 'Меню-флаер', titleEn: 'Menu flyer' },
  { src: 'images/portfolio/yorliq-4.jpg', titleUz: "Mahsulot yorlig'i", titleRu: 'Этикетка продукции', titleEn: 'Product label' },
  { src: 'images/portfolio/katalog-2.jpg', titleUz: 'Katalog', titleRu: 'Каталог', titleEn: 'Catalogue' },
  { src: 'images/portfolio/vizitka-3.jpg', titleUz: 'Vizitka', titleRu: 'Визитка', titleEn: 'Business card' },
  { src: 'images/portfolio/yorliq-2.jpg', titleUz: "Mahsulot yorlig'i", titleRu: 'Этикетка продукции', titleEn: 'Product label' },
  { src: 'images/portfolio/menyu-2.jpg', titleUz: 'Menyu flayer', titleRu: 'Меню-флаер', titleEn: 'Menu flyer' },
  { src: 'images/portfolio/vizitka-2.jpg', titleUz: 'Vizitka', titleRu: 'Визитка', titleEn: 'Business card' },
  { src: 'images/portfolio/yorliq-5.jpg', titleUz: "Mahsulot yorlig'i", titleRu: 'Этикетка продукции', titleEn: 'Product label' },
  { src: 'images/portfolio/katalog-3.jpg', titleUz: 'Katalog', titleRu: 'Каталог', titleEn: 'Catalogue' },
  { src: 'images/portfolio/vizitka-4.jpg', titleUz: 'Vizitka', titleRu: 'Визитка', titleEn: 'Business card' },
  { src: 'images/portfolio/yorliq-3.jpg', titleUz: "Mahsulot yorlig'i", titleRu: 'Этикетка продукции', titleEn: 'Product label' },
  { src: 'images/portfolio/vizitka-5.jpg', titleUz: 'Vizitka', titleRu: 'Визитка', titleEn: 'Business card' },
  { src: 'images/portfolio/yorliq-6.jpg', titleUz: "Mahsulot yorlig'i", titleRu: 'Этикетка продукции', titleEn: 'Product label' },
  { src: 'images/portfolio/yorliq-7.jpg', titleUz: "Mahsulot yorlig'i", titleRu: 'Этикетка продукции', titleEn: 'Product label' }
];
