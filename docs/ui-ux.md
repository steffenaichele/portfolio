# UI/UX — Portfolio MVP

Referenz für alle UI-Tickets. Beschreibt Verhalten und Akzeptanzkriterien auf Konzeptebene;
konkrete Klassen/Tokens entstehen in der Implementierung gegen den bestehenden Code.

## 1. Landing (`/`)

Reihenfolge der Sektionen:
1. **Hero / About** — Begrüßung (`h1`), 2–3 Absätze About-Text. Ggf. Bild.
2. **CV-Section** — bestehende `CVSection` mit aufklappbaren `CVItem`s. Unangetastet lassen.
3. **Kontakt** — E-Mail via `CopyEmailButton` (Sileo-Toast), ggf. Links.

`ProjectsSection` wird **entfernt** (Arbeiten leben auf `/work`).

Genau ein `h1` pro Seite. Headings nie überspringen. `<section>` immer mit eigenem Heading.

## 2. Work (`/work`)

- Grid aus **Work-Cards** (umgebaute `ImpressionCard`).
- Layout aus Ist übernehmen: `square` → 1 Spalte, sonst breitere Card; responsives Grid (mobil 4-col-Basis, Desktop 4-col mit col-span).
- Karten zeigen geschlossen: `label`, `context`, Bild, optional externer Link-Button.

### Card-Aufklappen (ersetzt Modal)

**Verhalten:**
- Klick auf Card toggelt aufgeklappten Zustand **inline** (kein Modal, kein Backdrop, kein Routenwechsel).
- Aufgeklappt: größere/vollständige Bilddarstellung + optionaler `body`-Text + optionaler Link-Button.
- Nur eine Card gleichzeitig offen ODER mehrere — **Entscheidung offen, im Ticket festlegen** (Default-Vorschlag: mehrere erlaubt, simpler State).
- Smooth Height-Transition (CSS, prefers-reduced-motion respektieren).

**Accessibility:**
- Trigger ist `<button>` mit `aria-expanded`.
- Aufgeklappter Inhalt via `id` + `aria-controls` referenziert.
- Kein Focus-Trap nötig (kein Modal). Fokus bleibt natürlich im Flow.
- Bestehende a11y-Patterns aus Modal (Labels, i18n-Texte) sinngemäß übernehmen, Modal-spezifisches (Escape-to-close, Backdrop, Body-Scroll-Lock) entfällt.

**Migration:** Modal-Code (`modalRef`, `backdropRef`, Focus-Trap, Escape-Handler, Body-Overflow-Lock) wird entfernt. `triggerRef`/`mounted`-Logik wird zu Expand-State.

## 3. Content-Anforderungen (MVP-Blocker laut Steffen)

Content ist der Haupt-Blocker. Pro Arbeit:
- Echtes Bild (kein Placeholder) in `/public/impressions/`
- `label`, `context` final
- Optional `body` (Langtext) für Arbeiten, die mehr Erklärung verdienen
- Korrekter `alt`-Text (i18n)
- Echte Projekt-Bilder ersetzen `placeholder-*.jpg` und doppelte `museum-exhibit.jpg`

About-Text (2–3 Sätze, authentisch) + Hero-Bild(er) mit Alt-Text.

## 4. Desktop-Layout

Zwei Breakpoints: mobil + 1280px Desktop. Mobile-first.
Desktop-Design in Figma **vor** Implementierung. Scope: nur die **2 aktiven Seiten** (`/`, `/work`) + Rechtstexte — **nicht** mehr CV-/Projekt-Detailseiten (entfallen).

## 5. Rechtstexte

- **Impressum** (`/imprint`): Name, Anschrift, E-Mail nach §5 TMG. Platzhalter ersetzen.
- **Datenschutz** (`/datenschutz`): neu. Gegen Generator (e-recht24.de) verifizieren. Zuständige Aufsicht: Baden-Württemberg.

## 6. Bewusst aufgeschoben (kein MVP)

- Puffy/Balloon-Hover für Pill-Buttons (SVG feMorphology) — Detail-Polish
- Seitenübergänge/View Transitions
- Mehrere Bilder pro Card / Slideshow im aufgeklappten Zustand
- Prototyp-Einbettung im Card-Body
