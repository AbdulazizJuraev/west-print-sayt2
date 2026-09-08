'use strict';

const I18N = {
  uz: {
    nav_home: 'Bosh sahifa',
    nav_services: 'Xizmatlar',
    nav_gallery: 'Ishlarimiz',
    nav_contact: 'Aloqa',
    nav_settings: 'Sozlamalar',
    settings_theme: 'Mavzu',
    settings_language: 'Til',
    hero_badge: 'Zamonaviy poligrafiya xizmati',
    hero_title: 'Poligrafiya xizmatlari — tez, sifatli, qulay narxda',
    hero_subtitle: "Vizitka, buklet, flayer, banner va reklama taxtalarini buyurtma qiling.",
    hero_cta: 'Buyurtma berish',
    hero2_badge: 'Raqamli chop etish',
    hero2_title: 'Yuqori aniqlikdagi raqamli bosma xizmati',
    hero2_subtitle: "Zamonaviy uskunalarda yorqin va aniq ranglar bilan chop etamiz.",
    hero3_badge: 'Professional sifat',
    hero3_title: "Har bir detalga alohida e'tibor",
    hero3_subtitle: "Kichik tiraj yoki katta hajmdagi buyurtmalar — barchasini sifatli bajaramiz.",
    clients_title: 'Kimlar uchun ishlaymiz',
    clients_subtitle: "Mahsulotlarimiz eng ko'p shu sohalarda kerak bo'ladi",
    client1_title: 'Kafe va restoranlar',
    client1_text: 'menyu, flayer, stiker',
    client2_title: "Do'kon va marketlar",
    client2_text: 'narx yorliqlari, banner',
    client3_title: "Go'zallik salonlari",
    client3_text: 'vizitka, sertifikat',
    client4_title: "Tadbir va to'ylar",
    client4_text: 'taklifnoma, banner',
    client5_title: "O'quv markazlari",
    client5_text: 'buklet, sertifikat',
    client6_title: 'Ishlab chiqaruvchilar',
    client6_text: 'yorliq, quti, stiker',
    specs_title: 'Maketni qanday tayyorlash kerak',
    specs_subtitle: "Tayyor faylni yuborishdan oldin shularga e'tibor bering",
    spec1_title: 'Format',
    spec1_text: 'PDF yoki AI faylida yuboring',
    spec2_title: 'Ranglar',
    spec2_text: "CMYK rejimida bo'lsin, RGB emas",
    spec3_title: 'Aniqlik',
    spec3_text: 'Rasm sifati kamida 300 dpi',
    spec4_title: 'Chetki zapas',
    spec4_text: 'Har tomondan 3 mm zapas qoldiring',
    spec5_title: 'Shriftlar',
    spec5_text: "Shriftlarni krivayga o'giring",
    specs_note: 'Maketingiz tayyor emasmi? Dizaynerlarimiz tayyorlab beradi.',
    specs_note_cta: 'Dizayn uchun yozish',
    how_title: 'Bu qanday ishlaydi',
    how_subtitle: 'Murojaatdan tayyor mahsulotgacha — 4 bosqich',
    how_step1_title: 'Murojaat',
    how_step1_text: "Telefon yoki Telegram orqali bog'laning, kerakli mahsulotni ayting",
    how_step2_title: 'Kelishuv',
    how_step2_text: "Narx va muddatni birga kelishamiz",
    how_step3_title: 'Bosib chiqarish',
    how_step3_text: 'Buyurtmangiz ishlab chiqarishga yuboriladi',
    how_step4_title: 'Yetkazib berish',
    how_step4_text: 'Tayyor mahsulotni oling yoki yetkazib beramiz',
    faq_title: 'Savollar va javoblar',
    faq_subtitle: "Ko'p so'raladigan savollarga javoblar",
    faq_q1: 'Qanday buyurtma berish mumkin?',
    faq_a1: "Telefon yoki Telegram orqali biz bilan bog'laning — kerakli mahsulot va miqdorni ayting, biz narx va muddatni aytamiz.",
    faq_q2: "To'lov qanday amalga oshiriladi?",
    faq_a2: "To'lov turlari buyurtmani tasdiqlash jarayonida operator bilan kelishiladi.",
    faq_q3: 'Buyurtma qancha muddatda tayyor bo\'ladi?',
    faq_a3: "Muddat mahsulot turi va miqdoriga bog'liq — aniq muddatni operatorimiz buyurtmani tasdiqlashda aytadi.",
    faq_q4: 'Yetkazib berish xizmati bormi?',
    faq_a4: "Ha, kelishilgan holda yetkazib berish yoki o'zingiz olib ketishingiz mumkin.",
    faq_q5: 'Namuna ko\'rish yoki dizaynda yordam olish mumkinmi?',
    faq_a5: "Ha, savolingiz bo'lsa operatorimiz bilan bog'laning — namunalar va dizayn bo'yicha maslahat beramiz.",
    why_fast_title: 'Tezkor bajarish',
    why_fast_text: "Buyurtmalar qisqa muddatda tayyor bo'ladi",
    why_fast_detail: "Buyurtmangiz kelishilgandan so'ng darhol ishlab chiqarishga o'tadi. Aniq muddat mahsulot turi va tirajga qarab oldindan belgilanadi va o'sha muddatda topshiriladi.",
    why_quality_title: 'Yuqori sifat',
    why_quality_text: 'Zamonaviy uskunalar va sifatli materiallar',
    why_quality_detail: "Zamonaviy uskunalarda, sifatli qog'oz va bo'yoqlar bilan chop etamiz. Ranglar aniqligi va bosma sifati butun tiraj bo'ylab bir xil bo'lishiga alohida e'tibor beriladi.",
    why_price_title: 'Halol shartlar',
    why_price_text: "Narx va muddat oldindan aniq kelishiladi, yashirin to'lovlarsiz",
    why_price_detail: "Narx va muddat ish boshlanishidan oldin aniq aytiladi. Kelishilgan summadan tashqari yashirin to'lovlar yo'q — biror o'zgarish bo'lsa, albatta oldindan xabar beramiz.",
    why_design_title: 'Professional dizayn',
    why_design_text: 'Kerak bo\'lsa dizayn bo\'yicha ham yordam beramiz',
    why_design_detail: "Tayyor maketingiz bo'lmasa, dizaynerlarimiz uni tayyorlab beradi. Tayyor faylingizni ham chop etishdan oldin tekshirib, bosmaga moslab beramiz.",
    gallery_title: 'Bizning ishlarimiz',
    gallery_subtitle: "So'nggi bajarilgan buyurtmalardan namunalar",
    portfolio_title: 'Portfolio',
    portfolio_subtitle: "Bajarilgan ishlarimiz to'plami",
    portfolio_link_text: "Bajarilgan ishlarimizning to'liq to'plamini ko'ring",
    portfolio_back: '← Ishlarimizga qaytish',
    portfolio_empty: "Ishlarimiz namunalari tez orada shu yerda joylanadi.",
    services_title: 'Xizmatlarimiz',
    services_subtitle: 'Har qanday poligrafik mahsulot uchun murojaat qiling',
    contact_title: "Bog'lanish",
    contact_subtitle: "Savollaringiz bo'lsa, biz bilan bog'laning",
    contact_address: "Toshkent sh., Muqimiy ko'chasi, 100-uy",
    map_route: 'Manzilga kelish',
    modal_close: 'Yopish',
    footer_rights: 'Barcha huquqlar himoyalangan.'
  },
  ru: {
    nav_home: 'Главная',
    nav_services: 'Услуги',
    nav_gallery: 'Наши работы',
    nav_contact: 'Контакты',
    nav_settings: 'Настройки',
    settings_theme: 'Тема',
    settings_language: 'Язык',
    hero_badge: 'Современная полиграфическая услуга',
    hero_title: 'Полиграфические услуги — быстро, качественно, доступно',
    hero_subtitle: 'Закажите визитки, буклеты, флаеры, баннеры и таблички.',
    hero_cta: 'Заказать',
    hero2_badge: 'Цифровая печать',
    hero2_title: 'Высокоточная цифровая печать',
    hero2_subtitle: 'Печатаем на современном оборудовании с яркими и чёткими цветами.',
    hero3_badge: 'Профессиональное качество',
    hero3_title: 'Внимание к каждой детали',
    hero3_subtitle: 'Малый тираж или крупный заказ — выполним качественно в любом объёме.',
    clients_title: 'Для кого мы работаем',
    clients_subtitle: 'Чаще всего наша продукция нужна в этих сферах',
    client1_title: 'Кафе и рестораны',
    client1_text: 'меню, флаеры, стикеры',
    client2_title: 'Магазины и маркеты',
    client2_text: 'ценники, баннеры',
    client3_title: 'Салоны красоты',
    client3_text: 'визитки, сертификаты',
    client4_title: 'Мероприятия и свадьбы',
    client4_text: 'приглашения, баннеры',
    client5_title: 'Учебные центры',
    client5_text: 'буклеты, сертификаты',
    client6_title: 'Производители',
    client6_text: 'этикетки, коробки, стикеры',
    specs_title: 'Как подготовить макет',
    specs_subtitle: 'Проверьте эти пункты перед отправкой файла',
    spec1_title: 'Формат',
    spec1_text: 'Присылайте файл в PDF или AI',
    spec2_title: 'Цвета',
    spec2_text: 'Режим CMYK, а не RGB',
    spec3_title: 'Качество',
    spec3_text: 'Разрешение не менее 300 dpi',
    spec4_title: 'Припуски',
    spec4_text: 'Оставьте по 3 мм с каждой стороны',
    spec5_title: 'Шрифты',
    spec5_text: 'Переведите шрифты в кривые',
    specs_note: 'Нет готового макета? Наши дизайнеры подготовят его.',
    specs_note_cta: 'Написать по дизайну',
    how_title: 'Как это работает',
    how_subtitle: 'От обращения до готовой продукции — 4 шага',
    how_step1_title: 'Обращение',
    how_step1_text: 'Свяжитесь с нами по телефону или в Telegram и назовите нужную продукцию',
    how_step2_title: 'Согласование',
    how_step2_text: 'Вместе согласуем цену и сроки',
    how_step3_title: 'Печать',
    how_step3_text: 'Ваш заказ передаётся в производство',
    how_step4_title: 'Доставка',
    how_step4_text: 'Забираете готовую продукцию или мы доставим её вам',
    faq_title: 'Вопросы и ответы',
    faq_subtitle: 'Ответы на часто задаваемые вопросы',
    faq_q1: 'Как оформить заказ?',
    faq_a1: 'Свяжитесь с нами по телефону или в Telegram — назовите продукцию и количество, мы сообщим цену и сроки.',
    faq_q2: 'Как происходит оплата?',
    faq_a2: 'Способ оплаты согласовывается с оператором при подтверждении заказа.',
    faq_q3: 'Сколько времени занимает заказ?',
    faq_a3: 'Срок зависит от типа и количества продукции — точный срок озвучит оператор при подтверждении заказа.',
    faq_q4: 'Есть ли доставка?',
    faq_a4: 'Да, по договорённости — доставим заказ или вы можете забрать его сами.',
    faq_q5: 'Можно ли увидеть образец или получить помощь с дизайном?',
    faq_a5: 'Да, свяжитесь с оператором — предоставим образцы и поможем с дизайном.',
    why_fast_title: 'Быстрое выполнение',
    why_fast_text: 'Заказы готовятся в короткие сроки',
    why_fast_detail: 'Заказ передаётся в производство сразу после согласования. Точный срок зависит от вида продукции и тиража — определяется заранее и соблюдается.',
    why_quality_title: 'Высокое качество',
    why_quality_text: 'Современное оборудование и качественные материалы',
    why_quality_detail: 'Печатаем на современном оборудовании, используем качественную бумагу и краски. Следим за точностью цветов и одинаковым качеством печати во всём тираже.',
    why_price_title: 'Честные условия',
    why_price_text: 'Цена и сроки согласовываются заранее, без скрытых платежей',
    why_price_detail: 'Цена и сроки называются до начала работы. Никаких скрытых платежей сверх согласованной суммы — обо всех изменениях сообщаем заранее.',
    why_design_title: 'Профессиональный дизайн',
    why_design_text: 'При необходимости поможем и с дизайном',
    why_design_detail: 'Если готового макета нет, наши дизайнеры подготовят его. Ваш готовый файл проверим и подготовим к печати.',
    gallery_title: 'Наши работы',
    gallery_subtitle: 'Примеры недавно выполненных заказов',
    portfolio_title: 'Портфолио',
    portfolio_subtitle: 'Коллекция выполненных работ',
    portfolio_link_text: 'Посмотрите полную коллекцию наших работ',
    portfolio_back: '← Назад к работам',
    portfolio_empty: 'Примеры наших работ появятся здесь в ближайшее время.',
    services_title: 'Наши услуги',
    services_subtitle: 'Обращайтесь за любой полиграфической продукцией',
    contact_title: 'Контакты',
    contact_subtitle: 'Если у вас есть вопросы, свяжитесь с нами',
    contact_address: 'г. Ташкент, ул. Мукими, 100',
    map_route: 'Построить маршрут',
    modal_close: 'Закрыть',
    footer_rights: 'Все права защищены.'
  }
};

const I18n = (function () {
  let currentLang = localStorage.getItem('wp_lang') || 'uz';

  function t(key) {
    return (I18N[currentLang] && I18N[currentLang][key]) || key;
  }

  function getLang() {
    return currentLang;
  }

  function applyStaticText() {
    document.documentElement.setAttribute('lang', currentLang);
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', t(key));
    });
    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-lang-btn') === currentLang);
    });
  }

  function setLanguage(lang) {
    if (!I18N[lang]) return;
    currentLang = lang;
    localStorage.setItem('wp_lang', lang);
    applyStaticText();
    document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
  }

  return { t, getLang, setLanguage, applyStaticText };
})();
