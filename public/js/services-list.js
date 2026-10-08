'use strict';

/*
 * Xizmatlar sahifasidagi yo'nalishlar va mahsulotlar ro'yxati.
 * Har bir mahsulot: [o'zbekcha, ruscha, inglizcha, Unsplash surat ID].
 * Surat: https://images.unsplash.com/photo-<ID> (Unsplash litsenziyasi — bepul).
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
      ['Vizitka', 'Визитки', 'Business cards', '1628891439478-c613e85af7d6'],
      ['Firma blanki', 'Фирменные бланки', 'Letterheads', '1520764588094-8fc067746a8e'],
      ['Konvert', 'Конверты', 'Envelopes', '1649019489428-70f505daacd6'],
      ['Papka', 'Папки', 'Folders', '1654610285929-a1b63280dd60'],
      ['Bloknot', 'Блокноты', 'Notepads', '1698067942087-53f552fe2f59'],
      ['Kundalik (yejednevnik)', 'Ежедневники', 'Planners', '1513128034602-7814ccaddd4e'],
      ['Devoriy kalendar', 'Настенные календари', 'Wall calendars', '1578625155481-7bc40a6481b6'],
      ['Stol kalendari', 'Настольные календари', 'Desk calendars', '1611988615248-5d4f0b9ac31e'],
      ['Kvitansiya kitobchasi', 'Квитанционные книжки', 'Receipt books', '1545941962-1b6654eb8072'],
      ['Sertifikat', 'Сертификаты', 'Certificates', '1589330694653-ded6df03f754'],
      ['Diplom va faxriy yorliq', 'Дипломы и грамоты', 'Diplomas and awards', '1627556704302-624286467c65'],
      ['Beyjik', 'Бейджи', 'Name badges', '1781559877355-48eaba6a19a0'],
      ['Yopishqoq qog\'ozchalar', 'Стикеры для заметок', 'Sticky notes', '1580934174026-8142803ebb5b']
    ]
  },
  {
    id: 'adprint', icon: 'megaphone', hue: '#db2777',
    uz: 'Reklama poligrafiyasi', ru: 'Рекламная полиграфия', en: 'Promotional print',
    items: [
      ['Flayer', 'Флаеры', 'Flyers', '1634833650314-ed773bcc5b23'],
      ['Listovka', 'Листовки', 'Leaflets', '1695634621145-9133286e0247'],
      ['Buklet', 'Буклеты', 'Booklets', '1591951425600-d09958978584'],
      ['Yevrobuklet', 'Евробуклеты', 'Tri-fold brochures', '1695634281254-e94a29d234c0'],
      ['Katalog', 'Каталоги', 'Catalogues', '1542125387-c71274d94f0a'],
      ['Broshyura', 'Брошюры', 'Brochures', '1695634281421-7a51001273ef'],
      ['Jurnal', 'Журналы', 'Magazines', '1515891396453-6d7e56096a39'],
      ['Plakat va afisha', 'Плакаты и афиши', 'Posters', '1543487945-139a97f387d5'],
      ['Menyu', 'Меню', 'Menus', '1731412235213-678ada5cd36b'],
      ['Prays-list', 'Прайс-листы', 'Price lists', '1571907483086-3c0ea40cc16d'],
      ['Otkritka', 'Открытки', 'Postcards', '1742415888176-7de4e0b250cd'],
      ['Taklifnoma', 'Пригласительные', 'Invitations', '1632610992723-82d7c212f6d7'],
      ['Sovg\'a sertifikati', 'Подарочные сертификаты', 'Gift vouchers', '1545785028-23ee5937cf69'],
      ['Chegirma kartasi', 'Дисконтные карты', 'Discount cards', '1597463330912-eb868206b68e'],
      ['Xatcho\'p (zakladka)', 'Закладки', 'Bookmarks', '1743482709788-8cb9d9779816'],
      ['Eshik ilgichi (dorxenger)', 'Дорхенгеры', 'Door hangers', '1780908725255-775116ad6cc6'],
      ['Stol tentkartochkasi', 'Тейбл-тенты', 'Table tents', '1576707769315-01a7474de445']
    ]
  },
  {
    id: 'large', icon: 'image', hue: '#7c3aed',
    uz: 'Katta formatli bosma', ru: 'Широкоформатная печать', en: 'Large-format printing',
    items: [
      ['Banner', 'Баннеры', 'Banners', '1559613671-dfe2fb6a7680'],
      ['Setkali banner', 'Баннерная сетка', 'Mesh banners', '1762791952347-a2297abf582f'],
      ['Orakal (plyonka)', 'Оракал (плёнка)', 'Self-adhesive vinyl', '1774803543112-828c3ac44cea'],
      ['Perforirlangan plyonka', 'Перфорированная плёнка', 'Perforated window film', '1775496230770-d379e89b9e7e'],
      ['Roll-up', 'Ролл-ап', 'Roll-up stands', '1712903276145-df36556f4ed0'],
      ['X-banner (pauk)', 'X-баннер (паук)', 'X-banners', '1762325393954-5300a6e35f5b'],
      ['Press-devor', 'Пресс-волл', 'Press walls', '1770274484406-09405c9c01df'],
      ['Pop-up stend', 'Поп-ап стенд', 'Pop-up stands', '1632383380175-812d44ec112b'],
      ['Holstga bosma', 'Печать на холсте', 'Canvas prints', '1638430323177-8cb2d1febb0c'],
      ['Fotoboy', 'Фотообои', 'Photo wallpaper', '1642369073424-a98bf968b5d3'],
      ['Interyer bosmasi', 'Интерьерная печать', 'Interior prints', '1716703433523-4f11cc8a12dc'],
      ['Pol stikerlari', 'Напольные стикеры', 'Floor graphics', '1609361529160-e253ee7da67d']
    ]
  },
  {
    id: 'outdoor', icon: 'signpost', hue: '#ea580c',
    uz: 'Tashqi reklama', ru: 'Наружная реклама', en: 'Outdoor advertising',
    items: [
      ['Peshtaxta (vyveska)', 'Вывески', 'Shop signs', '1472851294608-062f824d29cc'],
      ['Hajmli harflar', 'Объёмные буквы', '3D letters', '1502739423516-a7da6332f56f'],
      ['Lightbox', 'Лайтбоксы', 'Lightboxes', '1496449903678-68ddcb189a24'],
      ['Shtender', 'Штендеры', 'A-frame signs', '1775742945898-ec8b18e8a408'],
      ['Bilbord', 'Билборды', 'Billboards', '1533069027836-fa937181a8ce'],
      ['Tablichka', 'Таблички', 'Plaques and signs', '1580191947416-62d35a55e71d'],
      ['Yo\'l ko\'rsatkichlari', 'Навигационные указатели', 'Wayfinding signs', '1660129499804-5aa4fdbe2541'],
      ['Vitrina bezagi', 'Оформление витрин', 'Shop window graphics', '1528698827591-e19ccd7bc23d'],
      ['Avtomobil brendlash', 'Брендирование авто', 'Vehicle branding', '1650554764451-11b3e7ba5c2d'],
      ['Ko\'cha bannerlari', 'Уличные растяжки', 'Street banners', '1773720262448-9c764efbb178']
    ]
  },
  {
    id: 'pack', icon: 'box', hue: '#059669',
    uz: 'Qadoq va yorliqlar', ru: 'Упаковка и этикетки', en: 'Packaging and labels',
    items: [
      ['Yorliq (etiketka)', 'Этикетки', 'Product labels', '1638688569176-5b6db19f9d2a'],
      ['Stiker', 'Стикеры', 'Stickers', '1625768376503-68d2495d78c5'],
      ['Rulonli yorliq', 'Рулонные этикетки', 'Roll labels', '1540908187087-eeabb5040af5'],
      ['Qog\'oz paket', 'Бумажные пакеты', 'Paper bags', '1760565030346-4b947220fe3a'],
      ['Kraft paket', 'Крафт-пакеты', 'Kraft bags', '1616429368325-d5d7542b0ec3'],
      ['Brendli quti', 'Брендированные коробки', 'Branded boxes', '1577705998148-6da4f3963bc8'],
      ['Karton qadoq', 'Картонная упаковка', 'Cardboard packaging', '1656543802898-41c8c46683a7'],
      ['Shopper (mato sumka)', 'Шопперы', 'Tote bags', '1574365569389-a10d488ca3fb'],
      ['Kiyim birkasi', 'Бирки для одежды', 'Clothing tags', '1698932646779-916299619ad2'],
      ['Logotipli skotch', 'Скотч с логотипом', 'Branded tape', '1536356915696-c6bf1c01da46'],
      ['Qog\'oz stakan', 'Бумажные стаканы', 'Paper cups', '1598908314732-07113901949e'],
      ['Pochta konverti', 'Почтовые конверты', 'Mailer envelopes', '1627618998627-70a92a874cc2']
    ]
  },
  {
    id: 'events', icon: 'flag', hue: '#dc2626',
    uz: 'Bayroq va tadbirlar', ru: 'Флаги и мероприятия', en: 'Flags and events',
    items: [
      ['Stol bayrog\'i', 'Настольные флажки', 'Desk flags', '1758138118569-c23a62506a22'],
      ['Parus bayroq', 'Флаг-парус', 'Feather flags', '1760976396330-69046d907544'],
      ['Konus bayroq', 'Флаг-конус', 'Teardrop flags', '1641143216894-f3f2c508a1ad'],
      ['Ko\'cha bayrog\'i', 'Уличные флаги', 'Outdoor flags', '1645705315654-019e91990d4f'],
      ['Vimpel', 'Вымпелы', 'Pennants', '1492152587635-d4eec94ee072'],
      ['Logotipli lenta', 'Лента с логотипом', 'Branded ribbon', '1777566310347-83461871d27e'],
      ['Beyjik lentasi (lanyard)', 'Ланъярды', 'Lanyards', '1704269523788-f2bb9885e583'],
      ['Tadbir bilaguzugi', 'Браслеты для мероприятий', 'Event wristbands', '1787586044775-137de0e3aa93'],
      ['Chipta va kupon', 'Билеты и купоны', 'Tickets and coupons', '1715520928476-cd350276d96e']
    ]
  },
  {
    id: 'gifts', icon: 'gift', hue: '#d97706',
    uz: 'Suvenir va brending', ru: 'Сувениры и брендинг', en: 'Souvenirs and branding',
    items: [
      ['Ruchka', 'Ручки', 'Pens', '1583485088034-697b5bc54ccd'],
      ['Qalam', 'Карандаши', 'Pencils', '1595584354232-f07d525d87c1'],
      ['Krujka', 'Кружки', 'Mugs', '1616241673111-508b4662c707'],
      ['Termos', 'Термосы', 'Thermos flasks', '1613645540553-d98859ffeec5'],
      ['Fleshka', 'Флешки', 'USB drives', '1587145820098-23e484e69816'],
      ['Brelok', 'Брелоки', 'Keychains', '1687363714985-990685339050'],
      ['Magnit', 'Магниты', 'Fridge magnets', '1487770931682-b80013ed9cc9'],
      ['Znachok', 'Значки', 'Pin badges', '1521249692263-e0659c60326e'],
      ['Soyabon', 'Зонты', 'Umbrellas', '1499678450342-29ebee16d1ab'],
      ['Sichqoncha gilamchasi', 'Коврики для мыши', 'Mouse pads', '1702561667800-2c49b0182229'],
      ['Devoriy soat', 'Настенные часы', 'Wall clocks', '1563861826100-9cb868fdbe1c'],
      ['Sovg\'a to\'plami', 'Подарочные наборы', 'Gift sets', '1513201099705-a9746e1e201f'],
      ['Penal', 'Пеналы', 'Pencil cases', '1632822300275-9867abf24bbe'],
      ['Pazl', 'Пазлы', 'Jigsaw puzzles', '1730804518415-75297e8d2a41']
    ]
  },
  {
    id: 'apparel', icon: 'shirt', hue: '#0891b2',
    uz: 'Kiyimga bosma', ru: 'Печать на одежде', en: 'Apparel printing',
    items: [
      ['Futbolka', 'Футболки', 'T-shirts', '1773525912489-9e04df48f639'],
      ['Polo', 'Поло', 'Polo shirts', '1586363129094-d7a38564fae1'],
      ['Xudi', 'Худи', 'Hoodies', '1620799140188-3b2a02fd9a77'],
      ['Svitshot', 'Свитшоты', 'Sweatshirts', '1620799140408-edc6dcb6d633'],
      ['Kepka', 'Кепки', 'Caps', '1588850561407-ed78c282e89b'],
      ['Fartuk', 'Фартуки', 'Aprons', '1729774091725-13e0ecea95fe'],
      ['Ish kiyimi', 'Спецодежда', 'Workwear', '1681812508281-7589b75b2e46'],
      ['Kurtka va jilet', 'Куртки и жилеты', 'Jackets and vests', '1593032288331-711b99d4fa74']
    ]
  },
  {
    id: 'stamps', icon: 'stamp', hue: '#475569',
    uz: 'Muhr va shtamplar', ru: 'Печати и штампы', en: 'Stamps and seals',
    items: [
      ['Muhr', 'Печати', 'Company seals', '1619418602850-35ad20aa1700'],
      ['Shtamp', 'Штампы', 'Rubber stamps', '1790949242560-44106f36b0f1'],
      ['Faksimile', 'Факсимиле', 'Signature stamps', '1774891937497-96df6a794bd9'],
      ['Sanali shtamp (dater)', 'Датеры', 'Date stamps', '1562330094-4a3730591558'],
      ['Cho\'ntak muhri', 'Карманные печати', 'Pocket stamps', '1774891937400-b5e32f719fae']
    ]
  },
  {
    id: 'design', icon: 'penTool', hue: '#9333ea',
    uz: 'Dizayn xizmatlari', ru: 'Дизайн-услуги', en: 'Design services',
    items: [
      ['Logotip', 'Логотип', 'Logo design', '1748326650737-33500fdfda30'],
      ['Firma uslubi', 'Фирменный стиль', 'Corporate identity', '1633533452148-a9657d2c9a5f'],
      ['Brendbuk', 'Брендбук', 'Brand book', '1645658043538-fc2bb1702cfe'],
      ['Qadoq dizayni', 'Дизайн упаковки', 'Packaging design', '1617825295690-28ae56c56135'],
      ['Yorliq dizayni', 'Дизайн этикеток', 'Label design', '1634449278077-820aacbf6aa4'],
      ['Maket tayyorlash', 'Подготовка макетов', 'Print-ready artwork', '1626785774573-4b799315345d'],
      ['SMM dizayn', 'SMM-дизайн', 'Social media design', '1683721003111-070bcc053d8b'],
      ['Menyu dizayni', 'Дизайн меню', 'Menu design', '1557499305-bd68d0ad468d'],
      ['Katalog dizayni', 'Дизайн каталогов', 'Catalogue design', '1647668068108-748576356aaf']
    ]
  },
  {
    id: 'finish', icon: 'scissors', hue: '#0d9488',
    uz: 'Bosmadan keyingi ishlov', ru: 'Постпечатная обработка', en: 'Print finishing',
    items: [
      ['Laminatsiya', 'Ламинирование', 'Lamination', '1637070155805-e6fbee6ec2cf'],
      ['UV-lak', 'УФ-лак', 'UV varnish', '1718670013921-2f144aba173a'],
      ['Folga bilan bosish', 'Тиснение фольгой', 'Foil stamping', '1545873509-33e944ca7655'],
      ['Bo\'rtma bosma (kongrev)', 'Конгрев', 'Embossing', '1713224878100-456d41f5264d'],
      ['Konturli kesish', 'Плоттерная резка', 'Contour cutting', '1693031630146-568e2f72db0e'],
      ['Lazerli kesish', 'Лазерная резка', 'Laser cutting', '1738162837451-2041c1418f54'],
      ['Shtans bilan kesish', 'Вырубка', 'Die cutting', '1693658353360-10f7326e7113'],
      ['Bigovka', 'Биговка', 'Scoring', '1695041713048-fe46246ab740'],
      ['Perforatsiya', 'Перфорация', 'Perforation', '1683725181154-494ea373dab4'],
      ['Prujinali muqova', 'Переплёт на пружину', 'Wire-o binding', '1773453219454-9940ac4256cf'],
      ['Skobali tikish', 'Скрепление на скобу', 'Saddle stitching', '1525247663235-1d5a3ae627fd'],
      ['Raqamlash', 'Нумерация', 'Numbering', '1578575436955-ef29da568c6c']
    ]
  }
];
