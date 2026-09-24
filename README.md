# Site Petrina Andreicuț · Psiholog clinician și psihoterapeut

Site de prezentare, static (HTML + CSS + puțin JavaScript), fără pas de build și fără dependențe.
Poate fi găzduit oriunde: GitHub Pages, Netlify, Cloudflare Pages sau orice hosting clasic.

## Pagini

| Fișier | Pagină | În meniu |
| --- | --- | --- |
| `index.html` | Prima pagină | da |
| `servicii.html` | Servicii (cu ancore pentru fiecare serviciu, de ex. `servicii.html#desen-oniric`) | da |
| `despre.html` | Despre mine | da |
| `cabinet.html` | Cabinet | da |
| `contact.html` | Contact și formular de programare | da |
| `resurse.html` | Resurse / articole (ascunsă, `noindex`, vezi mai jos) | nu |
| `confidentialitate.html` | Politica de confidențialitate (schelet de completat) | în subsol |
| `404.html` | Pagină de eroare | nu |

Antetul și subsolul sunt identice pe toate paginile. O modificare în meniu sau în datele de
contact trebuie făcută în toate fișierele `.html`.

## Vizualizare locală

```bash
python3 -m http.server 8000
# apoi deschide http://localhost:8000
```

## Ce mai trebuie completat

Textele de completat sunt marcate pe site cu **fundal galben** (clasa `todo`). După completare,
șterge și marcajul `<span class="todo" …>…</span>`, păstrând doar textul.

- **Prima pagină, Întrebări frecvente:** numele platformei online, dacă tariful online este același,
  politica de anulare (numărul de ore și ce se întâmplă cu ședințele anulate târziu).
- **Servicii, Intervenție în criză:** în câte zile oferi de regulă o programare (`[X zile]`).
- **Despre mine:** ce ai făcut și ce ai învățat în cei aproape zece ani.
- **Politica de confidențialitate:** întreaga pagină (e necesară pentru formularul de contact).
  Ideal, textul final e verificat de un specialist în protecția datelor.
- **Resurse:** articolele (vezi mai jos).

### Fotografii

Momentan, în locul fotografiilor apar substituenți („Fotografie profesională”, „Fotografie cabinet”).
Pune fotografiile în `assets/img/` și înlocuiește fiecare bloc `<div class="photo-placeholder">…</div>`
cu eticheta `<img>` sugerată în comentariul HTML de deasupra lui, de exemplu:

```html
<img src="assets/img/petrina.jpg" alt="Petrina Andreicuț, psiholog clinician și psihoterapeut" width="800" height="1000">
```

Recomandări: fotografia de profil pe verticală (4:5), fotografiile de cabinet în format landscape,
exportate în JPG sau WebP, sub 300 KB fiecare.

## Formularul de contact

Un site static nu poate trimite e-mailuri singur, așa că formularul are nevoie de un serviciu extern.
Formularul este pregătit pentru [Formspree](https://formspree.io):

1. Creează un formular în Formspree, cu adresa `petrina.andreicut@gmail.com`.
2. În `contact.html`, înlocuiește `ID_FORMULAR` din `action="https://formspree.io/f/ID_FORMULAR"`
   cu ID-ul primit.
3. Menționează serviciul în Politica de confidențialitate.

Până la configurare, butonul „Trimite mesajul” deschide aplicația de e-mail a vizitatorului, cu
mesajul deja completat. Formularul funcționează deci și acum.

## Publicarea paginii Resurse

Pagina există, dar nu apare în meniu și nu este indexată de motoarele de căutare. Când ai 2–3 articole:

1. Completează cardurile din `resurse.html` (titlu, primul paragraf, imagine, link).
2. Șterge rândul `<meta name="robots" content="noindex">` din `resurse.html`.
3. Adaugă `<li><a href="resurse.html">Resurse</a></li>` în meniu și în subsol, pe toate paginile.

## După publicarea pe un domeniu

- Adaugă `<link rel="canonical" href="https://domeniu.ro/…">` și `og:url` pe fiecare pagină.
- Adaugă o imagine pentru distribuirea pe rețele sociale (`og:image`, 1200×630 px).
- Creează un `sitemap.xml` și trimite-l în Google Search Console.
- Creează un profil Google Business pentru cabinet, cu aceeași adresă și același telefon.

## Detalii tehnice

- **Structură:** `assets/css/style.css` (tot stilul, cu variabile de culoare în `:root`),
  `assets/js/main.js` (meniul mobil, animațiile la derulare, cuprinsul paginii Servicii, formularul).
- **Fonturi:** Fraunces (titluri) și Manrope (text), găzduite local în `assets/fonts/`, cu toate
  diacriticele românești. Nu se fac cereri către Google Fonts sau alți terți. Licență SIL OFL 1.1.
- **Pictograme:** desenate după setul [Lucide](https://lucide.dev) (licență ISC, vezi
  `assets/LICENSE-icons.txt`).
- **Accesibilitate:** HTML semantic, link „Sari la conținut”, navigare completă din tastatură,
  contrast WCAG AA și respectarea setării „reduce motion” a sistemului.
- **SEO:** titlurile și descrierile paginilor, plus date structurate schema.org (`MedicalBusiness`)
  pe prima pagină.
