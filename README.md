# Site Petrina Andreicuț · Psiholog clinician și psihoterapeut

Site de prezentare de tip **one page**, static (HTML + CSS + puțin JavaScript), fără pas de build și
fără dependențe. Poate fi găzduit oriunde: GitHub Pages, Netlify, Cloudflare Pages sau orice hosting clasic.

## Structură

Tot conținutul este în `index.html`, pe secțiuni. Meniul și punctele din dreapta ecranului duc la fiecare secțiune:

| Secțiune | Ancoră | Ce conține |
| --- | --- | --- |
| Acasă | `#acasa` | titlul principal, fotografia, butonul de programare |
| Despre mine | `#despre` | prezentare și taburi: Povestea mea, Metode, Parcurs; butonul „Citește mai multe despre parcursul meu” deschide tabul Parcurs |
| Servicii | `#servicii` | slider cu cele 7 servicii („Află mai multe” deschide o fereastră cu detaliile) și apelul la programare |
| Ce vei găsi | `#abordare` | Confidențialitate și Empatie |
| Cabinet | `#cabinet` | textul despre cabinet, adresa și un slider cu fotografii |
| Resurse | `#resurse` | textul introductiv și grila de articole |
| Întrebări | `#intrebari` | întrebări frecvente |
| Contact | `#contact` | datele de contact și formularul (nume, telefon, mesaj) |

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

- **Ce vei găsi în lucrul cu mine → Empatie:** o frază scurtă, ca la Confidențialitate.
- **Resurse:** articolele (vezi mai jos).
- **Politica de confidențialitate** (`confidentialitate.html`): întreaga pagină. Formularul trimite
  date personale (nume, telefon), iar sub buton există un link către această pagină. Ideal, textul
  final e verificat de un specialist în protecția datelor.

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

## Articole în secțiunea Resurse

Secțiunea afișează o grilă de carduri (imagine, titlu, primul paragraf). Momentan sunt trei carduri
de completat. Pentru fiecare articol, completează un `<article class="article-card">` din `#resurse`
(imaginea, titlul, primul paragraf și linkul către articol); pentru mai multe articole, copiază un card.

Dacă vrei să ascunzi secțiunea până ai articole, adaugă atributul `hidden` pe
`<section class="section" id="resurse" …>` și scoate „Resurse” din meniu, subsol și punctele laterale.

## Publicare (GitHub Pages)

Site-ul se publică din ramura `main`, din rădăcina repository-ului (fișierul `.nojekyll` oprește
procesarea Jekyll, deci fișierele se servesc exact cum sunt). Setarea se face o singură dată:
**Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.

Adresa site-ului este `https://mihaiandreicut.github.io/petrina/`. După fiecare modificare unită în
`main`, site-ul se actualizează singur în aproximativ un minut.

## Modificări cu Claude Code

Claude Code poate lucra direct în GitHub: scrie `@claude` și cererea într-un issue nou sau într-un
comentariu (de exemplu „@claude adaugă fotografia din assets/img/petrina.jpg în prima secțiune”).
Claude face modificarea pe o ramură nouă și deschide un pull request; după ce îl unești în `main`,
modificarea apare pe site. Regulile pe care le urmează sunt în `CLAUDE.md`.

Configurare (o singură dată):

1. Aplicația [Claude GitHub](https://github.com/apps/claude) trebuie să fie instalată pe acest repository.
2. Pe un calculator cu Claude Code instalat, rulează `claude setup-token` și copiază tokenul afișat.
3. În **Settings → Secrets and variables → Actions → New repository secret**, creează secretul
   `CLAUDE_CODE_OAUTH_TOKEN` cu tokenul copiat. Rulările folosesc abonamentul Claude.

Doar persoanele cu drept de scriere în repository pot porni Claude. Fluxul de lucru este în
`.github/workflows/claude.yml`. Poți lucra cu Claude Code și din [claude.ai/code](https://claude.ai/code),
alegând acest repository.

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
