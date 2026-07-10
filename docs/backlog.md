# Backlog & Build Order — Portfolio MVP

Übersetzt die Specs in eine **dependency-geordnete** Reihenfolge (nicht Doc-Reihenfolge).
Grundlage für die Linear-Hierarchie. Reihenfolge = Baureihenfolge.

## Prinzip

Daten/Struktur zuerst → dann Komponenten → dann Content → dann Polish.
Jede Linear-Issue = eine versandfertige Einheit mit Akzeptanzkriterien + betroffenen Dateien.
Parent-Issues = Epics (Option A). Sub-Issues hängen darunter.

**Übergeordnetes Ziel: die Landing-Page muss ALLEIN bewerbungsfähig live gehen können**, bevor `/work` fertig ist. Daher zwei Phasen mit eigenem Live-Meilenstein.

---

## PHASE A — Landing live-fähig  *(höchste Prio)*

Ziel: `/` allein deploybar und für Bewerbungen nutzbar. Alles, was die Landing braucht.

### EPIC 1 — Struktur-Cleanup & Routing  *(zuerst, entblockt alles)*
- Deaktivierte `_about-me/`, `_cv/`, `_projects/` löschen
- `/impressions` → `/work` umbenennen (Route + Nav-Label i18n)
- `ProjectsSection` von Landing entfernen
- `ProjectCard`/`ProjectsSection` entfernen oder zweckbinden

### EPIC 2 — Header neu (Struktur + Optik)
- Figma-Design zuerst (Layout, Logo, Sticky, Language-Toggle)
- Implementierung: `Header.tsx`, `MobileNavigation.tsx`, `Logo.tsx`, `LanguageToggle.tsx`
- Nav reduziert auf About/Work

### EPIC 3 — Footer neu (erweitert)
- Inhalt: Kontakt, Social-Links (LinkedIn, GitHub), Rechtslinks, Copyright
- `Footer.tsx`, semantisches Markup
- Figma-Design empfohlen, kann mit Header zusammen entworfen werden

### EPIC 4 — Landing-Content
- About-Text final (2–3 Sätze)
- Hero-Bild(er) + Alt-Text (i18n)
- Kontakt-Bereich (CopyEmailButton)

### EPIC 5 — Rechtstexte  *(Live-Voraussetzung)*
- Impressum befüllen (§5 TMG)
- Datenschutz-Seite neu + Verifikation (e-recht24.de, Aufsicht BW)

### EPIC 6 — Desktop-Layout Landing
- Figma + Implementierung, nur `/` + Rechtstexte
- (Work-Desktop folgt in Phase B)

> **MEILENSTEIN: Landing live** — nach Phase A bewirbst du dich mit der Seite.

---

## PHASE B — Work-Seite & Detailtiefe

### EPIC 7 — Datenmodell erweitern
- `Impression` um `body?` + `prototypeId?` erweitern
- `prototypeId` nur Feld, keine Render-Logik

### EPIC 8 — Work-Card: Modal → Inline-Aufklappen
- Modal-Logik entfernen, Expand-State + Height-Transition
- a11y (`aria-expanded`/`aria-controls`), optionaler `body`, reduced-motion
- Offen: mehrere Cards gleichzeitig offen? (Default: ja, simpler State)

### EPIC 9 — Work-Content
- Echte Impression-Bilder + `alt` (i18n)
- `label`/`context`/`body` final
- Placeholder ersetzen

### EPIC 10 — Desktop-Layout Work
- Figma + Implementierung `/work`

### EPIC 11 — Polish  *(zuletzt, Rabbit-Hole-Zone — hart timeboxen)*
- CV Open-States (ehem. STE-30)
- Seitenanimationen CSS-only (ehem. STE-31)
- Footer-Scroll-Animation (ehem. STE-14)
- GSAP (STE-15): fraglich, CSS-only bevorzugt → ggf. verwerfen


## Mapping: alte Tickets → neuer Plan

| Alt | Titel | Aktion |
|-----|-------|--------|
| STE-23 | Projects (In Progress) | schließen — Konzept ersetzt durch Work-Cards |
| STE-24 | Create projectCards (Done) | bleibt Done, Komponente wird abgelöst |
| STE-25 | Select project images (In Progress) | → EPIC 9 (echte Bilder) |
| STE-19/20/21 | About Me + Description + Images | → EPIC 4 (Landing-Content) |
| STE-27 | Impressum befüllen | → EPIC 5 |
| STE-28 | About-Text + Bilder | → EPIC 4 |
| STE-29 | Desktop-Layout aller Seiten | aufteilen → EPIC 6 (Landing) + EPIC 10 (Work) |
| STE-30 | CV Open States | → EPIC 11 |
| STE-31 | Seitenanimationen | → EPIC 11 |
| STE-14 | Footer (Scroll-Anim) | Inhalt → EPIC 3, Animation → EPIC 11 |
| STE-15 | GSAP | → EPIC 11 (fraglich, CSS-only bevorzugt) |
| STE-17/13/18 | Header/MobileNav/Logo (Done) | bleibt Done, wird durch EPIC 2 abgelöst |

## Empfohlene Bearbeitungsreihenfolge (für Claude Code)

**Phase A:** 1 → (2 ∥ 3, Figma gemeinsam) → 4 → 5 → 6 → **Landing live**
**Phase B:** 7 → 8 → 9 → 10 → 11

- EPIC 1 entblockt alles, immer zuerst.
- EPIC 2+3 (Header/Footer) teilen sich eine Figma-Session.
- EPIC 5 (Recht) ist unabhängig, jederzeit parallel machbar.
- EPIC 4 (Content) ist der eigentliche Live-Blocker laut Steffen.
- Phase B startet erst nach Landing-Live-Meilenstein.

