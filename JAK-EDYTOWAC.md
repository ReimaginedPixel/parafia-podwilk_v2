# Jak zmieniać treści na stronie

Wszystkie treści, które zmieniają się co tydzień, są w **jednym pliku**: `dane/parafia.js`.
Nie trzeba dotykać żadnego innego pliku.

## Nowe ogłoszenia (co niedzielę)

1. Otwórz `dane/parafia.js` i znajdź `ogloszenia: [`.
2. Skopiuj cały blok od `{` do `},` z ostatniej niedzieli i wklej go **nad nim**.
3. Zmień datę, tytuł i punkty. Każdy punkt to tekst w cudzysłowie, a po nim przecinek.

```js
{
  data: "2026-11-22",
  tytul: "Uroczystość Chrystusa Króla",
  punkty: [
    "Pierwsze ogłoszenie.",
    "Drugie ogłoszenie."
  ]
},
```

Strona główna zawsze pokazuje najnowsze ogłoszenia, a starsze same trafiają do archiwum.

## Intencje na nowy tydzień

Znajdź `intencje: [` i podmień dni. Każda Msza to para `["godzina", "intencja"]`.
Zmień też `intencjeTydzien`, np. `"23.11 – 29.11.2026"`.
Strona sama zaznacza dzisiejszy dzień.

## Godziny Mszy i kancelarii

- `sezon: "zima"` albo `sezon: "lato"` przełącza godzinę wieczornej Mszy i godziny kancelarii.
- Ramka „Najbliższa Msza” liczy się sama z godzin wpisanych w `msze`.

## Wydarzenia i aktualności

- `wydarzenia`: data, godzina, tytuł, krótki opis. Minione wydarzenia znikają same.
- `aktualnosci`: tytuł, krótki opis, zdjęcie i link do pełnego wpisu.

## Zdjęcia

Wrzuć plik do `assets/img/` i wpisz jego nazwę, np. `zdjecie: "assets/img/odpust-2026.jpg"`.
Zdjęcie z telefonu najlepiej zmniejszyć do około 1600 px szerokości (np. w Canvie albo w Paint), żeby strona ładowała się szybko.

Zdjęcia na stałe wbudowane w wygląd strony:

| Plik | Gdzie się pokazuje |
| --- | --- |
| `nawa.webp` | kolaż na stronie głównej, galeria w historii |
| `ambona.webp` | wycięta ambona w kolażu (Canva, usunięte tło) |
| `oltarz-glowny.webp`, `ambona-foto.webp`, `pieta-foto.webp`, `organy.webp` | sekcja „Nasz kościół” i galeria |
| `tablica-1715.webp` | galeria w historii |
| `kartusz.webp` | historia, obok osi czasu (Canva, usunięte tło) |
| `logo-parafii.png` | logo w nagłówku i stopce, sekcja „Nasz patron” |

Zdjęcia w nagłówkach Ogłoszeń, Intencji i Sakramentów są na razie wczytywane z obecnej strony parafii
(adres jest wpisany w danym pliku `.html`, w `<figure class="glowa-foto">`).

Żeby podmienić zdjęcie, wystarczy wgrać nowy plik pod tą samą nazwą.
Wycięcia z przezroczystym tłem robi się w Canvie: Edytuj zdjęcie → Usuń tło, potem pobierz jako PNG z przezroczystym tłem.

## Galeria: nowy album

Albumy są w osobnym pliku: `dane/galeria.js`. Najnowszy album wpisz na górze listy (pod „Wnętrzem kościoła”).

1. Wgraj zdjęcia do nowego folderu, np. `assets/galeria/odpust-2026/`.
2. Skopiuj w `dane/galeria.js` jeden blok od `{` do `},` i zmień go:

```js
{
  "slug": "odpust-2026",
  "tytul": "Odpust Matki Bożej Anielskiej",
  "data": "2026-08-02",
  "opis": "Krótki opis albumu.",
  "folder": "assets/galeria/odpust-2026/",
  "zdjecia": ["01.jpg", "02.jpg", "03.jpg"],
  "okladka": 0
},
```

- `slug` to krótka nazwa w adresie (bez polskich liter i spacji), np. `galeria.html#album=odpust-2026`.
- `okladka` to numer zdjęcia na okładce, liczony od zera (0 to pierwsze zdjęcie).
- Zamiast daty można wpisać własny opis czasu: `"kiedy": "Wielki Post 2026"`.
- Podpisy pod zdjęciami (nieobowiązkowe): `"podpisy": ["Procesja", "Ołtarz", "Orkiestra"]`.

Licznik „582 zdjęcia w 11 albumach”, okładki i strony albumów zrobią się same.
Na stronie głównej są odbitki z sześciu albumów. Które to albumy, ustawia się w `index.html`,
w atrybucie `data-galeria-skrot` (nazwy `slug` oddzielone przecinkami).

## Najczęstszy błąd

Brak przecinka albo cudzysłowu. Jeśli po zmianie strona jest pusta, sprawdź ostatnią edytowaną linijkę.

## Docelowo: WordPress

Ta wersja to gotowy projekt i działający prototyp. Przy wdrożeniu dla parafii ten sam wygląd
zostanie przeniesiony do motywu WordPress, żeby kancelaria dodawała ogłoszenia z panelu,
tak jak teraz, bez edytowania plików.
