'use strict';

/*
 * Xizmatlar sahifasidagi plitka bosilganda chiqadigan qisqa tavsiflar.
 * Kalit — mahsulotning inglizcha nomi (js/services-list.js dagi 3-ustun),
 * qiymat — [o'zbekcha, ruscha, inglizcha].
 */
const SERVICE_INFO = {
  // Ofis poligrafiyasi
  'Business cards': ["Kompaniya yoki shaxsiy vizitkalar: oddiy, laminatsiyali yoki maxsus qog'ozda — dizayndan tayyor tirajgacha.", 'Корпоративные и личные визитки на обычной, ламинированной или дизайнерской бумаге — от дизайна до тиража.', 'Corporate and personal business cards on standard, laminated or designer paper — from design to finished run.'],
  'Letterheads': ["Logotip va rekvizitlaringiz tushirilgan firma blanklari — rasmiy xatlar va hujjatlar uchun.", 'Фирменные бланки с логотипом и реквизитами — для официальных писем и документов.', 'Letterheads with your logo and company details for official letters and documents.'],
  'Envelopes': ["Logotipli konvertlar: Euro, C5, C4 va boshqa o'lchamlarda — xatlar va taklifnomalar uchun.", 'Конверты с логотипом форматов Евро, C5, C4 и других — для писем и приглашений.', 'Branded envelopes in DL, C5, C4 and other sizes for letters and invitations.'],
  'Folders': ["Hujjatlar uchun brendli papkalar — uchrashuvlar, taqdimotlar va shartnomalar uchun qulay.", 'Фирменные папки для документов — для встреч, презентаций и договоров.', 'Branded presentation folders for meetings, proposals and contracts.'],
  'Notepads': ["Logotipli bloknotlar: yelimlangan yoki prujinali, turli o'lcham va varaq sonida.", 'Блокноты с логотипом на клею или пружине, разных форматов и объёмов.', 'Branded notepads, glued or wire-bound, in different sizes and page counts.'],
  'Planners': ["Muqovasiga logotip tushirilgan kundaliklar — xodimlar va hamkorlar uchun foydali sovg'a.", 'Ежедневники с логотипом на обложке — полезный подарок сотрудникам и партнёрам.', 'Planners with your logo on the cover — a useful gift for staff and partners.'],
  'Wall calendars': ["Devoriy kalendarlar: bir varaqli, kvartal yoki oylik — butun yil davomida brendingizni eslatib turadi.", 'Настенные календари: листовые, квартальные или перекидные — напоминают о бренде весь год.', 'Wall calendars — single-sheet, quarterly or monthly — keep your brand in view all year.'],
  'Desk calendars': ["Stol kalendarlari (domik) — ofis va mijozlar stolida doim ko'rinib turadi.", 'Настольные календари-домики — всегда на виду в офисе и на столе клиента.', 'Tent-style desk calendars that stay in sight on office and client desks.'],
  'Receipt books': ["Raqamlangan kvitansiya va order kitobchalari — nusxa ko'chiruvchi qog'ozda ham.", 'Квитанционные и бланковые книжки с нумерацией, в том числе на самокопирующей бумаге.', 'Numbered receipt and order books, including carbonless copy paper.'],
  'Certificates': ["Sertifikat va guvohnomalar — chiroyli dizayn, sifatli qog'oz va kerak bo'lsa folga bilan.", 'Сертификаты и свидетельства — красивый дизайн, плотная бумага, при желании с фольгой.', 'Certificates with an elegant design on quality stock, with foil if you like.'],
  'Diplomas and awards': ["Diplom, faxriy yorliq va tashakkurnomalar — o'quv markazlari, tadbirlar va kompaniyalar uchun.", 'Дипломы, грамоты и благодарности — для учебных центров, мероприятий и компаний.', 'Diplomas, awards and letters of thanks for schools, events and companies.'],
  'Name badges': ["Xodimlar va tadbir ishtirokchilari uchun beyjiklar — qog'oz, plastik yoki magnitli.", 'Бейджи для сотрудников и участников мероприятий — бумажные, пластиковые или на магните.', 'Name badges for staff and event guests — paper, plastic or magnetic.'],
  'Sticky notes': ["Logotipli yopishqoq qog'ozchalar va bloklar — ofisda har kuni ishlatiladigan reklama.", 'Стикеры для заметок и блоки с логотипом — реклама, которой пользуются каждый день.', 'Branded sticky notes and memo pads — advertising people use every day.'],

  // Reklama poligrafiyasi
  'Flyers': ["Aksiya, yangi mahsulot va xizmatlar haqida flayerlar — kichik va katta tirajlarda.", 'Флаеры об акциях, новинках и услугах — малыми и большими тиражами.', 'Flyers for promotions, new products and services — in small and large runs.'],
  'Leaflets': ["Ko'chada va tadbirlarda tarqatish uchun listovkalar — arzon va tez tayyorlanadi.", 'Листовки для раздачи на улице и мероприятиях — недорого и быстро.', 'Leaflets for street and event distribution — affordable and quick to make.'],
  'Booklets': ["Kompaniya, xizmat va mahsulotlaringiz haqida bukletlar — bir yoki bir necha bukilishli.", 'Буклеты о компании, услугах и продукции — с одним или несколькими сгибами.', 'Booklets about your company, services and products, with one or more folds.'],
  'Tri-fold brochures': ["Uchga bukiladigan yevrobukletlar — A4 varaqda ixcham va ko'p ma'lumot.", 'Евробуклеты в три сложения — компактно и информативно на листе A4.', 'Tri-fold brochures — compact and informative on a single A4 sheet.'],
  'Catalogues': ["Mahsulotlar katalogi: dizayn, sahifalash va bosma — skobali yoki yelimli muqovada.", 'Каталоги продукции: дизайн, вёрстка и печать — на скобе или на клею.', 'Product catalogues: design, layout and printing, stapled or perfect-bound.'],
  'Brochures': ["Ko'p sahifali broshyuralar — taqdimot, yo'riqnoma va hisobotlar uchun.", 'Многостраничные брошюры — для презентаций, инструкций и отчётов.', 'Multi-page brochures for presentations, manuals and reports.'],
  'Magazines': ["Korporativ jurnal va nashrlar — sahifalashdan tortib tayyor tirajgacha.", 'Корпоративные журналы и издания — от вёрстки до готового тиража.', 'Corporate magazines and publications — from layout to the finished run.'],
  'Posters': ["A3, A2, A1 va undan katta formatdagi plakat va afishalar — yorqin va aniq ranglarda.", 'Плакаты и афиши форматов A3, A2, A1 и больше — яркие и чёткие цвета.', 'Posters in A3, A2, A1 and larger sizes with bright, sharp colours.'],
  'Menus': ["Kafe va restoranlar uchun menyular — laminatsiyali, papkali yoki bir varaqli.", 'Меню для кафе и ресторанов — ламинированные, в папке или листовые.', 'Menus for cafés and restaurants — laminated, in a folder or single-sheet.'],
  'Price lists': ["Do'kon va xizmatlar uchun prays-listlar hamda narx yorliqlari.", 'Прайс-листы и ценники для магазинов и сферы услуг.', 'Price lists and price tags for shops and service businesses.'],
  'Postcards': ["Bayram va tabrik otkritkalari — sizning dizayningiz yoki logotipingiz bilan.", 'Праздничные и поздравительные открытки — с вашим дизайном или логотипом.', 'Holiday and greeting cards with your design or logo.'],
  'Invitations': ["To'y, yubiley va korporativ tadbirlar uchun taklifnomalar — konverti bilan.", 'Пригласительные на свадьбу, юбилей и корпоративы — с конвертами.', 'Invitations for weddings, anniversaries and corporate events, with envelopes.'],
  'Gift vouchers': ["Do'kon, salon va xizmatlar uchun sovg'a sertifikatlari — raqamlash bilan.", 'Подарочные сертификаты для магазинов, салонов и услуг — с нумерацией.', 'Gift vouchers for shops, salons and services, with numbering.'],
  'Discount cards': ["Plastik chegirma va bonus kartalari — mijozlarni qaytib kelishga undaydi.", 'Пластиковые дисконтные и бонусные карты — помогают возвращать клиентов.', 'Plastic discount and loyalty cards that bring customers back.'],
  'Bookmarks': ["Kitob do'konlari, o'quv markazlari va tadbirlar uchun xatcho'plar.", 'Закладки для книжных магазинов, учебных центров и мероприятий.', 'Bookmarks for bookshops, schools and events.'],
  'Door hangers': ["Eshik tutqichiga ilinadigan kartochkalar — mehmonxona va yetkazib berish xizmatlari uchun.", 'Дорхенгеры на дверную ручку — для гостиниц и служб доставки.', 'Door hangers for hotels and delivery services.'],
  'Table tents': ["Kafe stollari uchun tentkartochkalar — aksiya, menyu va QR-kod uchun.", 'Тейбл-тенты для столов в кафе — для акций, меню и QR-кодов.', 'Table tents for café tables — for promotions, menus and QR codes.'],

  // Katta formatli bosma
  'Banners': ["Ichki va tashqi reklama uchun katta formatli bannerlar — har qanday o'lchamda.", 'Широкоформатные баннеры для внутренней и наружной рекламы — любого размера.', 'Large-format banners for indoor and outdoor advertising, in any size.'],
  'Mesh banners': ["Bino fasadlari uchun setkali bannerlar — shamolni o'tkazadi, katta maydonlarga mos.", 'Баннерная сетка для фасадов — пропускает ветер, подходит для больших площадей.', 'Mesh banners for building façades — wind-permeable and ideal for large areas.'],
  'Self-adhesive vinyl': ["O'zi yopishadigan plyonka (orakal)ga bosma — oyna, devor va jihozlar uchun.", 'Печать на самоклеящейся плёнке (оракал) — для стёкол, стен и оборудования.', 'Printing on self-adhesive vinyl for windows, walls and equipment.'],
  'Perforated window film': ["Perforirlangan plyonka — tashqaridan rasm ko'rinadi, ichkaridan esa oyna shaffof qoladi.", 'Перфорированная плёнка — снаружи видно изображение, изнутри стекло остаётся прозрачным.', 'Perforated window film — the image shows outside while the glass stays see-through inside.'],
  'Roll-up stands': ["Ko'chma roll-up stendlar — ko'rgazma, tadbir va ofis kirishlari uchun, sumkasi bilan.", 'Мобильные ролл-апы — для выставок, мероприятий и входа в офис, с сумкой.', 'Portable roll-up stands for exhibitions, events and lobbies, with a carry bag.'],
  'X-banners': ["Yengil va arzon X-banner (pauk) stendlari — tez yig'iladi va tashiladi.", 'Лёгкие и недорогие X-баннеры (пауки) — быстро собираются и переносятся.', 'Light, affordable X-banner stands that set up and travel easily.'],
  'Press walls': ["Tadbir va taqdimotlar uchun press-devorlar — logotiplar bilan fotozona.", 'Пресс-воллы для мероприятий и презентаций — фотозона с логотипами.', 'Press walls for events and launches — a photo backdrop with your logos.'],
  'Pop-up stands': ["Ko'rgazmalar uchun katta pop-up stendlar — tez yig'iladi va brendingizni ko'zga tashlaydi.", 'Поп-ап стенды для выставок — быстро собираются и выделяют ваш бренд.', 'Pop-up display stands for exhibitions — quick to assemble and eye-catching.'],
  'Canvas prints': ["Holstga sifatli bosma — interyer, sovg'a va ofis bezagi uchun ramkasi bilan.", 'Качественная печать на холсте с подрамником — для интерьера, подарков и офиса.', 'Quality canvas prints on a frame for interiors, gifts and offices.'],
  'Interior prints': ["Ofis, do'kon va kafelar uchun interyer bosmasi — devor, oyna va peregorodkalarga.", 'Интерьерная печать для офисов, магазинов и кафе — на стены, стёкла и перегородки.', 'Interior graphics for offices, shops and cafés — on walls, glass and partitions.'],
  'Floor graphics': ["Polga yopishtiriladigan stikerlar — yo'nalish, reklama va navbat belgilari uchun.", 'Напольные стикеры — для навигации, рекламы и разметки очереди.', 'Floor stickers for directions, advertising and queue markings.'],

  // Tashqi reklama
  'Shop signs': ["Do'kon, ofis va kafelar uchun peshtaxtalar (vyveskalar) — dizayndan o'rnatishgacha.", 'Вывески для магазинов, офисов и кафе — от дизайна до монтажа.', 'Signs for shops, offices and cafés — from design to installation.'],
  '3D letters': ["Hajmli harflar — yoritilgan yoki yoritilmagan, fasad va interyer uchun.", 'Объёмные буквы — с подсветкой или без, для фасада и интерьера.', 'Channel letters, illuminated or not, for façades and interiors.'],
  'Lightboxes': ["Yoritilgan lightbox reklama qutilari — kechasi ham yaxshi ko'rinadi.", 'Световые короба (лайтбоксы) — хорошо видны и в тёмное время суток.', 'Illuminated lightboxes that stay visible after dark.'],
  'A-frame signs': ["Do'kon va kafe oldiga qo'yiladigan shtenderlar — aksiya va menyu uchun.", 'Штендеры у входа в магазин или кафе — для акций и меню.', 'A-frame pavement signs for shop and café entrances — for offers and menus.'],
  'Billboards': ["Bilbordlar uchun katta formatli bosma — shahar ko'chalarida keng auditoriyaga.", 'Печать для билбордов — широкая аудитория на улицах города.', 'Billboard printing to reach a wide audience on city streets.'],
  'Plaques and signs': ["Kirish, kabinet va eshiklar uchun tablichkalar — akril, metall yoki plastikdan.", 'Таблички на вход, кабинеты и двери — из акрила, металла или пластика.', 'Door, office and entrance plaques in acrylic, metal or plastic.'],
  'Wayfinding signs': ["Bino va hududlar uchun yo'l ko'rsatkichlari — mijozlar adashmasligi uchun.", 'Навигационные указатели для зданий и территорий — чтобы клиенты не терялись.', 'Wayfinding signs for buildings and grounds so visitors never get lost.'],
  'Shop window graphics': ["Vitrina bezagi — plyonka, stiker va bosma orqali do'koningizni ko'zga tashlaydi.", 'Оформление витрин плёнкой, наклейками и печатью — магазин заметен издалека.', 'Shop window graphics with film and stickers that make your store stand out.'],
  'Vehicle branding': ["Avtomobil va furgonlarni brendlash — harakatlanuvchi reklama butun shahar bo'ylab.", 'Брендирование автомобилей и фургонов — мобильная реклама по всему городу.', 'Car and van branding — moving advertising all over the city.'],
  'Street banners': ["Ko'cha, panjara va binolarga tortiladigan bannerlar (rastyajkalar) — tadbir va aksiyalar uchun.", 'Уличные растяжки на заборы, улицы и здания — для мероприятий и акций.', 'Street banners for fences, roads and buildings — for events and promotions.'],

  // Qadoq va yorliqlar
  'Product labels': ["Mahsulot yorliqlari (etiketkalar) — shisha, banka, quti va paketlar uchun.", 'Этикетки для продукции — на бутылки, банки, коробки и пакеты.', 'Product labels for bottles, jars, boxes and pouches.'],
  'Stickers': ["Har qanday shakl va o'lchamdagi stikerlar — konturli kesish bilan.", 'Стикеры любой формы и размера — с контурной резкой.', 'Stickers in any shape and size, contour-cut.'],
  'Roll labels': ["Rulonli yorliqlar — ishlab chiqarishda avtomatik yopishtirish uchun qulay.", 'Рулонные этикетки — удобны для автоматической наклейки на производстве.', 'Roll labels, ready for automatic application on production lines.'],
  'Paper bags': ["Logotipli qog'oz paketlar — do'kon, butik va sovg'alar uchun, lenta yoki shnur tutqichli.", 'Бумажные пакеты с логотипом — для магазинов, бутиков и подарков, с лентой или шнуром.', 'Branded paper bags for shops, boutiques and gifts, with ribbon or cord handles.'],
  'Kraft bags': ["Ekologik kraft paketlar — kafe, novvoyxona va onlayn do'konlar uchun.", 'Экологичные крафт-пакеты — для кафе, пекарен и интернет-магазинов.', 'Eco-friendly kraft bags for cafés, bakeries and online stores.'],
  'Branded boxes': ["Logotipli qutilar — mahsulotingizni sovg'adek taqdim etadi.", 'Брендированные коробки — ваш товар выглядит как подарок.', 'Branded boxes that present your product like a gift.'],
  'Cardboard packaging': ["Kartondan qadoqlar — mahsulot o'lchamiga moslab, bosma bilan tayyorlanadi.", 'Картонная упаковка — по размеру вашего товара, с печатью.', 'Cardboard packaging made to fit your product, with printing.'],
  'Tote bags': ["Mato sumkalar (shopperlar) — logotip bilan, ko'p martalik va ekologik.", 'Тканевые шопперы с логотипом — многоразовые и экологичные.', 'Reusable cotton tote bags with your logo.'],
  'Clothing tags': ["Kiyimlar uchun birkalar — brend nomi, o'lcham va narx bilan.", 'Бирки для одежды — с названием бренда, размером и ценой.', 'Clothing tags with your brand name, size and price.'],
  'Branded tape': ["Logotipli skotch — posilka va qutilarni brendlashning eng oson yo'li.", 'Скотч с логотипом — самый простой способ брендировать посылки и коробки.', 'Printed packing tape — the easiest way to brand parcels and boxes.'],
  'Paper cups': ["Kafe va tadbirlar uchun logotipli qog'oz stakanlar.", 'Бумажные стаканы с логотипом для кофеен и мероприятий.', 'Branded paper cups for coffee shops and events.'],
  'Mailer envelopes': ["Hujjat va posilkalar uchun pochta konvertlari — logotip bilan.", 'Почтовые конверты для документов и посылок — с логотипом.', 'Mailer envelopes for documents and parcels, with your logo.'],

  // Bayroq va tadbirlar
  'Desk flags': ["Ofis va muzokaralar uchun stol bayroqchalari — tagligi bilan.", 'Настольные флажки для офиса и переговоров — с подставкой.', 'Desk flags for offices and meetings, with a stand.'],
  'Feather flags': ["Parus bayroqlar — do'kon, avtosalon va tadbirlar oldida uzoqdan ko'rinadi.", 'Флаги-паруса — заметны издалека у магазинов, автосалонов и мероприятий.', 'Feather flags that stand out from afar at shops, showrooms and events.'],
  'Teardrop flags': ["Tomchi shaklidagi konus bayroqlar — tagligi bilan, ichkarida ham, tashqarida ham.", 'Флаги-капли (конусы) на подставке — для помещений и улицы.', 'Teardrop flags on a base, for indoor and outdoor use.'],
  'Outdoor flags': ["Ko'cha va bino uchun bayroqlar — mustahkam matoda, yorqin ranglarda.", 'Уличные флаги для зданий и территорий — прочная ткань, яркие цвета.', 'Outdoor flags for buildings and grounds — durable fabric, bright colours.'],
  'Pennants': ["Logotipli vimpellar — sport klublari, maktablar va kompaniyalar uchun.", 'Вымпелы с логотипом — для спортклубов, школ и компаний.', 'Branded pennants for sports clubs, schools and companies.'],
  'Branded ribbon': ["Logotipli atlas lentalar — sovg'a qadoqlash va tadbirlar uchun.", 'Атласные ленты с логотипом — для упаковки подарков и мероприятий.', 'Satin ribbon printed with your logo for gift wrapping and events.'],
  'Lanyards': ["Beyjik uchun logotipli lentalar (lanyardlar) — konferensiya va xodimlar uchun.", 'Ланъярды с логотипом для бейджей — для конференций и сотрудников.', 'Branded lanyards for badges — for conferences and staff.'],
  'Event wristbands': ["Tadbirlar uchun bilaguzuklar — kirishni nazorat qilish va brendlash uchun.", 'Браслеты для мероприятий — для контроля входа и брендинга.', 'Event wristbands for entry control and branding.'],
  'Tickets and coupons': ["Raqamlangan chipta va kuponlar — tadbir, lotereya va aksiyalar uchun.", 'Билеты и купоны с нумерацией — для мероприятий, розыгрышей и акций.', 'Numbered tickets and coupons for events, raffles and promotions.'],

  // Suvenir va brending
  'Pens': ["Logotipli ruchkalar — plastik, metall yoki soft-touch; eng ommabop korporativ sovg'a.", 'Ручки с логотипом — пластиковые, металлические или soft-touch; самый популярный сувенир.', 'Branded pens — plastic, metal or soft-touch; the most popular promo gift.'],
  'Pencils': ["Logotipli qalamlar — maktab, o'quv markazlari va tadbirlar uchun.", 'Карандаши с логотипом — для школ, учебных центров и мероприятий.', 'Branded pencils for schools, training centres and events.'],
  'Mugs': ["Logotip yoki rasm tushirilgan krujkalar — oq, rangli, shaffof va soft-touch.", 'Кружки с логотипом или фото — белые, цветные, прозрачные и soft-touch.', 'Mugs with your logo or photo — white, coloured, clear or soft-touch.'],
  'Thermos flasks': ["Logotipli termoslar — mijoz va xodimlar uchun foydali sovg'a.", 'Термосы с логотипом — полезный подарок клиентам и сотрудникам.', 'Branded thermos flasks — a practical gift for clients and staff.'],
  'USB drives': ["Logotipli fleshkalar — taqdimot va hujjatlar bilan birga sovg'a qilish uchun.", 'Флешки с логотипом — для презентаций и в подарок.', 'Branded USB drives for presentations and gifts.'],
  'Keychains': ["Metall, akril yoki rezina breloklar — logotip bilan.", 'Брелоки из металла, акрила или резины — с логотипом.', 'Metal, acrylic or rubber keychains with your logo.'],
  'Fridge magnets': ["Muzlatgich magnitlari — telefon raqamingiz har doim mijozning ko'z oldida.", 'Магниты на холодильник — ваш номер всегда перед глазами клиента.', 'Fridge magnets that keep your number in front of customers.'],
  'Pin badges': ["Logotipli znachoklar — xodimlar, tadbirlar va fan klublar uchun.", 'Значки с логотипом — для сотрудников, мероприятий и фан-клубов.', 'Pin badges with your logo for staff, events and fan clubs.'],
  'Umbrellas': ["Logotipli soyabonlar — har yomg'irda brendingizni ko'rsatadi.", 'Зонты с логотипом — показывают ваш бренд в каждый дождь.', 'Branded umbrellas that show your brand every rainy day.'],
  'Mouse pads': ["Logotip yoki rasm tushirilgan sichqoncha gilamchalari — ofis uchun.", 'Коврики для мыши с логотипом или изображением — для офиса.', 'Mouse pads printed with your logo or artwork for the office.'],
  'Wall clocks': ["Siferblatiga logotip tushirilgan devoriy soatlar — ofis va mijozlar uchun.", 'Настенные часы с логотипом на циферблате — для офиса и клиентов.', 'Wall clocks with your logo on the face, for offices and clients.'],
  'Gift sets': ["Korporativ sovg'a to'plamlari — termos, bloknot, ruchka va boshqalar bir qutida.", 'Корпоративные подарочные наборы — термос, блокнот, ручка и другое в одной коробке.', 'Corporate gift sets — thermos, notebook, pen and more in one box.'],
  'Pencil cases': ["Logotipli penallar — maktab va o'quv markazlari uchun.", 'Пеналы с логотипом — для школ и учебных центров.', 'Branded pencil cases for schools and training centres.'],
  'Jigsaw puzzles': ["Sizning rasmingiz yoki logotipingiz bilan pazllar — esda qolarli sovg'a.", 'Пазлы с вашим фото или логотипом — запоминающийся подарок.', 'Jigsaw puzzles with your photo or logo — a memorable gift.'],

  // Kiyimga bosma
  'T-shirts': ["Futbolkalarga logotip va dizayn bosish — jamoa, tadbir va aksiyalar uchun.", 'Печать логотипа и дизайна на футболках — для команд, мероприятий и акций.', 'Logo and design printing on T-shirts for teams, events and promotions.'],
  'Polo shirts': ["Logotipli polo futbolkalar — xodimlar uchun qulay forma.", 'Поло с логотипом — удобная форма для сотрудников.', 'Branded polo shirts — comfortable uniforms for staff.'],
  'Hoodies': ["Logotip va dizayn tushirilgan xudilar — jamoa va merch uchun.", 'Худи с логотипом и дизайном — для команды и мерча.', 'Hoodies with your logo and design for teams and merch.'],
  'Sweatshirts': ["Svitshotlarga bosma — korporativ va tadbir kiyimlari uchun.", 'Печать на свитшотах — для корпоративной и event-одежды.', 'Sweatshirt printing for corporate and event wear.'],
  'Caps': ["Logotipli kepkalar — bosma yoki kashta bilan.", 'Кепки с логотипом — печать или вышивка.', 'Caps with your logo — printed or embroidered.'],
  'Aprons': ["Logotipli fartuklar — kafe, restoran va do'kon xodimlari uchun.", 'Фартуки с логотипом — для сотрудников кафе, ресторанов и магазинов.', 'Branded aprons for café, restaurant and shop staff.'],
  'Workwear': ["Ish kiyimlariga logotip va yozuv tushirish — kompaniya formasi uchun.", 'Нанесение логотипа на спецодежду — для формы компании.', 'Logo printing on workwear for company uniforms.'],
  'Jackets and vests': ["Kurtka va jiletlarga logotip — jamoa va xodimlar uchun.", 'Логотип на куртках и жилетах — для команды и сотрудников.', 'Your logo on jackets and vests for teams and staff.'],

  // Dizayn xizmatlari
  'Logo design': ["Kompaniyangiz uchun noyob logotip — bir necha variant va tuzatishlar bilan.", 'Уникальный логотип для вашей компании — несколько вариантов и правки.', 'A unique logo for your company, with several options and revisions.'],
  'Corporate identity': ["Firma uslubi: logotip, ranglar, vizitka, blank va boshqa elementlar yagona uslubda.", 'Фирменный стиль: логотип, цвета, визитки, бланки и другие элементы в едином стиле.', 'Corporate identity: logo, colours, business cards, letterheads and more in one style.'],
  'Brand book': ["Brendbuk — logotip, rang va shriftlardan qanday foydalanish bo'yicha qo'llanma.", 'Брендбук — руководство по использованию логотипа, цветов и шрифтов.', 'A brand book — a guide to using your logo, colours and fonts.'],
  'Packaging design': ["Mahsulot qadog'i dizayni — javonda ajralib turadigan va sotuvga yordam beradigan.", 'Дизайн упаковки — выделяется на полке и помогает продажам.', 'Packaging design that stands out on the shelf and helps sales.'],
  'Label design': ["Yorliq va etiketka dizayni — barcha kerakli ma'lumotlar bilan, bosmaga tayyor.", 'Дизайн этикеток со всей нужной информацией — готов к печати.', 'Label design with all required information, ready for print.'],
  'Print-ready artwork': ["Maketingizni bosmaga tayyorlash: CMYK, zapas, shriftlar va aniqlikni tekshiramiz.", 'Подготовка макета к печати: проверим CMYK, вылеты, шрифты и разрешение.', 'Print-ready artwork prep: we check CMYK, bleed, fonts and resolution.'],
  'Social media design': ["Instagram va Telegram uchun post, storis va banner dizayni.", 'Дизайн постов, сторис и баннеров для Instagram и Telegram.', 'Post, story and banner design for Instagram and Telegram.'],
  'Menu design': ["Kafe va restoranlar uchun menyu dizayni — o'qish oson va chiroyli.", 'Дизайн меню для кафе и ресторанов — удобно читать и красиво.', 'Menu design for cafés and restaurants — easy to read and attractive.'],
  'Catalogue design': ["Katalog va bukletlar dizayni hamda sahifalash.", 'Дизайн и вёрстка каталогов и буклетов.', 'Catalogue and brochure design and layout.'],

  // Bosmadan keyingi ishlov
  'Lamination': ["Glyanets yoki mat laminatsiya — bosmani namlik va ishqalanishdan himoya qiladi.", 'Глянцевая или матовая ламинация — защищает печать от влаги и износа.', 'Gloss or matte lamination that protects prints from moisture and wear.'],
  'UV varnish': ["Tanlab UV-lak qoplash — logotip va elementlarni yaltiroq qilib ajratib ko'rsatadi.", 'Выборочный УФ-лак — выделяет логотип и элементы глянцем.', 'Spot UV varnish that makes logos and details shine.'],
  'Foil stamping': ["Oltin, kumush va rangli folga bilan bosish — premium ko'rinish uchun.", 'Тиснение золотой, серебряной и цветной фольгой — для премиального вида.', 'Gold, silver and coloured foil stamping for a premium look.'],
  'Embossing': ["Kongrev — qog'ozda bo'rtib chiqqan naqsh va logotip.", 'Конгрев — рельефный рисунок и логотип на бумаге.', 'Embossing — a raised pattern or logo on paper.'],
  'Contour cutting': ["Plotterda konturli kesish — stiker va yorliqlar uchun har qanday shakl.", 'Плоттерная резка по контуру — любая форма для стикеров и этикеток.', 'Plotter contour cutting for stickers and labels in any shape.'],
  'Laser cutting': ["Akril, yog'och va qog'ozni lazerda kesish va gravirovka qilish.", 'Лазерная резка и гравировка акрила, дерева и бумаги.', 'Laser cutting and engraving of acrylic, wood and paper.'],
  'Die cutting': ["Shtans bilan kesish — qutilar, papkalar va murakkab shakllar uchun.", 'Вырубка штампом — для коробок, папок и сложных форм.', 'Die cutting for boxes, folders and complex shapes.'],
  'Scoring': ["Bigovka — qalin qog'oz bukilganda yorilmasligi uchun.", 'Биговка — чтобы плотная бумага не трескалась на сгибе.', 'Scoring so thick paper folds cleanly without cracking.'],
  'Perforation': ["Perforatsiya — kupon va chiptalarni oson yirtib olish uchun.", 'Перфорация — чтобы купоны и билеты легко отрывались.', 'Perforation so coupons and tickets tear off easily.'],
  'Wire-o binding': ["Prujinali muqova — bloknot, kalendar va hisobotlar uchun.", 'Переплёт на пружину — для блокнотов, календарей и отчётов.', 'Wire-o binding for notebooks, calendars and reports.'],
  'Saddle stitching': ["Skoba bilan tikish — broshyura, jurnal va kataloglar uchun.", 'Скрепление на скобу — для брошюр, журналов и каталогов.', 'Saddle stitching for brochures, magazines and catalogues.'],
  'Numbering': ["Raqamlash — chipta, kvitansiya va sertifikatlarga tartib raqami.", 'Нумерация — порядковые номера на билетах, квитанциях и сертификатах.', 'Numbering — sequential numbers on tickets, receipts and certificates.']
};
