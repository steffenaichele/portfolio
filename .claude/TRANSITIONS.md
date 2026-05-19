# transitions-dev — Usage Guide

CSS transitions from [transitions.dev](https://transitions.dev), installed in `src/app/styles/globals.css`.

The `:root` variables and all class definitions are already present. Wire up the HTML hooks and (where noted) the JS orchestrator.

---

## 01 — Card resize

**Use:** Container tweens width/height on state change.

**HTML:** Add `.t-resize` to any element. Change its width/height via inline style or a state class.

```tsx
<div className="t-resize" style={{ width: isExpanded ? 400 : 200 }}>…</div>
```

No JS required beyond the state toggle.

---

## 02 — Number pop-in

**Use:** Counters, prices, balances — digits blur-slide in when value updates.

**HTML:**

```tsx
<span className="t-digit-group is-animating">
  <span className="t-digit">1</span>
  <span className="t-digit">2</span>
  <span className="t-digit" data-stagger="1">.</span>
  <span className="t-digit" data-stagger="2">3</span>
</span>
```

**JS orchestrator** (replay on value change):

```ts
const group = document.querySelector(".t-digit-group")!;

function setDigits(str: string) {
  group.classList.remove("is-animating");
  group.replaceChildren();
  str.split("").forEach((ch, i, arr) => {
    const span = document.createElement("span");
    span.className = "t-digit";
    span.textContent = ch;
    if (i === arr.length - 2) span.dataset.stagger = "1";
    else if (i === arr.length - 1) span.dataset.stagger = "2";
    group.appendChild(span);
  });
  void group.offsetHeight; // force reflow — required
  group.classList.add("is-animating");
}
```

**Direction:** set `--digit-dir-x` / `--digit-dir-y` to `1`, `-1`, or `0` to control enter direction.

---

## 03 — Notification badge

**Use:** Small badge slides onto a trigger (bell, inbox, button).

**HTML:** Trigger must have `position: relative`. Toggle `data-open` on `.t-badge`.

```tsx
<button style={{ position: "relative" }}>
  <BellIcon />
  <span className="t-badge" data-open="false">
    <span className="t-badge-dot">3</span>
  </span>
</button>
```

**State toggle:**

```ts
badge.setAttribute("data-open", "true");  // show
badge.setAttribute("data-open", "false"); // hide
```

No JS orchestrator — pure CSS attribute-driven.

**Positioning:** Default anchor is `top: -6px; right: -8px`. Override in your component styles if needed.

---

## 04 — Text states swap

**Use:** Status text swaps in place — "Speichern" → "Gespeichert", "Laden…" → "Fertig".

**HTML:**

```tsx
<span className="t-text-swap">Speichern</span>
```

**JS orchestrator** (three-phase sequence):

```ts
const el = document.querySelector(".t-text-swap")!;
const dur = parseFloat(
  getComputedStyle(document.documentElement).getPropertyValue("--text-swap-dur")
) || 200;

function swapText(next: string) {
  el.classList.add("is-exit");
  setTimeout(() => {
    el.textContent = next;
    el.classList.remove("is-exit");
    el.classList.add("is-enter-start");
    void el.offsetHeight; // force reflow — required
    el.classList.remove("is-enter-start");
  }, dur);
}
```

**Critical:** The `void el.offsetHeight` reflow between removing `.is-exit` / adding `.is-enter-start` and removing `.is-enter-start` is mandatory — without it the enter animation won't play.

---

## 05 — Menu dropdown

**Use:** Contextual menus, dropdowns, popovers — grows from the trigger.

**HTML:** Set `data-origin` to match where the trigger is relative to the dropdown.

```tsx
<div className="t-dropdown" data-origin="top-right">
  {/* menu contents */}
</div>
```

`data-origin` values: `top-left` | `top-center` | `top-right` | `bottom-left` | `bottom-center` | `bottom-right`

**JS orchestrator:**

```ts
const dropdown = document.querySelector(".t-dropdown")!;
const closeMs = parseFloat(
  getComputedStyle(document.documentElement).getPropertyValue("--dropdown-close-dur")
) || 150;

function openDropdown() {
  dropdown.classList.remove("is-closing");
  dropdown.classList.add("is-open");
}

function closeDropdown() {
  dropdown.classList.remove("is-open");
  dropdown.classList.add("is-closing");
  setTimeout(() => dropdown.classList.remove("is-closing"), closeMs);
}
```

**Critical:** The `setTimeout` cleanup on close is required. Without it, the next open will animate from the closing scale instead of the resting pre-open scale.

---

## Tuning variables

All variables live in the `:root` block in `globals.css` (search `transitions-dev — universal install`). Change values there — CSS custom property reads in JS (`getComputedStyle`) stay in sync automatically.

| Prefix | Transition |
|---|---|
| `--resize-*` | Card resize |
| `--digit-*` | Number pop-in |
| `--badge-*` | Notification badge |
| `--text-swap-*` | Text states swap |
| `--dropdown-*` | Menu dropdown |

---

## Accessibility

Every transition includes a `prefers-reduced-motion: reduce` guard that disables animation for users who requested it at OS level. Do not remove these blocks.
