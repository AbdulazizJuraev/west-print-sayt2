'use strict';

/*
 * Xizmatlar sahifasidagi yo'nalishlar va mahsulotlar ro'yxati.
 * Har bir mahsulot: [o'zbekcha, ruscha, inglizcha, surat nomi].
 * Surat: public/images/products/<nomi>.webp (1000px) va thumbs/<nomi>.webp (400px).
 *
 * Yangi mahsulot qo'shish — kerakli bo'lim ichidagi items ro'yxatiga bitta
 * satr qo'shing. Biror xizmat ko'rsatilmasa, satrini o'chiring.
 * hue — bo'lim kartochkalarining rangi, icon — js/icons.js dagi nom.
 * noLogo: true — plitkalarda "Sizning logo bilan" yozuvi chiqmaydi
 * (dizayn va ishlov kabi xizmatlar uchun).
 */
const SERVICE_GROUPS = [
  {
    id: 'office', icon: 'briefcase', hue: '#2563eb',
    uz: 'Ofis poligrafiyasi', ru: 'Офисная полиграфия', en: 'Office printing',
    items: [
      ['Vizitka', 'Визитки', 'Business cards', 'vizitka'],
      ['Firma blanki', 'Фирменные бланки', 'Letterheads', 'firma-blanki'],
      ['Konvert', 'Конверты', 'Envelopes', 'konvert'],
      ['Papka', 'Папки', 'Folders', 'papka'],
      ['Bloknot', 'Блокноты', 'Notepads', 'bloknot'],
      ['Kundalik (yejednevnik)', 'Ежедневники', 'Planners', 'kundalik-yejednevnik'],
      ['Devoriy kalendar', 'Настенные календари', 'Wall calendars', 'devoriy-kalendar'],
      ['Stol kalendari', 'Настольные календари', 'Desk calendars', 'stol-kalendari'],
      ['Kvitansiya kitobchasi', 'Квитанционные книжки', 'Receipt books', 'kvitansiya-kitobchasi'],
      ['Sertifikat', 'Сертификаты', 'Certificates', 'sertifikat'],
      ['Diplom va faxriy yorliq', 'Дипломы и грамоты', 'Diplomas and awards', 'diplom-va-faxriy-yorliq'],
      ['Beyjik', 'Бейджи', 'Name badges', 'beyjik'],
      ['Yopishqoq qog\'ozchalar', 'Стикеры для заметок', 'Sticky notes', 'yopishqoq-qog-ozchalar']
    ]
  },
  {
    id: 'adprint', icon: 'megaphone', hue: '#db2777',
    uz: 'Reklama poligrafiyasi', ru: 'Рекламная полиграфия', en: 'Promotional print',
    items: [
      ['Flayer', 'Флаеры', 'Flyers', 'flayer'],
      ['Listovka', 'Листовки', 'Leaflets', 'listovka'],
      ['Buklet', 'Буклеты', 'Booklets', 'buklet'],
      ['Yevrobuklet', 'Евробуклеты', 'Tri-fold brochures', 'yevrobuklet'],
      ['Katalog', 'Каталоги', 'Catalogues', 'katalog'],
      ['Broshyura', 'Брошюры', 'Brochures', 'broshyura'],
      ['Jurnal', 'Журналы', 'Magazines', 'jurnal'],
      ['Plakat va afisha', 'Плакаты и афиши', 'Posters', 'plakat-va-afisha'],
      ['Menyu', 'Меню', 'Menus', 'menyu'],
      ['Prays-list', 'Прайс-листы', 'Price lists', 'prays-list'],
      ['Otkritka', 'Открытки', 'Postcards', 'otkritka'],
      ['Taklifnoma', 'Пригласительные', 'Invitations', 'taklifnoma'],
      ['Sovg\'a sertifikati', 'Подарочные сертификаты', 'Gift vouchers', 'sovg-a-sertifikati'],
      ['Chegirma kartasi', 'Дисконтные карты', 'Discount cards', 'chegirma-kartasi'],
      ['Xatcho\'p (zakladka)', 'Закладки', 'Bookmarks', 'xatcho-p-zakladka'],
      ['Eshik ilgichi (dorxenger)', 'Дорхенгеры', 'Door hangers', 'eshik-ilgichi-dorxenger'],
      ['Stol tentkartochkasi', 'Тейбл-тенты', 'Table tents', 'stol-tentkartochkasi']
    ]
  },
  {
    id: 'large', icon: 'image', hue: '#7c3aed',
    uz: 'Katta formatli bosma', ru: 'Широкоформатная печать', en: 'Large-format printing',
    items: [
      ['Banner', 'Баннеры', 'Banners', 'banner'],
      ['Setkali banner', 'Баннерная сетка', 'Mesh banners', 'setkali-banner'],
      ['Orakal (plyonka)', 'Оракал (плёнка)', 'Self-adhesive vinyl', 'orakal-plyonka'],
      ['Perforirlangan plyonka', 'Перфорированная плёнка', 'Perforated window film', 'perforirlangan-plyonka'],
      ['Roll-up', 'Ролл-ап', 'Roll-up stands', 'roll-up'],
      ['X-banner (pauk)', 'X-баннер (паук)', 'X-banners', 'x-banner-pauk'],
      ['Press-devor', 'Пресс-волл', 'Press walls', 'press-devor'],
      ['Pop-up stend', 'Поп-ап стенд', 'Pop-up stands', 'pop-up-stend'],
      ['Holstga bosma', 'Печать на холсте', 'Canvas prints', 'holstga-bosma'],
      ['Interyer bosmasi', 'Интерьерная печать', 'Interior prints', 'interyer-bosmasi'],
      ['Pol stikerlari', 'Напольные стикеры', 'Floor graphics', 'pol-stikerlari']
    ]
  },
  {
    id: 'outdoor', icon: 'signpost', hue: '#ea580c',
    uz: 'Tashqi reklama', ru: 'Наружная реклама', en: 'Outdoor advertising',
    items: [
      ['Peshtaxta (vyveska)', 'Вывески', 'Shop signs', 'peshtaxta-vyveska'],
      ['Hajmli harflar', 'Объёмные буквы', '3D letters', 'hajmli-harflar'],
      ['Lightbox', 'Лайтбоксы', 'Lightboxes', 'lightbox'],
      ['Shtender', 'Штендеры', 'A-frame signs', 'shtender'],
      ['Bilbord', 'Билборды', 'Billboards', 'bilbord'],
      ['Tablichka', 'Таблички', 'Plaques and signs', 'tablichka'],
      ['Yo\'l ko\'rsatkichlari', 'Навигационные указатели', 'Wayfinding signs', 'yo-l-ko-rsatkichlari'],
      ['Vitrina bezagi', 'Оформление витрин', 'Shop window graphics', 'vitrina-bezagi'],
      ['Avtomobil brendlash', 'Брендирование авто', 'Vehicle branding', 'avtomobil-brendlash'],
      ['Ko\'cha bannerlari', 'Уличные растяжки', 'Street banners', 'ko-cha-bannerlari']
    ]
  },
  {
    id: 'pack', icon: 'box', hue: '#059669',
    uz: 'Qadoq va yorliqlar', ru: 'Упаковка и этикетки', en: 'Packaging and labels',
    items: [
      ['Yorliq (etiketka)', 'Этикетки', 'Product labels', 'yorliq-etiketka'],
      ['Stiker', 'Стикеры', 'Stickers', 'stiker'],
      ['Rulonli yorliq', 'Рулонные этикетки', 'Roll labels', 'rulonli-yorliq'],
      ['Qog\'oz paket', 'Бумажные пакеты', 'Paper bags', 'qog-oz-paket'],
      ['Kraft paket', 'Крафт-пакеты', 'Kraft bags', 'kraft-paket'],
      ['Brendli quti', 'Брендированные коробки', 'Branded boxes', 'brendli-quti'],
      ['Karton qadoq', 'Картонная упаковка', 'Cardboard packaging', 'karton-qadoq'],
      ['Shopper (mato sumka)', 'Шопперы', 'Tote bags', 'shopper-mato-sumka'],
      ['Kiyim birkasi', 'Бирки для одежды', 'Clothing tags', 'kiyim-birkasi'],
      ['Logotipli skotch', 'Скотч с логотипом', 'Branded tape', 'logotipli-skotch'],
      ['Qog\'oz stakan', 'Бумажные стаканы', 'Paper cups', 'qog-oz-stakan'],
      ['Pochta konverti', 'Почтовые конверты', 'Mailer envelopes', 'pochta-konverti']
    ]
  },
  {
    id: 'events', icon: 'flag', hue: '#dc2626',
    uz: 'Bayroq va tadbirlar', ru: 'Флаги и мероприятия', en: 'Flags and events',
    items: [
      ['Stol bayrog\'i', 'Настольные флажки', 'Desk flags', 'stol-bayrog-i'],
      ['Parus bayroq', 'Флаг-парус', 'Feather flags', 'parus-bayroq'],
      ['Konus bayroq', 'Флаг-конус', 'Teardrop flags', 'konus-bayroq'],
      ['Ko\'cha bayrog\'i', 'Уличные флаги', 'Outdoor flags', 'ko-cha-bayrog-i'],
      ['Vimpel', 'Вымпелы', 'Pennants', 'vimpel'],
      ['Logotipli lenta', 'Лента с логотипом', 'Branded ribbon', 'logotipli-lenta'],
      ['Beyjik lentasi (lanyard)', 'Ланъярды', 'Lanyards', 'beyjik-lentasi-lanyard'],
      ['Tadbir bilaguzugi', 'Браслеты для мероприятий', 'Event wristbands', 'tadbir-bilaguzugi'],
      ['Chipta va kupon', 'Билеты и купоны', 'Tickets and coupons', 'chipta-va-kupon']
    ]
  },
  {
    id: 'gifts', icon: 'gift', hue: '#d97706',
    uz: 'Suvenir va brending', ru: 'Сувениры и брендинг', en: 'Souvenirs and branding',
    items: [
      ['Ruchka', 'Ручки', 'Pens', 'ruchka'],
      ['Qalam', 'Карандаши', 'Pencils', 'qalam'],
      ['Krujka', 'Кружки', 'Mugs', 'krujka'],
      ['Termos', 'Термосы', 'Thermos flasks', 'termos'],
      ['Fleshka', 'Флешки', 'USB drives', 'fleshka'],
      ['Brelok', 'Брелоки', 'Keychains', 'brelok'],
      ['Magnit', 'Магниты', 'Fridge magnets', 'magnit'],
      ['Znachok', 'Значки', 'Pin badges', 'znachok'],
      ['Soyabon', 'Зонты', 'Umbrellas', 'soyabon'],
      ['Sichqoncha gilamchasi', 'Коврики для мыши', 'Mouse pads', 'sichqoncha-gilamchasi'],
      ['Devoriy soat', 'Настенные часы', 'Wall clocks', 'devoriy-soat'],
      ['Sovg\'a to\'plami', 'Подарочные наборы', 'Gift sets', 'sovg-a-to-plami'],
      ['Penal', 'Пеналы', 'Pencil cases', 'penal'],
      ['Pazl', 'Пазлы', 'Jigsaw puzzles', 'pazl']
    ]
  },
  {
    id: 'apparel', icon: 'shirt', hue: '#0891b2',
    uz: 'Kiyimga bosma', ru: 'Печать на одежде', en: 'Apparel printing',
    items: [
      ['Futbolka', 'Футболки', 'T-shirts', 'futbolka'],
      ['Polo', 'Поло', 'Polo shirts', 'polo'],
      ['Xudi', 'Худи', 'Hoodies', 'xudi'],
      ['Svitshot', 'Свитшоты', 'Sweatshirts', 'svitshot'],
      ['Kepka', 'Кепки', 'Caps', 'kepka'],
      ['Fartuk', 'Фартуки', 'Aprons', 'fartuk'],
      ['Ish kiyimi', 'Спецодежда', 'Workwear', 'ish-kiyimi'],
      ['Kurtka va jilet', 'Куртки и жилеты', 'Jackets and vests', 'kurtka-va-jilet']
    ]
  },
  {
    id: 'design', icon: 'penTool', hue: '#9333ea', noLogo: true,
    uz: 'Dizayn xizmatlari', ru: 'Дизайн-услуги', en: 'Design services',
    items: [
      ['Logotip', 'Логотип', 'Logo design', 'logotip'],
      ['Firma uslubi', 'Фирменный стиль', 'Corporate identity', 'firma-uslubi'],
      ['Brendbuk', 'Брендбук', 'Brand book', 'brendbuk'],
      ['Qadoq dizayni', 'Дизайн упаковки', 'Packaging design', 'qadoq-dizayni'],
      ['Yorliq dizayni', 'Дизайн этикеток', 'Label design', 'yorliq-dizayni'],
      ['Maket tayyorlash', 'Подготовка макетов', 'Print-ready artwork', 'maket-tayyorlash'],
      ['SMM dizayn', 'SMM-дизайн', 'Social media design', 'smm-dizayn'],
      ['Menyu dizayni', 'Дизайн меню', 'Menu design', 'menyu-dizayni'],
      ['Katalog dizayni', 'Дизайн каталогов', 'Catalogue design', 'katalog-dizayni']
    ]
  },
  {
    id: 'finish', icon: 'scissors', hue: '#0d9488', noLogo: true,
    uz: 'Bosmadan keyingi ishlov', ru: 'Постпечатная обработка', en: 'Print finishing',
    items: [
      ['Laminatsiya', 'Ламинирование', 'Lamination', 'laminatsiya'],
      ['UV-lak', 'УФ-лак', 'UV varnish', 'uv-lak'],
      ['Folga bilan bosish', 'Тиснение фольгой', 'Foil stamping', 'folga-bilan-bosish'],
      ['Bo\'rtma bosma (kongrev)', 'Конгрев', 'Embossing', 'bo-rtma-bosma-kongrev'],
      ['Konturli kesish', 'Плоттерная резка', 'Contour cutting', 'konturli-kesish'],
      ['Lazerli kesish', 'Лазерная резка', 'Laser cutting', 'lazerli-kesish'],
      ['Shtans bilan kesish', 'Вырубка', 'Die cutting', 'shtans-bilan-kesish'],
      ['Bigovka', 'Биговка', 'Scoring', 'bigovka'],
      ['Perforatsiya', 'Перфорация', 'Perforation', 'perforatsiya'],
      ['Prujinali muqova', 'Переплёт на пружину', 'Wire-o binding', 'prujinali-muqova'],
      ['Skobali tikish', 'Скрепление на скобу', 'Saddle stitching', 'skobali-tikish'],
      ['Raqamlash', 'Нумерация', 'Numbering', 'raqamlash']
    ]
  }
];
