# Architecture — Portfolio MVP

Stand: Juni 2026. Diese Spec beschreibt den **Zielzustand** des MVP, nicht den Ist-Zustand.
Sie ist die Referenz für die Linear-Tickets. Wo Ist ≠ Ziel, ist das markiert.

## 1. Seitenstruktur (Ziel: 2 Hauptseiten)

| Route        | Zweck                                          | Status Ist → Ziel |
|--------------|------------------------------------------------|-------------------|
| `/`          | Landing: About + CV-Section + Kontakt          | existiert, rendert noch `ProjectsSection` → muss raus |
| `/work`      | Card-Grid aller Arbeiten (Impressions)         | existiert als `/impressions` → umbenennen |
| `/imprint`   | Impressum (§5 TMG)                             | existiert, Platzhalter → befüllen |
| `/datenschutz` | Datenschutzerklärung                         | **fehlt** → neu anlegen |

**Entfällt komplett:**
- `/cv` (CV lebt als `CVSection` auf der Landing)
- `/projekte/[slug]` und alle Projekt-Detailseiten
- `_about-me/`, `_cv/`, `_projects/` (aktuell per `_`-Prefix deaktiviert) → endgültig löschen

## 2. Navigationsmodell

Light-weight, keine tiefen Hierarchien:
- Nav-Items: **About** (`/`) und **Work** (`/work`). Beides via i18n (EN default, DE).
- Footer enthält rechtliche Links (`/imprint`, `/datenschutz`) + Social-Links.
- Keine Projekt-Unterseiten — Detailtiefe entsteht durch **Inline-Aufklappen** der Cards.

### Header (Struktur + Optik neu)
Betrifft `Header.tsx`, `MobileNavigation.tsx`, `LanguageToggle.tsx`, `Logo.tsx`.
- Visuell neu gedacht: Layout, Logo-Platzierung, Sticky-Verhalten.
- Nav reduziert auf About/Work; Language-Toggle integriert.
- **Design zuerst in Figma**, dann Implementierung (analog Desktop-Layout).

### Footer (erweitert)
Betrifft `Footer.tsx`, ggf. `NotificationStackFooter.tsx`.
- Inhalt: Kontakt (E-Mail via `CopyEmailButton`), Social-Links (LinkedIn, GitHub, ...), Rechtslinks, Copyright.
- Semantisches `<footer>` mit direkten Kindern (keine überflüssigen Wrapper, kein `<section>` ohne Heading).

## 3. Card-Interaktionsmodell (zentrale Änderung)

**Ist:** `ImpressionCard` öffnet ein **Modal** (Focus-Trap, Escape, Backdrop — sauber gebaut, aber falsches Konzept).

**Ziel:** Cards **klappen inline auf** (Verhalten analog `CVItem`, aber als eigene Komponente neu gebaut — `CVItem` bleibt unangetastet).
- Aufgeklappt zeigt die Card optional einen `body` (Langtext), ggf. größeres Bild, später einen Prototyp.
- Keine Overlays, keine Routenwechsel.
- Eine Card = eine `Impression`. Optionaler `projectSlug` zieht Projekt-Kontext (Titel/Jahr) nach.

## 4. Datenmodell

Primärtyp pro Card ist **`Impression`**. `Project` bleibt als **Kontextquelle** erhalten (via `projectSlug`), aber ohne eigene Seiten.

Aktueller `Impression`-Typ:
```ts
export type Impression = {
  id: string;
  src: string;
  alt: string;
  square: boolean;
  label: string;
  context: string;
  link?: string;
  projectSlug?: string;
};
```

**Erweiterung fürs MVP:**
```ts
export type Impression = {
  // ... bestehend ...
  body?: string;        // optionaler Langtext für aufgeklappten Zustand (Markdown oder Plaintext)
  prototypeId?: string; // optional, Vorbereitung für spätere Prototyp-Einbettung (noch ungenutzt)
};
```
- `body` optional → manche Cards nur Bild, manche mit Text.
- `prototypeId` als Feld vorbereiten, Rendering-Logik **noch nicht** bauen (Post-MVP).

Bestehende Helper (`getProjectForImpression` etc.) bleiben gültig.

## 5. Komponenten-Cleanup

Doppelstrukturen auflösen:
- **Behalten/umbauen:** `ImpressionCard` (Modal → Inline-Aufklappen)
- **Entfernen oder neu zweckbinden:** `ProjectCard`, `ProjectsSection` (Projekte erscheinen nicht mehr als eigene Sektion/Karten)
- Prüfen, ob `Slideshow`, `TabGroup`/`Tab` noch gebraucht werden — sonst nicht löschen, nur dokumentieren (kein Scope-Creep).

## 6. Tech-Stack (Ist, bestätigt aus Code)

- Next.js App Router, TypeScript (strict)
- Tailwind v4 via `globals.css` (`@theme`), keine `tailwind.config.ts`
- **Fonts: PP Neue Montreal** (Display) + PP Neue Montreal Text — via `next/font` lokal. (Memory sagte fälschlich Geist.)
- `next-intl`, EN default / DE, kein URL-Locale-Prefix
- Sileo (Toasts), lucide-react (Icons via `Icon.tsx`)
- Vercel + Hostinger DNS

## 7. Nicht im MVP (bewusst aufgeschoben)

- Prototyp-Rendering (`PrototypeFrame`, dynamic registry) — nur Datenfeld vorbereiten
- View Transitions / Shared Element Transitions
- Puffy-Button-Hover-Effekt
- GSAP / aufwändige Seitenanimationen (STE-31 = Rabbit Hole, zuletzt)
