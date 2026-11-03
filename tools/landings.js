'use strict';

/*
 * Mahsulot sahifalari (Google/Yandex uchun alohida sahifa): vizitka.html, flayer.html, ...
 * build-ru.js shulardan public/<slug> (o'zbekcha) va public/ru/<slug> (ruscha) yasaydi.
 *
 * Faqat haqiqiy ma'lumot yozing: narx — West Print bergan narx, turlari — saytdagi
 * mahsulotlar ro'yxati va West Print narxnomasidan.
 */
module.exports = [
  {
    slug: 'vizitka.html',
    image: 'images/portfolio/vizitka-2.webp',
    price: { value: 500, unit: 'piece', qty: 5000 },
    uz: {
      title: "Vizitka chop etish Toshkentda — 500 so'mdan | West Print",
      desc: "Vizitka tayyorlash Toshkentda: oddiy, laminatsiyali, barxat, plastik, shaffof va NFC vizitkalar. 5 000 dona tirajda 500 so'mdan. Dizayn yordami. +998 95 980 30 37",
      crumb: 'Vizitka',
      h1: 'Vizitka chop etish Toshkentda',
      lead: "Kompaniya va shaxsiy vizitkalar — maketdan tayyor mahsulotgacha. Tayyor maketingizni yuboring yoki dizaynni biz bilan birga tayyorlang.",
      priceText: "500 so'mdan",
      priceNote: '1 dona uchun · 5 000 dona tirajda',
      kindsTitle: 'Qanday vizitkalar tayyorlaymiz',
      kinds: [
        ["Glans yoki mat qog'ozda", "Eng ko'p buyurtma qilinadigan klassik vizitka."],
        ['Laminatsiyali', "Glans yoki mat qattiq laminat — vizitka uzoq yuradi, ishqalanmaydi."],
        ['Barxat (Touch cover)', "Qo'lga yoqimli baxmal yuza — premium ko'rinish uchun."],
        ['Plastik vizitka', '54×86 mm, bank kartasi kabi pishiq.'],
        ['Shaffof vizitka', "Shaffof plastikda UV bosma — e'tiborni darhol tortadi."],
        ['NFC vizitka', "Telefonga tekkizilsa kontaktlaringiz yoki saytingiz ochiladi."]
      ]
    },
    ru: {
      title: 'Печать визиток в Ташкенте — от 500 сум | West Print',
      desc: 'Изготовление визиток в Ташкенте: обычные, ламинированные, бархатные, пластиковые, прозрачные и NFC-визитки. От 500 сум при тираже 5 000 шт. Помощь с дизайном. +998 95 980 30 37',
      crumb: 'Визитки',
      h1: 'Печать визиток в Ташкенте',
      lead: 'Корпоративные и личные визитки — от макета до готового тиража. Пришлите готовый макет или подготовим дизайн вместе.',
      priceText: 'от 500 сум',
      priceNote: 'за 1 шт · при тираже 5 000 шт',
      kindsTitle: 'Какие визитки мы делаем',
      kinds: [
        ['На глянцевой или матовой бумаге', 'Классическая визитка — самый популярный вариант.'],
        ['С ламинацией', 'Глянцевый или матовый твёрдый ламинат — визитка дольше служит и не истирается.'],
        ['Бархатные (Touch cover)', 'Приятная на ощупь бархатистая поверхность для премиального вида.'],
        ['Пластиковые', '54×86 мм, прочные, как банковская карта.'],
        ['Прозрачные', 'УФ-печать на прозрачном пластике — сразу привлекает внимание.'],
        ['NFC-визитки', 'Прикоснитесь телефоном — откроются ваши контакты или сайт.']
      ]
    }
  },
  {
    slug: 'flayer.html',
    image: 'images/portfolio/menyu-2.webp',
    price: { value: 800000, unit: 'run', qty: 3000 },
    uz: {
      title: "Flayer chop etish Toshkentda — 3 000 dona 800 000 so'm | West Print",
      desc: "Flayer va listovka tayyorlash Toshkentda: aksiya, menyu va reklama uchun. 3 000 dona tiraj — 800 000 so'm. Dizayn yordami. +998 95 980 30 37",
      crumb: 'Flayer',
      h1: 'Flayer chop etish Toshkentda',
      lead: "Aksiya, menyu, tadbir va reklama uchun flayer va listovkalar — kichik va katta tirajlarda.",
      priceText: "800 000 so'm",
      priceNote: '3 000 dona tiraj uchun',
      kindsTitle: 'Qanday flayerlar tayyorlaymiz',
      kinds: [
        ['Yevroflayer 99×210 mm', "Eng qulay format — qo'lga berish va stendga qo'yish uchun."],
        ['Listovka A5 (148×210 mm)', "Ko'proq ma'lumot sig'adigan varaq."],
        ['Menyu-flayer', "Kafe va restoranlar uchun yengil menyu."],
        ["Dorxenger (eshik ilgichi)", "Eshik tutqichiga ilinadigan reklama — uyma-uy tarqatish uchun."]
      ]
    },
    ru: {
      title: 'Печать флаеров в Ташкенте — 3 000 шт за 800 000 сум | West Print',
      desc: 'Изготовление флаеров и листовок в Ташкенте: для акций, меню и рекламы. Тираж 3 000 шт — 800 000 сум. Помощь с дизайном. +998 95 980 30 37',
      crumb: 'Флаеры',
      h1: 'Печать флаеров в Ташкенте',
      lead: 'Флаеры и листовки для акций, меню, мероприятий и рекламы — малыми и большими тиражами.',
      priceText: '800 000 сум',
      priceNote: 'за тираж 3 000 шт',
      kindsTitle: 'Какие флаеры мы делаем',
      kinds: [
        ['Евро-флаер 99×210 мм', 'Самый удобный формат — для раздачи и стоек.'],
        ['Листовка A5 (148×210 мм)', 'Лист, на который помещается больше информации.'],
        ['Флаер-меню', 'Лёгкое меню для кафе и ресторанов.'],
        ['Дорхенгер', 'Реклама на дверную ручку — для поквартирного распространения.']
      ]
    }
  },
  {
    slug: 'buklet.html',
    image: 'images/portfolio/katalog-3.webp',
    price: { value: 1800000, unit: 'run', qty: 3000 },
    uz: {
      title: "Buklet chop etish Toshkentda — 3 000 dona 1 800 000 so'm | West Print",
      desc: "Buklet va yevrobuklet tayyorlash Toshkentda: kompaniya, xizmat va mahsulotlar haqida. 3 000 dona tiraj — 1 800 000 so'm. +998 95 980 30 37",
      crumb: 'Buklet',
      h1: 'Buklet chop etish Toshkentda',
      lead: "Kompaniyangiz, xizmat va mahsulotlaringiz haqida buklet va yevrobukletlar — dizayndan tayyor tirajgacha.",
      priceText: "1 800 000 so'm",
      priceNote: '3 000 dona tiraj uchun',
      kindsTitle: 'Qanday bukletlar tayyorlaymiz',
      kinds: [
        ['Buklet 210×270 mm', "128–130 g bo'r qog'ozda, to'liq rangli bosma."],
        ['Yevrobuklet', "A4 varaq ikki marta buklanadi — 6 sahifa."],
        ['Katalog va broshyura', "Ko'p sahifali nashrlar — mahsulotlar ro'yxati uchun."]
      ]
    },
    ru: {
      title: 'Печать буклетов в Ташкенте — 3 000 шт за 1 800 000 сум | West Print',
      desc: 'Изготовление буклетов и евробуклетов в Ташкенте: о компании, услугах и продукции. Тираж 3 000 шт — 1 800 000 сум. +998 95 980 30 37',
      crumb: 'Буклеты',
      h1: 'Печать буклетов в Ташкенте',
      lead: 'Буклеты и евробуклеты о вашей компании, услугах и продукции — от дизайна до готового тиража.',
      priceText: '1 800 000 сум',
      priceNote: 'за тираж 3 000 шт',
      kindsTitle: 'Какие буклеты мы делаем',
      kinds: [
        ['Буклет 210×270 мм', 'Мелованная бумага 128–130 г, полноцветная печать.'],
        ['Евробуклет', 'Лист A4 с двумя фальцами — 6 полос.'],
        ['Каталоги и брошюры', 'Многостраничные издания для перечня продукции.']
      ]
    }
  },
  {
    slug: 'qogoz-paket.html',
    image: 'images/portfolio/paket-pont.webp',
    price: { value: 9000, unit: 'piece', qty: 500 },
    uz: {
      title: "Logotipli qog'oz paket Toshkentda — 9 000 so'mdan | West Print",
      desc: "Logotipli qog'oz va kraft paketlar tayyorlash Toshkentda: A5, A4 va boshqa o'lchamlar. 500 dona — 9 000 so'mdan (4 500 000 so'm). +998 95 980 30 37",
      crumb: "Qog'oz paket",
      h1: "Logotipli qog'oz paket Toshkentda",
      lead: "Do'kon, butik, kafe va kompaniyalar uchun brendli paketlar — logotipingiz bilan, siz tanlagan o'lchamda.",
      priceText: "9 000 so'mdan",
      priceNote: "1 dona uchun · 500 dona — 4 500 000 so'm",
      kindsTitle: 'Qanday paketlar tayyorlaymiz',
      kinds: [
        ["Qog'oz paket A5", "Kichik xaridlar, kosmetika va sovg'alar uchun."],
        ["Qog'oz paket A4", 'Vertikal yoki gorizontal — kiyim va hujjatlar uchun.'],
        ['Kraft paket', "Tabiiy jigarrang kraft qog'ozdan — eko uslub."],
        ['Shaffof paket', "Mahsulot ko'rinib turadigan paket."]
      ]
    },
    ru: {
      title: 'Бумажные пакеты с логотипом в Ташкенте — от 9 000 сум | West Print',
      desc: 'Изготовление бумажных и крафт-пакетов с логотипом в Ташкенте: A5, A4 и другие размеры. 500 шт — от 9 000 сум (4 500 000 сум). +998 95 980 30 37',
      crumb: 'Бумажные пакеты',
      h1: 'Бумажные пакеты с логотипом в Ташкенте',
      lead: 'Брендированные пакеты для магазинов, бутиков, кафе и компаний — с вашим логотипом и в нужном размере.',
      priceText: 'от 9 000 сум',
      priceNote: 'за 1 шт · 500 шт — 4 500 000 сум',
      kindsTitle: 'Какие пакеты мы делаем',
      kinds: [
        ['Бумажный пакет A5', 'Для небольших покупок, косметики и подарков.'],
        ['Бумажный пакет A4', 'Вертикальный или горизонтальный — для одежды и документов.'],
        ['Крафт-пакет', 'Из натуральной коричневой крафт-бумаги — эко-стиль.'],
        ['Прозрачный пакет', 'Пакет, в котором виден товар.']
      ]
    }
  }
];

