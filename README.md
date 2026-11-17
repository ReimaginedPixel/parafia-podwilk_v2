# Parafia św. Marcina w Podwilku · nowa strona (v2)

Propozycja odświeżonej strony [parafia-podwilk.pl](https://parafia-podwilk.pl/).
Projekt i wykonanie: [konradkukula.dev](https://konradkukula.dev).

## Co jest w środku

- **Strona główna** z kolażem z prawdziwych zdjęć kościoła: podarte zdjęcie nawy, wycięta czarno-biała ambona, terakotowe koło i ukośna siatka, notatki jak w szkicowniku.
- **Nasz kościół**: ołtarz główny, ambona, Pieta i organy na zdjęciach z archiwum parafii, a na stronie historii galeria wnętrza.
- **Najbliższa Msza na żywo**: strona sama liczy, która Msza jest najbliższa i za ile się zaczyna.
- **Ogłoszenia i intencje** na pierwszym ekranie, intencje z wyborem dnia (dzisiejszy zaznaczony).
- **Sakramenty krok po kroku**: rozwijane listy dokumentów do kancelarii.
- **Historia, kontakt, numery kont** z kopiowaniem jednym kliknięciem.
- **Dostępność**: większy tekst (A, A+, A++), tryb wysokiego kontrastu, obsługa klawiaturą, poszanowanie ustawienia „ogranicz ruch”.
- Delikatne animacje przy przewijaniu i lekka paralaksa warstw kolażu.
- Polska typografia: jednoliterowe słowa („w”, „z”, „i”) nie zostają same na końcu linii.

## Zdjęcia

Wszystkie zdjęcia pochodzą z obecnej strony parafii (archiwum parafii). Nic nie jest generowane przez AI.
Wycięcia (ambona, ołtarz z Pietą, kartusz z malowidłem, logo z rysunkiem kościoła) zrobione są w Canvie
przez usunięcie tła, a potem tylko przycięte, zmniejszone i zapisane jako WebP.
Na obecnej stronie nie ma zdjęcia kościoła z zewnątrz, dlatego na zewnątrz kościół pokazuje rysunek z logo parafii.
Dobre zdjęcie elewacji (najlepiej w słoneczny dzień) można później podmienić w jednym miejscu.

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
assets/img/          zdjęcia i wycięcia z Canvy (WebP), logo parafii
assets/svg/          podarta krawędź sekcji (rozdarcie.svg)
assets/fonts/        czcionki (Cormorant Garamond, Source Sans 3, IBM Plex Mono)
```

Intencje mszalne w wersji demonstracyjnej są przykładowe. Zdjęcia aktualności są wczytywane z obecnej strony parafii.
