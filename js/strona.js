/* Wypełnia stronę treściami z dane/parafia.js i dodaje animacje. */
(function () {
  var P = window.PARAFIA, I = window.IKONY;
  var DNI = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
  var DNI_KR = ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "So"];
  var MIES = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
  var MIES_KR = ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"];

  function $(s, el) { return (el || document).querySelector(s); }
  function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }
  function data(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function ladnaData(d) { return d.getDate() + " " + MIES[d.getMonth()] + " " + d.getFullYear(); }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function dzisRano() { var d = new Date(); d.setHours(0, 0, 0, 0); return d; }

  function godzinyDnia(dzien) {
    return dzien === 0 ? P.msze.niedziela : P.msze.powszednie[P.sezon] || P.msze.powszednie.zima;
  }

  /* ---------- najbliższa Msza ---------- */
  function najblizszaMsza() {
    var teraz = new Date();
    for (var i = 0; i < 8; i++) {
      var d = new Date(teraz); d.setDate(teraz.getDate() + i);
      var godz = godzinyDnia(d.getDay());
      for (var j = 0; j < godz.length; j++) {
        var hm = godz[j].split(":");
        var t = new Date(d); t.setHours(+hm[0], +hm[1], 0, 0);
        if (t > teraz) return { czas: t, godzina: godz[j], dni: i };
      }
    }
  }
  function zaIle(t) {
    var min = Math.round((t - new Date()) / 60000);
    if (min < 60) return "za " + min + " min";
    var h = Math.floor(min / 60), m = min % 60;
    if (h < 12) return "za " + h + " godz." + (m ? " " + m + " min" : "");
    return "";
  }
  function rysujNajblizsza() {
    var el = $("[data-najblizsza]"); if (!el) return;
    var n = najblizszaMsza();
    var kiedy = n.dni === 0 ? "Dziś" : n.dni === 1 ? "Jutro" : DNI[n.czas.getDay()];
    el.innerHTML =
      '<span class="etykieta">Najbliższa Msza święta</span>' +
      '<div class="duze">' + kiedy + ", " + n.godzina + "</div>" +
      '<div class="male">' + (zaIle(n.czas) || ladnaData(n.czas)) + "</div>";
  }

  function rysujMsze() {
    $$("[data-msze]").forEach(function (el) {
      el.innerHTML = '<span class="etykieta">Msze święte</span><ul>' +
        "<li>Niedziele i święta <b>" + P.msze.niedziela.join(" · ") + "</b></li>" +
        "<li>Dni powszednie <b>" + godzinyDnia(1).join(" · ") + "</b></li>" +
        "</ul>";
    });
    $$("[data-kancelaria]").forEach(function (el) {
      el.innerHTML = '<span class="etykieta">Kancelaria</span><ul>' +
        P.kancelaria.map(function (k) { return "<li>" + k.dni + " <b>" + (P.sezon === "lato" && k.lato ? k.lato : k.godziny) + "</b></li>"; }).join("") +
        "</ul>";
    });
    $$("[data-kontakt-skrot]").forEach(function (el) {
      var tel = P.telefon.replace(/\s/g, "");
      el.innerHTML = '<span class="etykieta">Kontakt</span><ul>' +
        '<li>Telefon <a href="tel:' + tel + '">' + P.telefon + "</a></li>" +
        '<li>E-mail <a href="mailto:' + P.email + '">napisz</a></li>' +
        '<li>Adres <span>' + P.adres + "</span></li></ul>";
    });
  }

  /* ---------- ogłoszenia ---------- */
  function kartkaOgloszen(o, skrot) {
    var d = data(o.data);
    var lista = '<ol class="lista-ogl' + (skrot && o.punkty.length > 4 ? " zwinieta" : "") + '">' +
      o.punkty.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ol>";
    var rozwin = skrot && o.punkty.length > 4
      ? '<button type="button" class="rozwin link-strzalka" aria-expanded="false">Pokaż wszystkie (' + o.punkty.length + ")</button>" : "";
    return '<div class="kartka-naglowek"><h3>' + esc(o.tytul) + '</h3><span class="data-mono">' + ladnaData(d) + "</span></div>" + lista + rozwin;
  }
  function rysujOgloszenia() {
    $$("[data-ogloszenia]").forEach(function (el) {
      var skrot = el.getAttribute("data-ogloszenia") === "skrot";
      el.innerHTML = kartkaOgloszen(P.ogloszenia[0], skrot);
      var b = $(".rozwin", el);
      if (b) b.addEventListener("click", function () {
        var l = $(".lista-ogl", el), zw = l.classList.toggle("zwinieta");
        b.setAttribute("aria-expanded", zw ? "false" : "true");
        b.textContent = zw ? "Pokaż wszystkie (" + P.ogloszenia[0].punkty.length + ")" : "Zwiń";
      });
    });
    var arch = $("[data-archiwum]");
    if (arch) {
      var stare = P.ogloszenia.slice(1);
      arch.innerHTML = stare.length
        ? stare.map(function (o) { return "<details><summary>" + esc(o.tytul) + " · " + ladnaData(data(o.data)) + "</summary>" + kartkaOgloszen(o, false) + "</details>"; }).join("")
        : "<p>Archiwum pojawi się, gdy kancelaria doda kolejne ogłoszenia.</p>";
    }
  }

  /* ---------- intencje ---------- */
  function rysujIntencje() {
    $$("[data-intencje]").forEach(function (el) {
      var dzis = dzisRano().getTime(), wybrany = 0;
      P.intencje.forEach(function (x, i) { if (data(x.dzien).getTime() === dzis) wybrany = i; });
      var przyciski = P.intencje.map(function (x, i) {
        var d = data(x.dzien);
        return '<button type="button" role="tab" aria-selected="' + (i === wybrany) + '" data-i="' + i + '">' + DNI_KR[d.getDay()] + "<span>" + d.getDate() + "</span></button>";
      }).join("");
      el.innerHTML = '<div class="kartka-naglowek"><h3>Intencje mszalne</h3><span class="data-mono">' + esc(P.intencjeTydzien) + "</span></div>" +
        '<div class="dni" role="tablist" aria-label="Wybierz dzień">' + przyciski + '</div><ul class="intencje-lista" aria-live="polite"></ul>';
      var lista = $(".intencje-lista", el);
      function pokaz(i) {
        var x = P.intencje[i], d = data(x.dzien);
        lista.innerHTML = '<li style="grid-template-columns:1fr;padding-top:0"><span class="data-mono">' + DNI[d.getDay()] + ", " + ladnaData(d) + "</span></li>" +
          x.msze.map(function (m) { return "<li><b>" + m[0] + "</b><span>" + esc(m[1]) + "</span></li>"; }).join("");
        $$(".dni button", el).forEach(function (b) { b.setAttribute("aria-selected", b.dataset.i == i ? "true" : "false"); });
      }
      $$(".dni button", el).forEach(function (b) { b.addEventListener("click", function () { pokaz(+b.dataset.i); }); });
      pokaz(wybrany);
    });
  }

  /* ---------- wydarzenia ---------- */
  function rysujWydarzenia() {
    var el = $("[data-wydarzenia]"); if (!el) return;
    var dzis = dzisRano();
    var przyszle = P.wydarzenia.filter(function (w) { return data(w.data) >= dzis; }).slice(0, 4);
    el.innerHTML = przyszle.map(function (w, i) {
      var d = data(w.data);
      return '<article class="wydarzenie" data-pojaw style="--opoznienie:' + (i * 0.08) + 's">' +
        '<div class="kal"><b>' + d.getDate() + "</b><small>" + MIES_KR[d.getMonth()] + "</small></div>" +
        "<div><h3>" + esc(w.tytul) + "</h3><p>" + (w.godzina ? DNI[d.getDay()] + ", godz. " + w.godzina + ". " : "") + esc(w.opis) + "</p></div></article>";
    }).join("") || "<p>Brak zaplanowanych wydarzeń.</p>";
  }

  /* ---------- aktualności ---------- */
  function rysujAktualnosci() {
    var el = $("[data-aktualnosci]"); if (!el) return;
    el.innerHTML = P.aktualnosci.map(function (a, i) {
      var d = data(a.data);
      return '<a class="karta" href="' + esc(a.link || "#") + '" data-pojaw style="--opoznienie:' + (i * 0.08) + 's">' +
        '<div class="karta-foto"><span class="brak">' + esc(a.tytul) + "</span>" +
        '<img src="' + esc(a.zdjecie) + '" alt="" loading="lazy" onerror="this.remove()"></div>' +
        '<span class="data-mono">' + d.getDate() + " " + MIES[d.getMonth()] + " " + d.getFullYear() + "</span>" +
        "<h3>" + esc(a.tytul) + "</h3><p>" + esc(a.zajawka) + '</p><span class="kolko">' + I.strzalka + "</span></a>";
    }).join("");
  }

  /* ---------- konta ---------- */
  function rysujKonta() {
    var el = $("[data-konta]"); if (!el) return;
    el.innerHTML = P.konta.map(function (k) {
      return '<div class="konto' + (k.cel ? " cel" : "") + '" data-pojaw><span class="etykieta">' + esc(k.bank) + "</span>" +
        "<h3 style=\"margin-top:.5rem\">" + esc(k.nazwa) + '</h3><div class="nr">' + esc(k.numer) + "</div>" +
        '<button type="button" class="kopiuj" data-nr="' + esc(k.numer.replace(/\s/g, "")) + '">' + I.kopiuj + "<span>Kopiuj numer</span></button></div>";
    }).join("");
    $$(".kopiuj", el).forEach(function (b) {
      b.addEventListener("click", function () {
        var ok = function () { b.classList.add("ok"); $("span", b).textContent = "Skopiowano"; setTimeout(function () { b.classList.remove("ok"); $("span", b).textContent = "Kopiuj numer"; }, 2200); };
        if (navigator.clipboard) navigator.clipboard.writeText(b.dataset.nr).then(ok, ok); else ok();
      });
    });
  }

  rysujNajblizsza(); rysujMsze(); rysujOgloszenia(); rysujIntencje(); rysujWydarzenia(); rysujAktualnosci(); rysujKonta();
  setInterval(rysujNajblizsza, 60000);

  /* ---------- animacje ---------- */
  var ruch = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var elementy = $$("[data-pojaw]");
  if ("IntersectionObserver" in window && ruch) {
    var io = new IntersectionObserver(function (wpisy) {
      wpisy.forEach(function (w) { if (w.isIntersecting) { w.target.classList.add("widoczny"); io.unobserve(w.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    elementy.forEach(function (e) { io.observe(e); });
  } else {
    elementy.forEach(function (e) { e.classList.add("widoczny"); });
  }

  /* paralaksa warstw papieru w hero */
  var warstwy = $$(".hero-warstwy .warstwa");
  if (warstwy.length && ruch) {
    var tik = false;
    window.addEventListener("scroll", function () {
      if (tik) return; tik = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, 900);
        warstwy.forEach(function (w) { w.style.transform = "translate3d(0," + (y * (+w.dataset.glebia || 0)) + "px,0)"; });
        tik = false;
      });
    }, { passive: true });
  }
})();
