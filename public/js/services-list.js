'use strict';

/*
 * Xizmatlar sahifasidagi yo'nalishlar va mahsulotlar ro'yxati.
 * Har bir mahsulot: [o'zbekcha, ruscha, inglizcha].
 *
 * Yangi mahsulot qo'shish — kerakli bo'lim ichidagi items ro'yxatiga bitta
 * satr qo'shing. Biror xizmat ko'rsatilmasa, satrini o'chiring.
 * hue — bo'lim kartochkalarining rangi, icon — js/icons.js dagi nom.
 */
const SERVICE_GROUPS = [
  {
    id: 'office', icon: 'briefcase', hue: '#2563eb',
    uz: 'Ofis poligrafiyasi', ru: 'Офисная полиграфия', en: 'Office printing',
    items: [
      ['Vizitka', 'Визитки', 'Business cards'],
      ['Firma blanki', 'Фирменные бланки', 'Letterheads'],
      ['Konvert', 'Конверты', 'Envelopes'],
      ['Papka', 'Папки', 'Folders'],
      ['Bloknot', 'Блокноты', 'Notepads'],
      ['Kundalik (yejednevnik)', 'Ежедневники', 'Planners'],
      ['Devoriy kalendar', 'Настенные календари', 'Wall calendars'],
      ['Stol kalendari', 'Настольные календари', 'Desk calendars'],
      ['Kvitansiya kitobchasi', 'Квитанционные книжки', 'Receipt books'],
      ['Sertifikat', 'Сертификаты', 'Certificates'],
      ['Diplom va faxriy yorliq', 'Дипломы и грамоты', 'Diplomas and awards'],
      ['Beyjik', 'Бейджи', 'Name badges'],
      ['Yopishqoq qog\'ozchalar', 'Стикеры для заметок', 'Sticky notes']
    ]
  },
  {
    id: 'adprint', icon: 'megaphone', hue: '#db2777',
    uz: 'Reklama poligrafiyasi', ru: 'Рекламная полиграфия', en: 'Promotional print',
    items: [
      ['Flayer', 'Флаеры', 'Flyers'],
      ['Listovka', 'Листовки', 'Leaflets'],
      ['Buklet', 'Буклеты', 'Booklets'],
      ['Yevrobuklet', 'Евробуклеты', 'Tri-fold brochures'],
      ['Katalog', 'Каталоги', 'Catalogues'],
      ['Broshyura', 'Брошюры', 'Brochures'],
      ['Jurnal', 'Журналы', 'Magazines'],
      ['Plakat va afisha', 'Плакаты и афиши', 'Posters'],
      ['Menyu', 'Меню', 'Menus'],
      ['Prays-list', 'Прайс-листы', 'Price lists'],
      ['Otkritka', 'Открытки', 'Postcards'],
      ['Taklifnoma', 'Пригласительные', 'Invitations'],
      ['Sovg\'a sertifikati', 'Подарочные сертификаты', 'Gift vouchers'],
      ['Chegirma kartasi', 'Дисконтные карты', 'Discount cards'],
      ['Xatcho\'p (zakladka)', 'Закладки', 'Bookmarks'],
      ['Eshik ilgichi (dorxenger)', 'Дорхенгеры', 'Door hangers'],
      ['Stol tentkartochkasi', 'Тейбл-тенты', 'Table tents']
    ]
  },
  {
    id: 'large', icon: 'image', hue: '#7c3aed',
    uz: 'Katta formatli bosma', ru: 'Широкоформатная печать', en: 'Large-format printing',
    items: [
      ['Banner', 'Баннеры', 'Banners'],
      ['Setkali banner', 'Баннерная сетка', 'Mesh banners'],
      ['Orakal (plyonka)', 'Оракал (плёнка)', 'Self-adhesive vinyl'],
      ['Perforirlangan plyonka', 'Перфорированная плёнка', 'Perforated window film'],
      ['Roll-up', 'Ролл-ап', 'Roll-up stands'],
      ['X-banner (pauk)', 'X-баннер (паук)', 'X-banners'],
      ['Press-devor', 'Пресс-волл', 'Press walls'],
      ['Pop-up stend', 'Поп-ап стенд', 'Pop-up stands'],
      ['Holstga bosma', 'Печать на холсте', 'Canvas prints'],
      ['Fotoboy', 'Фотообои', 'Photo wallpaper'],
      ['Interyer bosmasi', 'Интерьерная печать', 'Interior prints'],
      ['Pol stikerlari', 'Напольные стикеры', 'Floor graphics']
    ]
  },
  {
    id: 'outdoor', icon: 'signpost', hue: '#ea580c',
    uz: 'Tashqi reklama', ru: 'Наружная реклама', en: 'Outdoor advertising',
    items: [
      ['Peshtaxta (vyveska)', 'Вывески', 'Shop signs'],
      ['Hajmli harflar', 'Объёмные буквы', '3D letters'],
      ['Lightbox', 'Лайтбоксы', 'Lightboxes'],
      ['Shtender', 'Штендеры', 'A-frame signs'],
      ['Bilbord', 'Билборды', 'Billboards'],
      ['Tablichka', 'Таблички', 'Plaques and signs'],
      ['Yo\'l ko\'rsatkichlari', 'Навигационные указатели', 'Wayfinding signs'],
      ['Vitrina bezagi', 'Оформление витрин', 'Shop window graphics'],
      ['Avtomobil brendlash', 'Брендирование авто', 'Vehicle branding'],
      ['Ko\'cha bannerlari', 'Уличные растяжки', 'Street banners']
    ]
  },
  {
    id: 'pack', icon: 'box', hue: '#059669',
    uz: 'Qadoq va yorliqlar', ru: 'Упаковка и этикетки', en: 'Packaging and labels',
    items: [
      ['Yorliq (etiketka)', 'Этикетки', 'Product labels'],
      ['Stiker', 'Стикеры', 'Stickers'],
      ['Rulonli yorliq', 'Рулонные этикетки', 'Roll labels'],
      ['Qog\'oz paket', 'Бумажные пакеты', 'Paper bags'],
      ['Kraft paket', 'Крафт-пакеты', 'Kraft bags'],
      ['Brendli quti', 'Брендированные коробки', 'Branded boxes'],
      ['Karton qadoq', 'Картонная упаковка', 'Cardboard packaging'],
      ['Shopper (mato sumka)', 'Шопперы', 'Tote bags'],
      ['Kiyim birkasi', 'Бирки для одежды', 'Clothing tags'],
      ['Logotipli skotch', 'Скотч с логотипом', 'Branded tape'],
      ['Qog\'oz stakan', 'Бумажные стаканы', 'Paper cups'],
      ['Pochta konverti', 'Почтовые конверты', 'Mailer envelopes']
    ]
  },
  {
    id: 'events', icon: 'flag', hue: '#dc2626',
    uz: 'Bayroq va tadbirlar', ru: 'Флаги и мероприятия', en: 'Flags and events',
    items: [
      ['Stol bayrog\'i', 'Настольные флажки', 'Desk flags'],
      ['Parus bayroq', 'Флаг-парус', 'Feather flags'],
      ['Konus bayroq', 'Флаг-конус', 'Teardrop flags'],
      ['Ko\'cha bayrog\'i', 'Уличные флаги', 'Outdoor flags'],
      ['Vimpel', 'Вымпелы', 'Pennants'],
      ['Logotipli lenta', 'Лента с логотипом', 'Branded ribbon'],
      ['Beyjik lentasi (lanyard)', 'Ланъярды', 'Lanyards'],
      ['Tadbir bilaguzugi', 'Браслеты для мероприятий', 'Event wristbands'],
      ['Chipta va kupon', 'Билеты и купоны', 'Tickets and coupons']
    ]
  },
  {
    id: 'gifts', icon: 'gift', hue: '#d97706',
    uz: 'Suvenir va brending', ru: 'Сувениры и брендинг', en: 'Souvenirs and branding',
    items: [
      ['Ruchka', 'Ручки', 'Pens'],
      ['Qalam', 'Карандаши', 'Pencils'],
      ['Krujka', 'Кружки', 'Mugs'],
      ['Termos', 'Термосы', 'Thermos flasks'],
      ['Fleshka', 'Флешки', 'USB drives'],
      ['Brelok', 'Брелоки', 'Keychains'],
      ['Magnit', 'Магниты', 'Fridge magnets'],
      ['Znachok', 'Значки', 'Pin badges'],
      ['Soyabon', 'Зонты', 'Umbrellas'],
      ['Sichqoncha gilamchasi', 'Коврики для мыши', 'Mouse pads'],
      ['Devoriy soat', 'Настенные часы', 'Wall clocks'],
      ['Sovg\'a to\'plami', 'Подарочные наборы', 'Gift sets'],
      ['Penal', 'Пеналы', 'Pencil cases'],
      ['Pazl', 'Пазлы', 'Jigsaw puzzles']
    ]
  },
  {
    id: 'apparel', icon: 'shirt', hue: '#0891b2',
    uz: 'Kiyimga bosma', ru: 'Печать на одежде', en: 'Apparel printing',
    items: [
      ['Futbolka', 'Футболки', 'T-shirts'],
      ['Polo', 'Поло', 'Polo shirts'],
      ['Xudi', 'Худи', 'Hoodies'],
      ['Svitshot', 'Свитшоты', 'Sweatshirts'],
      ['Kepka', 'Кепки', 'Caps'],
      ['Fartuk', 'Фартуки', 'Aprons'],
      ['Ish kiyimi', 'Спецодежда', 'Workwear'],
      ['Kurtka va jilet', 'Куртки и жилеты', 'Jackets and vests']
    ]
  },
  {
    id: 'stamps', icon: 'stamp', hue: '#475569',
    uz: 'Muhr va shtamplar', ru: 'Печати и штампы', en: 'Stamps and seals',
    items: [
      ['Muhr', 'Печати', 'Company seals'],
      ['Shtamp', 'Штампы', 'Rubber stamps'],
      ['Faksimile', 'Факсимиле', 'Signature stamps'],
      ['Sanali shtamp (dater)', 'Датеры', 'Date stamps'],
      ['Cho\'ntak muhri', 'Карманные печати', 'Pocket stamps']
    ]
  },
  {
    id: 'design', icon: 'penTool', hue: '#9333ea',
    uz: 'Dizayn xizmatlari', ru: 'Дизайн-услуги', en: 'Design services',
    items: [
      ['Logotip', 'Логотип', 'Logo design'],
      ['Firma uslubi', 'Фирменный стиль', 'Corporate identity'],
      ['Brendbuk', 'Брендбук', 'Brand book'],
      ['Qadoq dizayni', 'Дизайн упаковки', 'Packaging design'],
      ['Yorliq dizayni', 'Дизайн этикеток', 'Label design'],
      ['Maket tayyorlash', 'Подготовка макетов', 'Print-ready artwork'],
      ['SMM dizayn', 'SMM-дизайн', 'Social media design'],
      ['Menyu dizayni', 'Дизайн меню', 'Menu design'],
      ['Katalog dizayni', 'Дизайн каталогов', 'Catalogue design']
    ]
  },
  {
    id: 'finish', icon: 'scissors', hue: '#0d9488',
    uz: 'Bosmadan keyingi ishlov', ru: 'Постпечатная обработка', en: 'Print finishing',
    items: [
      ['Laminatsiya', 'Ламинирование', 'Lamination'],
      ['UV-lak', 'УФ-лак', 'UV varnish'],
      ['Folga bilan bosish', 'Тиснение фольгой', 'Foil stamping'],
      ['Bo\'rtma bosma (kongrev)', 'Конгрев', 'Embossing'],
      ['Konturli kesish', 'Плоттерная резка', 'Contour cutting'],
      ['Lazerli kesish', 'Лазерная резка', 'Laser cutting'],
      ['Shtans bilan kesish', 'Вырубка', 'Die cutting'],
      ['Bigovka', 'Биговка', 'Scoring'],
      ['Perforatsiya', 'Перфорация', 'Perforation'],
      ['Prujinali muqova', 'Переплёт на пружину', 'Wire-o binding'],
      ['Skobali tikish', 'Скрепление на скобу', 'Saddle stitching'],
      ['Raqamlash', 'Нумерация', 'Numbering']
    ]
  }
];
