# West Print — Poligrafiya taqdimot sayti

Vizitka, buklet, flayer, banner, reklama taxtasi va brend belgilari
xizmatlarini taqdim etuvchi ko'p sahifali (multi-page) sayt. Narx
kalkulyatori va onlayn buyurtma formasi yo'q — mijozlar telefon yoki
Telegram orqali to'g'ridan-to'g'ri bog'lanadi ("Aloqa" sahifasi). Sayt
oq/qora (light/dark) mavzularini va o'zbek/rus tillarini qo'llab-quvvatlaydi
("Sozlamalar" sahifasi orqali).

## Talablar

- [Node.js](https://nodejs.org) 18 yoki undan yuqori versiya

## O'rnatish va ishga tushirish

```bash
npm install
npm start
```

So'ng brauzerda oching: http://localhost:3000

Bu — statik saytni beruvchi oddiy Express server (`server/index.js`);
buyurtma yoki narx hisoblash bilan bog'liq API yo'llari yo'q.

## Sahifalar

| Sahifa | Fayl | Mazmuni |
|---|---|---|
| Bosh sahifa | `public/index.html` | Katta banner-karusel (eng tepada, **faqat mobil qurilmada**), video fonli sarlavha, "Nega biz" kartalari, "Bu qanday ishlaydi" |
| Xizmatlar | `public/services.html` | Mahsulotlar ro'yxati (rasm + nom + yorliq) |
| Ishlarimiz | `public/gallery.html` | Namunalar galereyasi |
| Aloqa | `public/contact.html` | Kontakt ma'lumotlari + Savol-javob (FAQ) |
| Sozlamalar | `public/settings.html` | Mavzu (oq/qora) va til (UZ/RU) almashtirish |

Har bir sahifada bir xil header (logotip) va navigatsiya panyeli bor —
kompyuterda headerning o'ng tomonida ixcham ikonkalar qatorida, mobil
qurilmada ekranning pastida suzuvchi panel sifatida.

## Kontent va rasmlarni o'zgartirish

- **Mahsulotlar ro'yxati** (nomi, yorlig'i/badge) — [`public/js/catalog.js`](public/js/catalog.js)
- **Mahsulot rasmlari** — [`public/js/main.js`](public/js/main.js) dagi `productImages`
- **Galereya rasmlari** — [`public/gallery.html`](public/gallery.html)
- **Banner-karusel** (sahifaning eng tepasida, marketpleys uslubidagi "peek" karusel — nuqta ko'rsatkichlari va chetlarda keyingi slaydning ko'rinishi bilan) — [`public/index.html`](public/index.html) dagi `#posterTrack`/`#posterDots` (5 ta `.poster-slide`). Asl suratlar `public/images/posterlar/1.png`...`5.png`; saytda ishlatiladigan siqilgan/kesilgan versiyalari — `public/images/posterlar/slide-1.jpg`...`slide-5.jpg` (har biri ~1100px, ~100KB). Har 5 soniyada avtomatik almashadi, shuningdek qo'lda ham suriladi (svayp) va nuqtalarga bosib ham o'tish mumkin (`public/js/main.js` dagi `initPosterCarousel()`). Yangi slayd qo'shish uchun: rasmni shu o'lchamda tayyorlab `slide-N.jpg` deb saqlang va `index.html` ga `<div class="poster-slide"><img ...></div>` qatorini qo'shing.
- **Hero video** — `public/index.html` dagi `.hero-bg` ichidagi `<video>` (banner-karuseldan pastdagi sarlavha bo'limining orqa foni)
- **Matnlar (uz/ru)** — [`public/js/i18n.js`](public/js/i18n.js)
- **Kontakt ma'lumotlari** (telefon, email, manzil) — [`public/contact.html`](public/contact.html), hozircha namunaviy qiymatlar bilan to'ldirilgan, o'zingiznikiga almashtiring.

Hozirgi rasmlar [Unsplash](https://unsplash.com) dan olingan, mahsulot
turiga mos tanlangan namunaviy fotosuratlar. O'z bosmaxonangizning haqiqiy
rasmlarini qo'yish uchun shu `<img src="...">` manzillarini almashtiring.

## Mavzu (Dark/Light)

"Sozlamalar" sahifasidagi tugma orqali foydalanuvchi qora yoki oq mavzuni
tanlaydi, tanlovi brauzerda saqlanib qoladi va barcha sahifalarda amal
qiladi. Ranglar `public/css/style.css` faylidagi `:root` (oq mavzu) va
`:root[data-theme="dark"]` (qora mavzu) bloklarida.

## Loyiha tuzilishi

```
server/index.js          — Express server (statik fayllarni beradi, faqat lokal ishga tushirish uchun)
public/index.html        — Bosh sahifa
public/services.html     — Xizmatlar sahifasi
public/gallery.html      — Ishlarimiz sahifasi
public/contact.html      — Aloqa + FAQ sahifasi
public/settings.html     — Sozlamalar sahifasi
public/css/style.css     — dizayn
public/js/icons.js       — SVG ikonkalar to'plami
public/js/catalog.js     — mahsulotlar ro'yxati
public/js/i18n.js        — o'zbek/rus tillari
public/js/theme.js       — oq/qora mavzu almashtirish
public/js/main.js        — sahifalardagi dinamik bo'limlarni chizish, navigatsiya
.github/workflows/deploy-pages.yml — GitHub Pages'ga avtomatik joylash
```

Har bir HTML sahifada header/navigatsiya/footer bir xil qo'lda takrorlangan
(build tizimi yo'q) — yangi bo'lim yoki tugma qo'shsangiz, barcha 5 ta
faylda ham yangilashni unutmang.

## GitHub Pages'da joylashtirish

Sayt to'liq statik (server-side kod yo'q), shuning uchun GitHub Pages'da
bepul ishlaydi. `public/` papkasidagi barcha havolalar nisbiy (relative)
qilib yozilgan — bu saytni repo root'da ham, `username.github.io/repo-nomi/`
kabi pastki manzilda ham to'g'ri ishlashini ta'minlaydi.

1. Loyihani GitHub'ga push qiling (`git init`, `git add`, `git commit`,
   GitHub'da yangi repo yarating, `git remote add origin ...`, `git push`).
2. Repo sozlamalarida: **Settings → Pages → Source** bo'limida
   **"GitHub Actions"**ni tanlang (repo yaratilgandan keyin, birinchi push'dan so'ng).
3. `.github/workflows/deploy-pages.yml` avtomatik ishga tushadi va
   `public/` papkasini nashr qiladi — bir necha daqiqada sayt
   `https://<username>.github.io/<repo-nomi>/` manzilida ochiladi.

Kodni o'zgartirib, `main` branch'ga push qilganingizda sayt avtomatik
yangilanadi.
