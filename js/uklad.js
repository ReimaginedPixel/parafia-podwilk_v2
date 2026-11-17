/* Wspólny nagłówek i stopka dla wszystkich podstron.
   Menu zmieniasz tutaj, w jednym miejscu. */
(function () {
  document.documentElement.classList.add("js");
  var P = window.PARAFIA;

  var IKONY = {
    strzalka: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
    telefon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
    pinezka: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    menu: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"/></svg>',
    kopiuj: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/></svg>'
  };
  window.IKONY = IKONY;

  var strony = [
    ["index.html", "Strona główna"],
    ["ogloszenia.html", "Ogłoszenia"],
    ["intencje.html", "Intencje"],
    ["sakramenty.html", "Sakramenty"],
    ["historia.html", "Historia"],
    ["kontakt.html", "Kontakt"]
  ];
  var tu = (location.pathname.split("/").pop() || "index.html");

  var menu = strony.map(function (s) {
    return '<li><a href="' + s[0] + '"' + (tu === s[0] ? ' aria-current="page"' : "") + ">" + s[1] + "</a></li>";
  }).join("");

  var tel = P.telefon.replace(/\s/g, "");

  var naglowek =
    '<a class="skip" href="#tresc">Przejdź do treści</a>' +
    '<div class="pasek-dost"><div class="wrap">' +
      '<div class="kontakt-mini">' +
        '<span>' + IKONY.telefon + '<a href="tel:' + tel + '">' + P.telefon + "</a></span>" +
        '<span>' + IKONY.mail + '<a href="mailto:' + P.email + '">' + P.email + "</a></span>" +
        '<span>' + IKONY.pinezka + P.adres + "</span>" +
      "</div>" +
      '<div class="dost-przyciski" role="group" aria-label="Ułatwienia dostępu">' +
        '<button type="button" data-skala="1" aria-label="Normalny tekst">A</button>' +
        '<button type="button" data-skala="1.15" aria-label="Większy tekst">A+</button>' +
        '<button type="button" data-skala="1.3" aria-label="Największy tekst">A++</button>' +
        '<button type="button" data-kontrast aria-label="Wysoki kontrast">Kontrast</button>' +
      "</div>" +
    "</div></div>" +
    '<header class="naglowek"><div class="wrap">' +
      '<a class="marka" href="index.html"><span class="marka-luk"><img src="assets/img/logo-parafii.png" alt="" width="250" height="300"></span><span><b>Parafia św. Marcina</b><small>Podwilk · Orawa</small></span></a>' +
      '<nav aria-label="Menu główne">' +
        '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu">' + IKONY.menu + "Menu</button>" +
        '<ul class="menu" id="menu"><li class="menu-zamknij"><button class="menu-btn" type="button" data-zamknij>Zamknij</button></li>' + menu + "</ul>" +
      "</nav>" +
    "</div></header>";

  var rok = new Date().getFullYear();
  var stopka =
    '<footer class="stopka"><div class="wrap">' +
      '<div class="stopka-siatka">' +
        '<div><a class="marka" href="index.html"><span class="marka-luk"><img src="assets/img/logo-parafii.png" alt="" width="250" height="300"></span><span><b>Parafia św. Marcina</b><small>Podwilk · od 1687</small></span></a>' +
          '<p style="margin-top:1rem;max-width:22rem">Rzymskokatolicka parafia na Górnej Orawie, w dekanacie Jabłonka, archidiecezja krakowska.</p></div>' +
        '<div><h3>Kontakt</h3><ul>' +
          "<li>" + P.adres + "</li>" +
          '<li><a href="tel:' + tel + '">' + P.telefon + "</a></li>" +
          '<li><a href="mailto:' + P.email + '">' + P.email + "</a></li>" +
          '<li><a href="' + P.mapa + '" target="_blank" rel="noopener">Pokaż na mapie</a></li>' +
        "</ul></div>" +
        '<div><h3>Kancelaria</h3><ul>' +
          P.kancelaria.map(function (k) { return "<li>" + k.dni + "<br><b>" + k.godziny + "</b></li>"; }).join("") +
        "</ul></div>" +
        '<div><h3>Na skróty</h3><ul>' +
          strony.slice(1).map(function (s) { return '<li><a href="' + s[0] + '">' + s[1] + "</a></li>"; }).join("") +
          '<li><a href="https://parafia-podwilk.pl/standardy-ochrony-maloletnich-w-parafii-sw-marcina-w-podwilku/">Standardy ochrony małoletnich</a></li>' +
        "</ul></div>" +
      "</div>" +
      '<div class="stopka-dol"><span>© ' + rok + " " + P.nazwa + "</span><span>Projekt strony: konradkukula.dev</span></div>" +
    "</div></footer>";

  document.body.insertAdjacentHTML("afterbegin", naglowek);
  document.body.insertAdjacentHTML("beforeend", stopka);

  /* menu mobilne */
  var btn = document.querySelector(".menu-btn");
  function przelacz(otworz) {
    document.body.classList.toggle("menu-otwarte", otworz);
    btn.setAttribute("aria-expanded", otworz ? "true" : "false");
  }
  btn.addEventListener("click", function () { przelacz(true); });
  document.querySelector("[data-zamknij]").addEventListener("click", function () { przelacz(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") przelacz(false); });

  /* cień nagłówka po przewinięciu */
  var nag = document.querySelector(".naglowek");
  function cien() { nag.classList.toggle("przewiniety", window.scrollY > 10); }
  window.addEventListener("scroll", cien, { passive: true }); cien();

  /* ułatwienia dostępu, zapamiętywane w przeglądarce */
  function zapisz(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function wczytaj(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  var root = document.documentElement;
  function ustawSkale(s) {
    root.style.setProperty("--skala", s);
    document.querySelectorAll("[data-skala]").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.skala === s ? "true" : "false"); });
    zapisz("skala", s);
  }
  function ustawKontrast(on) {
    if (on) root.setAttribute("data-kontrast", "wysoki"); else root.removeAttribute("data-kontrast");
    document.querySelector("[data-kontrast]").setAttribute("aria-pressed", on ? "true" : "false");
    zapisz("kontrast", on ? "1" : "0");
  }
  ustawSkale(wczytaj("skala") || "1");
  ustawKontrast(wczytaj("kontrast") === "1");
  document.querySelectorAll("[data-skala]").forEach(function (b) { b.addEventListener("click", function () { ustawSkale(b.dataset.skala); }); });
  document.querySelector("[data-kontrast]").addEventListener("click", function () { ustawKontrast(!root.hasAttribute("data-kontrast")); });
})();
