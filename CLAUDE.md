# Instrucțiuni pentru Claude Code

Site de prezentare one-page pentru Petrina Andreicuț, psiholog clinician și psihoterapeut (Sibiu).
HTML + CSS + JavaScript simplu, fără build și fără dependențe. Publicat cu GitHub Pages din
ramura `main` (rădăcina repository-ului); orice modificare unită în `main` apare pe site în ~1 minut.

## Fișiere

- `index.html`: tot site-ul, pe secțiuni (`#acasa`, `#despre`, `#servicii`, `#abordare`, `#cabinet`,
  `#resurse`, `#intrebari`, `#contact`). Detaliile serviciilor sunt în elemente `<dialog class="modal">`.
- `confidentialitate.html`, `404.html`: pagini secundare, cu același antet și subsol.
- `assets/css/style.css`: tot stilul. Culorile, fonturile și spațierile sunt variabile în `:root`.
- `assets/js/main.js`: meniu mobil, slidere, ferestre, taburi, secțiunea curentă, formular.
- `assets/fonts/`: fonturile Fraunces și Manrope, găzduite local.
- `README.md`: ghid pentru proprietar (ce e de completat, fotografii, formular).

## Reguli

- **Textul site-ului e în limba română**, cu diacritice corecte (ș, ț cu virgulă dedesubt) și
  ghilimele „ ”. Nu inventa text despre servicii, calificări sau prețuri: folosește doar textul
  primit de la Petrina. Ce lipsește se marchează cu
  `<span class="todo" title="De completat">[…]</span>`.
- **Antetul, meniul și subsolul** apar în `index.html`, `confidentialitate.html` și `404.html`.
  Orice schimbare acolo se face în toate trei. O secțiune nouă se adaugă și în meniu, în subsol
  și în navigarea laterală (`.side-dots`).
- **Fără resurse externe**: fără CDN-uri, Google Fonts, analytics sau trackere. Site-ul nu face
  cereri către terți (confidențialitate și viteză).
- **Stil**: folosește variabilele din `:root`, nu culori noi scrise direct. Păstrează contrastul
  WCAG AA.
- **Accesibilitate**: HTML semantic, `alt` pe imagini, `aria-label` pe butoanele fără text,
  navigare din tastatură, `prefers-reduced-motion` respectat. Conținutul trebuie să rămână vizibil
  și fără JavaScript (stilurile dependente de JS stau sub clasa `.js` de pe `<html>`).
- **Imagini**: în `assets/img/`, JPG sau WebP sub 300 KB, cu `width`/`height`; `loading="lazy"`
  pentru cele de sub prima secțiune.
- Nu șterge avertismentul despre urgențe (112) din subsol și din fereastra „Intervenție
  Psihologică în Criză” fără o cerere explicită.

## Verificare înainte de pull request

1. `python3 -m http.server 8000`, apoi verifică pagina la lățime de telefon (390px) și desktop
   (1440px): fără derulare orizontală, meniul mobil, sliderele, ferestrele și formularul funcționează.
2. Dacă `npx` e disponibil: `npx --yes html-validate index.html confidentialitate.html 404.html`.

## Flux de lucru

Lucrează pe o ramură nouă și deschide un pull request către `main`. Nu împinge direct în `main`.
Descrie în PR, pe scurt și în română, ce s-a schimbat pe site.
