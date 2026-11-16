# Parafia św. Marcina w Podwilku · nowa strona (v2)

Propozycja odświeżonej strony [parafia-podwilk.pl](https://parafia-podwilk.pl/).
Projekt i wykonanie: [konradkukula.dev](https://konradkukula.dev).

## Co jest w środku

- **Strona główna** z ilustracją z „wydartego papieru”: warstwy Tatr, Babiej Góry i orawskich pagórków, słońce i odręczny rysunek kościoła, który rysuje się przy wejściu na stronę.
- **Najbliższa Msza na żywo**: strona sama liczy, która Msza jest najbliższa i za ile się zaczyna.
- **Ogłoszenia i intencje** na pierwszym ekranie, intencje z wyborem dnia (dzisiejszy zaznaczony).
- **Sakramenty krok po kroku**: rozwijane listy dokumentów do kancelarii.
- **Historia, kontakt, numery kont** z kopiowaniem jednym kliknięciem.
- **Dostępność**: większy tekst (A, A+, A++), tryb wysokiego kontrastu, obsługa klawiaturą, poszanowanie ustawienia „ogranicz ruch”.
- Delikatne animacje przy przewijaniu i paralaksa warstw gór.

## Uruchomienie

To zwykła strona statyczna, bez instalowania czegokolwiek:

```bash
python3 -m http.server 8000
# otwórz http://localhost:8000
```

Można ją też od razu wystawić na GitHub Pages (Settings → Pages → branch `main`, folder `/`).

## Edycja treści

Wszystko, co zmienia się co tydzień, jest w `dane/parafia.js`. Instrukcja: [JAK-EDYTOWAC.md](JAK-EDYTOWAC.md).

## Struktura

```
index.html, ogloszenia.html, intencje.html, sakramenty.html, historia.html, kontakt.html
dane/parafia.js      treści (ogłoszenia, intencje, godziny, wydarzenia, konta)
js/uklad.js          wspólny nagłówek, stopka, menu, ułatwienia dostępu
js/strona.js         wypełnianie treści, najbliższa Msza, animacje
css/styl.css         wygląd
assets/svg/          logo, rysunek kościoła, warstwy gór
assets/fonts/        czcionki (Cormorant Garamond, Source Sans 3, IBM Plex Mono)
narzedzia/gory.py    generator warstw gór (python3 narzedzia/gory.py)
```

Intencje mszalne w wersji demonstracyjnej są przykładowe. Zdjęcia aktualności są wczytywane z obecnej strony parafii.
