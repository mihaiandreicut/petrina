# Site Petrina Andreicuț · Psiholog clinician și psihoterapeut

Site de prezentare de tip **one page**, static (HTML + CSS + puțin JavaScript), fără pas de build și
fără dependențe. Poate fi găzduit oriunde: GitHub Pages, Netlify, Cloudflare Pages sau orice hosting clasic.

## Structură

Tot conținutul este în `index.html`, pe secțiuni. Meniul și punctele din dreapta ecranului duc la fiecare secțiune:

| Secțiune | Ancoră | Ce conține |
| --- | --- | --- |
| Acasă | `#acasa` | titlul principal, fotografia, butonul de programare |
| Despre mine | `#despre` | prezentare și taburi: Povestea mea, Metode, Parcurs profesional |
| Servicii | `#servicii` | slider cu cele 7 servicii; „Află mai multe” deschide o fereastră cu detaliile |
| Cum lucrez | `#abordare` | cele patru principii și apelul la programare |
| Cabinet | `#cabinet` | textul despre cabinet, adresa și un slider cu fotografii |
| Întrebări | `#intrebari` | întrebări frecvente |
| Contact | `#contact` | datele de contact și formularul |
| Resurse | `#resurse` | ascunsă până la publicarea articolelor (vezi mai jos) |

Alte fișiere: `confidentialitate.html` (Politica de confidențialitate, de completat) și `404.html`.

Elemente interactive:

- **slidere cu puncte (bullets)** și săgeți pentru servicii și pentru fotografiile cabinetului.
  Pe telefon se derulează cu degetul.
- **navigare laterală cu puncte**, pe ecranele late, care arată secțiunea curentă.
- **bară de progres** a derulării sub meniu și buton „înapoi sus”.
- **ferestre (dialog)** cu detaliile fiecărui serviciu.
- **taburi** în secțiunea Despre mine.
- **bandă animată** cu temele de lucru, animații discrete la derulare.

Animațiile se opresc automat pentru cei care au activat „reducerea mișcării” în sistem. Dacă
JavaScript nu se încarcă, tot conținutul rămâne vizibil: detaliile serviciilor apar sub carduri,
iar taburile apar unul sub altul.

## Vizualizare locală

```bash
python3 -m http.server 8000
# apoi deschide http://localhost:8000
```

## Ce mai trebuie completat

Textele de completat sunt marcate pe site cu **fundal galben** (clasa `todo`). După completare,
șterge și marcajul `<span class="todo" …>…</span>`, păstrând doar textul.

- **Întrebări frecvente:** numele platformei online, dacă tariful online este același,
  politica de anulare (numărul de ore și ce se întâmplă cu ședințele anulate târziu).
- **Servicii → Intervenție în criză** (în fereastra de detalii): în câte zile oferi de regulă
  o programare (`[X zile]`).
- **Despre mine → Povestea mea:** ce ai făcut și ce ai învățat în cei aproape zece ani.
- **Politica de confidențialitate** (`confidentialitate.html`): întreaga pagină, necesară pentru
  formularul de contact. Ideal, textul final e verificat de un specialist în protecția datelor.
- **Resurse:** articolele (vezi mai jos).

### Fotografii

Momentan, în locul fotografiilor apar substituenți („Fotografie profesională”, „Fotografie cabinet 1–3”).
Pune fotografiile în `assets/img/` și înlocuiește fiecare bloc `<div class="photo-placeholder">…</div>`
cu eticheta `<img>` sugerată în comentariul HTML de deasupra lui, de exemplu:

```html
<img src="assets/img/petrina.jpg" alt="Petrina Andreicuț, psiholog clinician și psihoterapeut" width="800" height="1000">
```

Sliderul cu fotografii din secțiunea Cabinet primește automat câte un punct pentru fiecare fotografie.
Poți adăuga oricâte: copiază un bloc `<div class="photo">…</div>` în interiorul `slider-track`.

Recomandări: fotografia de profil pe verticală (4:5), fotografiile de cabinet tot pe verticală (4:5),
exportate în JPG sau WebP, sub 300 KB fiecare.

## Formularul de contact

Un site static nu poate trimite e-mailuri singur, așa că formularul are nevoie de un serviciu extern.
Formularul este pregătit pentru [Formspree](https://formspree.io):

1. Creează un formular în Formspree, cu adresa `petrina.andreicut@gmail.com`.
2. În `index.html`, înlocuiește `ID_FORMULAR` din `action="https://formspree.io/f/ID_FORMULAR"`
   cu ID-ul primit.
3. Menționează serviciul în Politica de confidențialitate.

Până la configurare, butonul „Trimite mesajul” deschide aplicația de e-mail a vizitatorului, cu
mesajul deja completat. Formularul funcționează deci și acum.

## Publicarea secțiunii Resurse

Secțiunea există în `index.html`, dar are atributul `hidden`, deci nu se vede. Când ai 2–3 articole:

1. Completează cardurile din secțiunea `#resurse` (titlu, primul paragraf, imagine, link).
2. Șterge atributul `hidden` de pe `<section … id="resurse" … hidden>`.
3. Adaugă „Resurse” în meniu, în subsol și în punctele laterale (`side-dots`), în `index.html`,
   și în meniul/subsolul din `confidentialitate.html` și `404.html`.

## După publicarea pe un domeniu

- Adaugă `<link rel="canonical" href="https://domeniu.ro/">` și `og:url`.
- Adaugă o imagine pentru distribuirea pe rețele sociale (`og:image`, 1200×630 px).
- Creează un `sitemap.xml` și trimite-l în Google Search Console.
- Creează un profil Google Business pentru cabinet, cu aceeași adresă și același telefon.

## Detalii tehnice

- **Structură:** `assets/css/style.css` (tot stilul, cu variabile de culoare în `:root`) și
  `assets/js/main.js` (meniu mobil, slidere, ferestre, taburi, secțiunea curentă, bara de progres,
  formularul). Fără biblioteci externe.
- **Fonturi:** Fraunces (titluri) și Manrope (text), găzduite local în `assets/fonts/`, cu toate
  diacriticele românești. Nu se fac cereri către Google Fonts sau alți terți. Licență SIL OFL 1.1.
- **Pictograme:** desenate după setul [Lucide](https://lucide.dev) (licență ISC, vezi
  `assets/LICENSE-icons.txt`).
- **Accesibilitate:** HTML semantic, link „Sari la conținut”, navigare completă din tastatură
  (inclusiv slidere, taburi cu săgeți și ferestre închise cu Esc), contrast WCAG AA.
- **SEO:** titlu și descriere, plus date structurate schema.org (`MedicalBusiness`).