// Hamma sahifalarda bir xil bo'limlar matni.
module.exports.common = {
  uz: {
    home: 'Bosh sahifa', services: 'Xizmatlar',
    order: "Telegram'da buyurtma berish",
    stepsTitle: 'Buyurtma qanday bajariladi',
    steps: [
      ['Murojaat', "Telegram yoki telefon orqali yozasiz: mahsulot, miqdor va muddat."],
      ['Narx va maket', "Narx va muddatni aytamiz, maketni tayyorlaymiz yoki sizniki bilan ishlaymiz."],
      ['Bosma', 'Maketni tasdiqlaganingizdan keyin chop etamiz.'],
      ['Topshirish', "O'zingiz olib ketasiz yoki kelishilgan holda yetkazib beramiz."]
    ],
    faqTitle: 'Savollar va javoblar',
    faq: [
      ['Qanday buyurtma berish mumkin?', "Telefon yoki Telegram orqali biz bilan bog'laning — kerakli mahsulot va miqdorni ayting, biz narx va muddatni aytamiz."],
      ['Buyurtma qancha muddatda tayyor bo\'ladi?', "Muddat mahsulot turi va miqdoriga bog'liq — aniq muddatni operatorimiz buyurtmani tasdiqlashda aytadi."],
      ['Yetkazib berish xizmati bormi?', "Ha, kelishilgan holda yetkazib berish yoki o'zingiz olib ketishingiz mumkin."],
      ['Dizaynda yordam berasizlarmi?', "Ha, savolingiz bo'lsa operatorimiz bilan bog'laning — namunalar va dizayn bo'yicha maslahat beramiz."]
    ],
    note: "Aniq narx o'lcham, qog'oz va tirajga bog'liq — Telegram'da yozing, darrov hisoblab beramiz.",
    moreTitle: 'Boshqa mahsulotlar',
    allServices: 'Barcha 115 mahsulot →',
    address: "Toshkent, Muqimiy ko'chasi 100 · 09:00 — 19:00"
  },
  ru: {
    home: 'Главная', services: 'Услуги',
    order: 'Заказать в Telegram',
    stepsTitle: 'Как выполняется заказ',
    steps: [
      ['Заявка', 'Пишете в Telegram или звоните: продукция, количество и сроки.'],
      ['Цена и макет', 'Называем цену и срок, готовим макет или работаем с вашим.'],
      ['Печать', 'Печатаем после того, как вы утвердите макет.'],
      ['Выдача', 'Заберёте сами или доставим по договорённости.']
    ],
    faqTitle: 'Вопросы и ответы',
    faq: [
      ['Как оформить заказ?', 'Свяжитесь с нами по телефону или в Telegram — назовите продукцию и количество, мы сообщим цену и сроки.'],
      ['Сколько времени занимает заказ?', 'Срок зависит от типа и количества продукции — точный срок озвучит оператор при подтверждении заказа.'],
      ['Есть ли доставка?', 'Да, по договорённости — доставим заказ или вы можете забрать его сами.'],
      ['Помогаете с дизайном?', 'Да, свяжитесь с оператором — предоставим образцы и поможем с дизайном.']
    ],
    note: 'Точная цена зависит от размера, бумаги и тиража — напишите в Telegram, сразу посчитаем.',
    moreTitle: 'Другая продукция',
    allServices: 'Все 115 видов продукции →',
    address: 'Ташкент, ул. Мукими, 100 · 09:00 — 19:00'
  }
};
