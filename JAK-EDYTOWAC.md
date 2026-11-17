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

Żeby podmienić zdjęcie, wystarczy wgrać nowy plik pod tą samą nazwą.
Wycięcia z przezroczystym tłem robi się w Canvie: Edytuj zdjęcie → Usuń tło, potem pobierz jako PNG z przezroczystym tłem.

## Najczęstszy błąd

Brak przecinka albo cudzysłowu. Jeśli po zmianie strona jest pusta, sprawdź ostatnią edytowaną linijkę.

## Docelowo: WordPress

Ta wersja to gotowy projekt i działający prototyp. Przy wdrożeniu dla parafii ten sam wygląd
zostanie przeniesiony do motywu WordPress, żeby kancelaria dodawała ogłoszenia z panelu,
tak jak teraz, bez edytowania plików.
