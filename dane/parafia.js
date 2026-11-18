/*
  =====================================================================
  TREŚCI STRONY PARAFII
  To jedyny plik, który trzeba edytować, żeby zmienić treści na stronie.
  Zasady:
   - tekst zawsze w cudzysłowie "..."
   - po każdym elemencie listy przecinek
   - godziny w formacie "17:00"
   - daty w formacie "2026-11-29" (rok-miesiąc-dzień)
  Instrukcja krok po kroku: plik JAK-EDYTOWAC.md
  =====================================================================
*/

window.PARAFIA = {

  nazwa: "Parafia św. Marcina w Podwilku",
  adres: "34-722 Podwilk 289",
  proboszcz: "ks. Zbigniew Fidelus",
  telefon: "+48 780 050 801",
  telefonStacjonarny: "18 285 29 23",
  email: "kancelaria@parafia-podwilk.pl",
  mapa: "https://www.google.com/maps/search/?api=1&query=Podwilk+289",

  /* ---------------------------------------------------------------
     MSZE ŚWIĘTE
     sezon: "zima" albo "lato" (zmienia godzinę wieczornej Mszy)
  --------------------------------------------------------------- */
  sezon: "zima",
  msze: {
    niedziela: ["7:30", "9:00", "11:00", "15:00"],
    powszednie: { zima: ["6:30", "17:00"], lato: ["6:30", "18:00"] }
  },

  /* ---------------------------------------------------------------
     KANCELARIA (dni: pon, wt, sr, czw, pt, sob)
  --------------------------------------------------------------- */
  kancelaria: [
    { dni: "Wtorek, sobota", godziny: "7:00 – 7:30" },
    { dni: "Poniedziałek, czwartek, piątek", godziny: "17:30 – 18:30", lato: "18:30 – 19:30" }
  ],

  /* ---------------------------------------------------------------
     OGŁOSZENIA DUSZPASTERSKIE
     Nowe ogłoszenia wklej NA GÓRĘ listy. Starsze same trafią do archiwum.
  --------------------------------------------------------------- */
  ogloszenia: [
    {
      data: "2026-11-15",
      tytul: "XXXIII Niedziela Zwykła",
      punkty: [
        "W tym tygodniu wspominamy: we wtorek św. Elżbietę Węgierską, a w sobotę Ofiarowanie Najświętszej Maryi Panny.",
        "Dziś przypada Światowy Dzień Ubogich. Dary dla potrzebujących można złożyć do skarbon przy wyjściu z kościoła.",
        "W poniedziałek i wtorek po południu dodatkowa katecheza dla klas siódmych.",
        "We wtorek wieczorem próba scholi dziecięcej.",
        "W niedzielę o 17:00 nabożeństwo do św. Rity, a o 18:00 dodatkowa Msza święta. Pamiętamy też o św. Cecylii i modlimy się za organistę i muzyków.",
        "Przez cały listopad przed wieczorną Mszą odmawiamy Koronkę do Miłosierdzia Bożego i wypominki za zmarłych.",
        "Za tydzień Uroczystość Jezusa Chrystusa Króla Wszechświata, ostatnia niedziela roku liturgicznego.",
        "Za dwa tygodnie, 29 listopada, bp Janusz Mastalski wprowadzi do naszej świątyni relikwie św. Carla Acutisa. Na Mszę o 15:00 zapraszamy szczególnie trzecie klasy i kandydatów do bierzmowania z rodzicami.",
        "Serdeczne Bóg zapłać wszystkim, którzy pomogli przy odpuście parafialnym: kościelnemu, organiście, ministrantom, lektorom, scholi, orkiestrze, strażakom i wszystkim zaangażowanym.",
        "Solenizantom i jubilatom tygodnia życzymy obfitości Bożych łask."
      ]
    }
  ],

  /* ---------------------------------------------------------------
     INTENCJE MSZALNE (bieżący tydzień)
     Na wersji demonstracyjnej intencje są przykładowe.
  --------------------------------------------------------------- */
  intencjeTydzien: "16.11 – 22.11.2026",
  intencje: [
    { dzien: "2026-11-16", msze: [["6:30", "+ Za zmarłych z rodziny Nowaków"], ["17:00", "+ Za zmarłych rodziców i dziadków"]] },
    { dzien: "2026-11-17", msze: [["6:30", "+ Za zmarłą Teresę i rodziców"], ["17:00", "+ W 2. rocznicę śmierci Józefa"]] },
    { dzien: "2026-11-18", msze: [["6:30", "+ Za zmarłego Józefa z rodzicami"], ["17:00", "Nowenna. W podziękowaniu za 10 lat małżeństwa, z prośbą o dalsze łaski"]] },
    { dzien: "2026-11-19", msze: [["6:30", "+ Za zmarłych Karola i Krystynę"], ["17:00", "+ Za zmarłą Stefanię, męża i syna"]] },
    { dzien: "2026-11-20", msze: [["6:30", "+ W 3. rocznicę śmierci Jana"], ["17:00", "Do Miłosierdzia Bożego: intencje zbiorowe"]] },
    { dzien: "2026-11-21", msze: [["6:30", "+ Za zmarłych Martę i Henryka"], ["17:00", "+ Za zmarłą Cecylię z mężem i synem"]] },
    { dzien: "2026-11-22", msze: [["7:30", "O zdrowie i błogosławieństwo Boże dla rodziny"], ["9:00", "O opiekę Matki Bożej w 18. rocznicę urodzin"], ["11:00", "+ Za zmarłą Genowefę i Wendelina"], ["15:00", "W intencji parafii"], ["18:00", "W intencji czcicieli św. Rity"]] }
  ],

  /* ---------------------------------------------------------------
     WYDARZENIA (pokazują się tylko przyszłe)
  --------------------------------------------------------------- */
  wydarzenia: [
    { data: "2026-11-22", godzina: "", tytul: "Uroczystość Chrystusa Króla", opis: "Ostatnia niedziela roku liturgicznego." },
    { data: "2026-11-29", godzina: "15:00", tytul: "Relikwie św. Carla Acutisa", opis: "Bp Janusz Mastalski wprowadzi relikwie do naszego kościoła." },
    { data: "2026-12-11", godzina: "17:00", tytul: "Katecheza przed chrztem", opis: "Dla rodziców i chrzestnych, w drugi piątek miesiąca." },
    { data: "2027-05-01", godzina: "", tytul: "Pielgrzymka do Francji 2027", opis: "Szczegóły i zapisy w kancelarii." }
  ],

  /* ---------------------------------------------------------------
     AKTUALNOŚCI (zdjecie: adres zdjęcia albo plik w assets/img/)
  --------------------------------------------------------------- */
  aktualnosci: [
    { data: "2026-10-16", tytul: "Pielgrzymka do Francji 2027", zajawka: "Zapraszamy na parafialną pielgrzymkę do sanktuariów Francji. Program i zapisy w kancelarii.", zdjecie: "https://parafia-podwilk.pl/wp-content/uploads/2026/10/image005.jpg", link: "https://parafia-podwilk.pl/pielgrzymka-do-francji-2027/" },
    { data: "2026-10-01", tytul: "Różaniec z Matką Bożą z Luján", zajawka: "Październikowe nabożeństwa różańcowe w naszym kościele.", zdjecie: "https://parafia-podwilk.pl/wp-content/uploads/2026/10/rozaniec-2026-768x1024.jpg", link: "https://parafia-podwilk.pl/rozaniec-2026-z-matka-boza-z-lujan/" },
    { data: "2026-06-13", tytul: "Odpust na Danielkach", zajawka: "Zaproszenie na odpust ku czci Matki Bożej Siedmiobolesnej, Patronki Orawy.", zdjecie: "https://parafia-podwilk.pl/wp-content/uploads/2026/06/danielki-724x1024.jpg", link: "https://parafia-podwilk.pl/danielki/" },
    { data: "2026-04-25", tytul: "Relikwie bł. Zofii Czeskiej", zajawka: "Uroczyste wprowadzenie relikwii do naszej świątyni.", zdjecie: "https://parafia-podwilk.pl/wp-content/uploads/2026/04/IMG-20260427-WA00001-1024x768.jpg", link: "https://parafia-podwilk.pl/wprowadzenie-relikwii-bl-zofii-czeskiej/" }
  ],

  /* ---------------------------------------------------------------
     WSPARCIE PARAFII
  --------------------------------------------------------------- */
  konta: [
    { nazwa: "Konto parafii", bank: "BS w Jabłonce", numer: "07 8798 0002 0000 0000 2899 0001" },
    { nazwa: "Nowe ławy w kościele", bank: "BS w Jabłonce", numer: "71 8798 0002 0000 0000 2899 0013", cel: true }
  ]
};
