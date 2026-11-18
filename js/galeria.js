/* Galeria: lista albumów, widok albumu, powiększanie zdjęć i „odbitki” na stronie głównej.
   Dane albumów są w dane/galeria.js. */
(function () {
  var A = window.GALERIA || [];
  if (!A.length) return;
  var MIES = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
  var NA_STRONE = 42;
  var STRZALKA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
  var STRZALKA_MALA = STRZALKA.replace("<svg ", '<svg width="16" height="16" ');

  function $(s, el) { return (el || document).querySelector(s); }
  function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function album(slug) { for (var i = 0; i < A.length; i++) if (A[i].slug === slug) return A[i]; return null; }
  function odswiez(el) { if (el && window.PARAFIA_UI) window.PARAFIA_UI.odswiez(el); }

  /* ---------- adresy zdjęć ---------- */
  function plik(a, i) { var f = a.zdjecia[i]; return /^(https?:)?\//.test(f) ? f : a.folder + f; }
  /* mała wersja do kafelków */
  function mini(a, i) {
    var pelny = plik(a, i);
    if (window.MINIATURY && window.MINIATURY[pelny]) return window.MINIATURY[pelny];
    if (a.miniatury) return a.folder + a.miniatury + a.zdjecia[i];
    /* obecna strona parafii (WordPress) ma do każdego zdjęcia kwadratową miniaturę 150 × 150 */
    if (/\/wp-content\/uploads\//.test(pelny)) return pelny.replace(/(-scaled|-\d+x\d+)?\.(jpe?g|png)$/i, "-150x150.$2");
    return pelny;
  }
  function okladka(a) { return a.okladkaPlik ? a.folder + a.okladkaPlik : plik(a, a.okladka || 0); }
  /* gdy mniejsza wersja się nie wczyta, strona sama bierze pełne zdjęcie (data-pelny) */
  function obrazek(src, pelny) {
    return '<img src="' + esc(src) + '"' + (pelny && pelny !== src ? ' data-pelny="' + esc(pelny) + '"' : "") + ' alt="" loading="lazy" decoding="async">';
  }

  function kiedy(a) {
    if (a.kiedy) return a.kiedy;
    var p = a.data.split("-");
    return +p[2] + " " + MIES[+p[1] - 1] + " " + p[0];
  }
  /* 1 zdjęcie, 2–4 zdjęcia, 5 i więcej zdjęć */
  function ile(n) {
    var d = n % 10, s = n % 100;
    if (n === 1) return "1 zdjęcie";
    if (d >= 2 && d <= 4 && (s < 12 || s > 14)) return n + " zdjęcia";
    return n + " zdjęć";
  }
  var razem = A.reduce(function (s, a) { return s + a.zdjecia.length; }, 0);
  $$("[data-galeria-razem]").forEach(function (el) { el.textContent = ile(razem) + " w " + A.length + " albumach"; });

  /* ---------- odbitki (strona główna i nagłówek galerii) ---------- */
  var OBROTY = [-2.4, 1.8, -1.2, 2.2, -1.8, 1.3];
  $$("[data-galeria-skrot]").forEach(function (el) {
    var wybrane = (el.getAttribute("data-galeria-skrot") || "").split(",").map(function (s) { return album(s.trim()); }).filter(Boolean);
    if (!wybrane.length) wybrane = A.slice(0, 6);
    el.innerHTML = wybrane.map(function (a, n) {
      return '<a class="odbitka" href="galeria.html#album=' + a.slug + '" data-pojaw style="--obrot:' + OBROTY[n % OBROTY.length] + "deg;--opoznienie:" + (n * 0.07).toFixed(2) + 's">' +
        '<span class="odbitka-papier"><span class="odbitka-foto">' + obrazek(okladka(a), plik(a, a.okladka || 0)) + "</span>" +
        '<span class="odbitka-podpis"><b>' + esc(a.tytul) + "</b><small><span>" + esc(kiedy(a)) + "</span> <span>" + ile(a.zdjecia.length) + "</span></small></span></span></a>";
    }).join("");
  });

  /* ---------- lista albumów ---------- */
  /* dwa dodatkowe zdjęcia do okładki z trzech kadrów */
  function dodatkowe(a) {
    var n = a.zdjecia.length, ok = a.okladka || 0, wynik = [];
    (a.mozaika || [Math.floor(n / 3), Math.floor(2 * n / 3), 1, n - 1]).forEach(function (i) {
      if (wynik.length < 2 && i !== ok && i >= 0 && i < n && wynik.indexOf(i) < 0) wynik.push(i);
    });
    return wynik;
  }
  var lista = $("[data-albumy]");
  if (lista) {
    lista.innerHTML = A.map(function (a, n) {
      var dod = dodatkowe(a), kadry = '<span class="kadr">' + obrazek(okladka(a), plik(a, a.okladka || 0)) + "</span>";
      if (dod.length === 2) kadry += dod.map(function (i) { return '<span class="kadr">' + obrazek(mini(a, i), plik(a, i)) + "</span>"; }).join("");
      return '<a class="karta album" href="#album=' + a.slug + '" data-pojaw style="--opoznienie:' + ((n % 3) * 0.08).toFixed(2) + 's">' +
        '<div class="album-mozaika' + (dod.length === 2 ? "" : " album-mozaika--jedno") + '" data-podarte="dol" data-ziarno="' + (71 + n * 5) + '">' + kadry +
        '<span class="album-ile">' + ile(a.zdjecia.length) + "</span></div>" +
        '<span class="data-mono">' + esc(kiedy(a)) + "</span><h3>" + esc(a.tytul) + "</h3>" +
        (a.opis ? "<p>" + esc(a.opis) + "</p>" : "") + '<span class="kolko">' + STRZALKA + "</span></a>";
    }).join("");
  }

  /* ---------- powiększenie (lightbox) ---------- */
  var lb, lbImg, lbLicznik, lbPodpis, biezacy = null, nr = 0, otwierajacy = null;
  function zamknij() { if (lb.close) lb.close(); else { lb.removeAttribute("open"); poZamknieciu(); } }
  function poZamknieciu() {
    var kafelek = widok && $('.zdjecie[data-i="' + nr + '"]', widok);
    var cel = kafelek || otwierajacy;
    if (cel && cel.focus) cel.focus();
  }
  function zbudujLightbox() {
    if (lb) return;
    document.body.insertAdjacentHTML("beforeend",
      '<dialog class="lightbox" aria-label="Powiększone zdjęcie">' +
        '<figure><img alt=""><figcaption><span class="lb-licznik"></span><span class="lb-podpis"></span></figcaption></figure>' +
        '<button type="button" class="lb-przycisk lb-zamknij" aria-label="Zamknij">' +
          '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
        '<button type="button" class="lb-przycisk lb-poprz" aria-label="Poprzednie zdjęcie">' +
          '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>' +
        '<button type="button" class="lb-przycisk lb-nast" aria-label="Następne zdjęcie">' +
          '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>' +
      "</dialog>");
    lb = $(".lightbox"); lbImg = $("img", lb); lbLicznik = $(".lb-licznik", lb); lbPodpis = $(".lb-podpis", lb);
    lbImg.onload = lbImg.onerror = function () { lbImg.classList.add("zaladowane"); };
    $(".lb-zamknij", lb).addEventListener("click", zamknij);
    $(".lb-poprz", lb).addEventListener("click", function () { pokaz(nr - 1); });
    $(".lb-nast", lb).addEventListener("click", function () { pokaz(nr + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.tagName === "FIGURE") zamknij(); });
    lb.addEventListener("close", poZamknieciu);
    lb.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); pokaz(nr - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); pokaz(nr + 1); }
    });
    /* przesuwanie palcem na telefonie */
    var x0 = null, y0 = null;
    lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) pokaz(nr + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }
  function pokaz(i) {
    var n = biezacy.zdjecia.length;
    nr = (i + n) % n;
    lbImg.classList.remove("zaladowane");
    lbImg.src = plik(biezacy, nr);
    lbImg.alt = "Zdjęcie " + (nr + 1) + " z " + n + ": " + biezacy.tytul;
    lbLicznik.textContent = (nr + 1) + " / " + n;
    lbPodpis.textContent = (biezacy.podpisy && biezacy.podpisy[nr]) || biezacy.tytul;
    [nr + 1, nr - 1].forEach(function (j) { var im = new Image(); im.src = plik(biezacy, (j + n) % n); });
  }
  function otworz(a, i, zrodlo) {
    zbudujLightbox();
    biezacy = a; otwierajacy = zrodlo || null;
    pokaz(i);
    if (lb.showModal) lb.showModal(); else lb.setAttribute("open", "");
  }

  /* ---------- widok jednego albumu (galeria.html#album=...) ---------- */
  var widok = $("[data-album]");
  var tytulStrony = document.title, ostatni = null;
  function rysujZdjecia(a, od, do_) {
    var ul = $(".zdjecia", widok), html = "";
    for (var i = od; i < Math.min(do_, a.zdjecia.length); i++) {
      html += '<li><button type="button" class="zdjecie" data-i="' + i + '" aria-label="Powiększ zdjęcie ' + (i + 1) + " z " + a.zdjecia.length + '">' +
        obrazek(mini(a, i), plik(a, i)) + "</button></li>";
    }
    ul.insertAdjacentHTML("beforeend", html);
    var wiecej = $("[data-wiecej]", widok), zostalo = a.zdjecia.length - do_;
    wiecej.hidden = zostalo <= 0;
    wiecej.textContent = "Pokaż więcej zdjęć (" + Math.max(zostalo, 0) + ")";
    wiecej.onclick = function () {
      rysujZdjecia(a, do_, do_ + NA_STRONE);
      var b = $('.zdjecie[data-i="' + do_ + '"]', widok);
      if (b) b.focus({ preventScroll: true });
    };
  }
  function sasiad(a, klasa, etykieta) {
    return a ? '<a class="album-sasiad ' + klasa + '" href="#album=' + a.slug + '"><span class="data-mono">' + etykieta + "</span><b>" + esc(a.tytul) + "</b></a>" : "<span></span>";
  }
  function trasa() {
    var m = location.hash.match(/^#album=([\w-]+)/), a = m && album(m[1]);
    var sekcjaListy = lista && lista.closest("section"), glowa = $("[data-galeria-glowa]");
    if (sekcjaListy) sekcjaListy.hidden = !!a;
    if (glowa) glowa.hidden = !!a;
    widok.hidden = !a;
    if (!a) {
      document.title = tytulStrony;
      widok.innerHTML = "";
      odswiez(glowa); odswiez(sekcjaListy);
      /* powrót do listy: pokaż album, który był ostatnio otwarty */
      var karta = ostatni && lista && $('a[href="#album=' + ostatni + '"]', lista);
      if (karta) { karta.scrollIntoView({ block: "center", behavior: "instant" }); karta.focus({ preventScroll: true }); }
      ostatni = null;
      return;
    }
    ostatni = a.slug;
    document.title = a.tytul + " · " + tytulStrony;
    var k = A.indexOf(a);
    widok.innerHTML =
      '<div class="wrap">' +
        '<nav class="okruszki" aria-label="Jesteś tutaj"><a href="index.html">Strona główna</a> / <a href="#albumy">Galeria</a> / ' + esc(a.tytul) + "</nav>" +
        '<span class="etykieta" style="margin-top:1.4rem">' + esc(kiedy(a)) + " · " + ile(a.zdjecia.length) + "</span>" +
        '<h1 class="album-tytul" tabindex="-1">' + esc(a.tytul) + "</h1>" +
        (a.opis ? '<p class="album-opis">' + esc(a.opis) + "</p>" : "") +
        '<ul class="zdjecia"></ul>' +
        '<div class="album-dol"><button type="button" class="btn btn--jasny" data-wiecej hidden></button>' +
        '<a class="link-strzalka" href="#albumy">Wszystkie albumy ' + STRZALKA_MALA + "</a></div>" +
        (a.zrodlo ? '<p class="album-zrodlo">Ten album na obecnej stronie parafii: <a href="' + esc(a.zrodlo) + '" rel="noopener">' + esc(a.zrodlo.replace(/^https?:\/\//, "").replace(/\/$/, "")) + "</a></p>" : "") +
        '<nav class="album-nawigacja" aria-label="Inne albumy">' + sasiad(A[k - 1], "", "Poprzedni album") + sasiad(A[k + 1], "album-sasiad--nast", "Następny album") + "</nav>" +
      "</div>";
    rysujZdjecia(a, 0, NA_STRONE);
    $(".zdjecia", widok).addEventListener("click", function (e) {
      var b = e.target.closest(".zdjecie");
      if (b) otworz(a, +b.getAttribute("data-i"), b);
    });
    window.scrollTo({ top: 0, behavior: "instant" });
    $(".album-tytul", widok).focus({ preventScroll: true });
    odswiez(widok);
  }
  if (widok) {
    window.addEventListener("hashchange", trasa);
    trasa();
  }
})();
