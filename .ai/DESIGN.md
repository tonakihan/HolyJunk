# HolyJunk — Neo-Retro Design System

> Design system for a second-hand marketplace with an 8-bit/Neo-Retro aesthetic.
> Generated from 5 prototype screens: landing, products, item detail, seller dashboard, sell form.

---

## 1. Design Tokens

### 1.1 Color Palette

| Token        | Hex       | Role                              |
|--------------|-----------|-----------------------------------|
| `--bg`       | `#0a0a0a` | Page background                   |
| `--surface`  | `#161616` | Card / panel / header background  |
| `--fg`       | `#e8e8e8` | Primary text                      |
| `--muted`    | `#505050` | Secondary text, placeholder, icons|
| `--border`   | `#000000` | All borders, blocky edges         |
| `--accent`   | `#00f5d4` | Primary action cyan               |
| `--accent2`  | `#f7d44a` | Gold / secondary accent           |
| `--danger`   | `#ff3c5a` | Errors, sold, low HP, alerts      |
| `--success`  | `#39ff74` | High HP, active status            |
| `--warn`     | `#ffd000` | Medium HP, pending status         |

**Usage rules:**
- `--accent` (cyan): primary CTAs, active borders, price text, logo. Max 2 visible uses per screen.
- `--accent2` (gold): secondary CTAs, active nav item, seller name, ratings, badge backgrounds.
- `--danger`: sold badges, low health-bar, dispute status, required field markers.
- `--border` is pure black (`#000`) — all borders are 2–4px solid black, no rounded corners.
- `--muted` is the only mid-tone — no other grey added.

### 1.2 Typography

| Token             | Stack                                                |
|-------------------|------------------------------------------------------|
| `--font-display`  | `'Press Start 2P', 'VT323', 'Courier New', monospace` |
| `--font-body`     | `-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif` |
| `--font-mono`     | `'VT323', 'Courier New', monospace`                  |

**Size scale:**

| Context              | Size   | Letter-spacing | Font family      |
|----------------------|--------|----------------|------------------|
| Hero display         | 42px   | `0.06em`       | `--font-display` |
| Page title (H1)      | 20px   | `0.06em`       | `--font-display` |
| Section title (H2)   | 16–22px| `0.06em`       | `--font-display` |
| Card header (H3)     | 11–13px| `0.06em`       | `--font-display` |
| Body text            | 14–16px| `0`            | `--font-body`    |
| Price (large)        | 20–32px| `0.02em`       | `--font-mono`    |
| Price (small)        | 16px   | `0.02em`       | `--font-mono`    |
| Mono metadata        | 12–14px| `0.02em–0.04em`| `--font-mono`    |
| Nav link             | 11px   | `0.1em`        | `--font-display` |
| Button               | 11–13px| `0.08em`       | `--font-display` |
| Label / badge        | 8–10px | `0.06–0.08em`  | `--font-display` |
| Category chip        | 10px   | `0.08em`       | `--font-display` |
| Footer               | 10px   | `0.06em`       | `--font-display` |

**Rules:**
- All caps everywhere — always set `letter-spacing: 0.06em` minimum. Uppercase without tracking is the #1 AI-slop tell.
- Display font for headings, nav, buttons, labels, badges, footer.
- Body font for product descriptions, paragraph copy, long text.
- Mono font for prices, stats, numeric data, breadcrumbs, code-like metadata.
- Never mix `--font-display` and `--font-body` at the same size in the same block.

### 1.3 Spacing

Base unit: `4px` (the pixel grid).

| Token  | Value | Common use           |
|--------|-------|----------------------|
| `--px` | `4px` | Grid unit            |
|        | 8px   | Tight gap            |
|        | 12px  | Slot padding         |
|        | 14px  | Button padding       |
|        | 16px  | Card content, nav    |
|        | 20px  | Section padding      |
|        | 24px  | Panel padding        |
|        | 32px  | Grid gap             |
|        | 60px  | Section vertical     |

### 1.4 Borders

| Property       | Value            |
|----------------|------------------|
| Border width   | `2px` or `3px`   |
| Border color   | `var(--border)` — pure `#000` |
| Border-radius  | `0` — no rounding anywhere |
| Focus ring     | `var(--accent)` border-color |

### 1.5 Shadows

Flat shadows only — no blur:

```css
box-shadow: 4px 4px 0 var(--border);
```

Hover state pushes the shadow inward (2px offset); active state removes it (button sinks into the surface).

---

## 2. Component Catalog

### 2.1 Header / Navigation

```
┌─────────────────────────────────────────────────┐
│  HolyJunk  [Главная] [Товары] [Продать] [Кабинет]│
└─────────────────────────────────────────────────┘
```

- Logo: `--font-display`, `--accent` with `color: --accent2` on the "Junk" span. `text-shadow: 3px 3px 0 rgba(0,245,212,0.3)`.
- Nav items: pixel-bordered buttons (2px). `text-transform: uppercase`.
- Active nav: gold (`--accent2`) border + text. Inactive: `--muted`.
- Hover: shifts `translate(2px, 2px)` with `box-shadow: -2px -2px 0 var(--accent)`.
- Sticky at top with `box-shadow: 0 4px 0 rgba(0,245,212,0.08)`.
- Mobile: `flex-direction: column`, horizontal scroll nav.

### 2.2 Button (`.btn`)

```
┌──────────────────────┐
│  ✦ НАЧАТЬ ПОКУПКИ    │   ← `--accent` bg
└──────────────────────┘
```

| State    | Transform               | Shadow               |
|----------|-------------------------|----------------------|
| Default  | `translate(0, 0)`       | `4px 4px 0 black`    |
| Hover    | `translate(2px, 2px)`   | `2px 2px 0 black`    |
| Active   | `translate(4px, 4px)`   | `none` (sinks in)    |

- `border: 3px solid black`
- `text-transform: uppercase`, `letter-spacing: 0.08em`
- Primary: `background: var(--accent)`, `color: var(--bg)`
- Secondary (`.btn-secondary`/`.btn-outline`): transparent, accent border/text
- Disabled (`.btn-muted`): `background: var(--muted)`, `opacity: 0.5`
- Large (`.btn-lg`): `padding: 20px 40px`, `font-size: 15px`

### 2.3 Item Card (`.item-card`)

```
┌────────────────────┐
│ [      img        ]│  ← 180px, border-bottom: 3px
│ NEW badge (top-L)  │
├────────────────────┤
│ Vintage Levi's...  │  ← `--font-body`, weight 600
│ 2,500 ₽    | lvl.4│  ← price `--font-mono`, seller `--font-body`
│ Б/У     | Отлично  │  ← `--font-display`, 9px, caps
│ [████████░░░░] 85% │  ← health-bar (14px height)
├────────────────────┤
│ [✦ Купить]     [♡] │  ← footer with 2px black top border
└────────────────────┘
```

- Frame: `border: 3px solid black`, `background: var(--surface)`.
- On hover: cyan border, `translate(-2px, -2px)`, `box-shadow: 4px 4px 0 var(--accent)`.
- Image area: 180px high, `border-bottom: 3px solid black`.
- Price tag: `--font-mono`, `--accent` color. Old price: `line-through`, `--muted`.
- Seller: `lvl.N · username` — `--font-body`, small.
- Footer: `2px solid black` top border, buy button as primary CTA, like button as heart toggle.

### 2.4 Health-bar (`.health-bar` / `.hp-bar`)

```
[████████░░░░]  ┌──┐  ← 2px black border
 85%            │HP│  ← `--success` etc fill
 Отлично        └──┘
```

- Container: `14px` or `20px` high, `border: 2–3px solid black`.
- Fill classes:
  - `.green` → `background: var(--success)` — ≥ 67%
  - `.yellow` → `background: var(--warn)` — 34–66%
  - `.red` → `background: var(--danger)` — ≤ 33%
- Dithered overlay: `repeating-linear-gradient(90deg, transparent 0, transparent 4px, rgba(0,0,0,0.15) 4px, rgba(0,0,0,0.15) 5px)`.
- Labels: `--font-display`, 8–9px, caps, positioned above/below.

### 2.5 Category Card (`.category-card`)

```
┌────────────────┐
│  64×64 sprite  │  ← pixel-perfect square
│                │
│   ОДЕЖДА       │  ← `--font-display`, 11px, caps
│  ~ 1,240 лотов │  ← `--font-mono`
└────────────────┘
```

- `border: 3px solid black`, `background: var(--surface)`.
- Sprite area: 64×64, `border: 2px solid black`, `background: var(--bg)`.
- Hover: same card hover pattern (cyan border + shadow).
- Grid: `repeat(auto-fit, minmax(170px, 1fr))`.

### 2.6 Filter / Page Button (`.filter-btn`, `.page-btn`)

```
[ ВСЕ ] [ ОДЕЖДА ] [ ЭЛЕКТРОНИКА ]
```

- `border: 2px solid black`, `background: var(--surface)`.
- Default: `--muted` text. Active: `--accent2` text + border.
- Hover: `--accent` text + border, `translate(1px, 1px)`.
- Pagination uses `--font-mono` at 12px, same border/shape.

### 2.7 Tab Navigation (`.tab-nav button`)

```
[ ОПИСАНИЕ | ХАРАКТЕРИСТИКИ | ПРОДАВЕЦ | ОТЗЫВЫ · 12 ]
```

- `border-right: 2px solid black` between tabs.
- Active: `--accent2` text, `box-shadow: inset 0 -3px 0 var(--accent2)`.
- Hover: `--accent` text.

### 2.8 Form Fields (input, textarea, select)

- `background: var(--bg)`, `border: 3px solid black`.
- `.field label`: `--font-display`, 10px, caps, `--muted`.
- Focus: `border-color: var(--accent)`.
- Select: custom chevron via inline SVG data-URI.
- `.field-row`: 2-column grid on desktop, 1-column on mobile.

### 2.9 Seller Block (`.seller-block`)

```
┌────────────────────────────────────┐
│ [🧙]  RETRO_LOVER                  │
│       Ур. 4 · Продавец  ★★★★☆     │
│                       127 продаж   │
└────────────────────────────────────┘
```

- `border: 3px solid black`, `background: var(--surface)`.
- Avatar: 48×48, `border: 2px solid black`.
- Name: `--font-display`, `--accent2`, caps.
- Stats: `--font-mono`, `--muted`.

### 2.10 Player HUD (`.player-hud`)

```
┌────────────────────────────────────────┐
│ [🧙] RETRO_MERCHANT    [47,200] [18] [7]│
│      Lv. 12 · Продавец   Монет   Актив │
│      [████████░░░░] 68%         Продано│
└────────────────────────────────────────┘
```

- Avatar + name/level/exp bar on the left.
- HUD stats (`.hud-stat`): bordered boxes with mono value + label.
  - `.value.gold` → `color: var(--accent2)`
  - `.value.alert` → `color: var(--danger)`
- Exp bar: `height: 10px`, `fill: var(--accent2)`.

### 2.11 Inventory Slot (`.inv-slot`)

```
┌──────────┐
│ █ (green)│  ← status dot: green=active, yellow=pending, red=sold
│   👕     │  ← 28px sprite
│ LEVI'S   │  ← 8px display font, truncated
│   2,500  │  ← qty/price
└──────────┘
```

- `aspect-ratio: 1`, `border: 2px solid black`, `background: var(--bg)`.
- Empty slots: dashed border, reduced opacity, `+` icon.
- Grid: `repeat(auto-fill, minmax(140px, 1fr))`.

### 2.12 Panel (`.panel`)

```
┌──────────────────────────────────┐
│ [Заголовок]           [Кнопка]   │  ← panel-header, 3px bottom border
├──────────────────────────────────┤
│ ...content...                    │
└──────────────────────────────────┘
```

- `border: 3px solid black`, `background: var(--surface)`.
- `.panel-header`: flex row, 3px bottom border.
- `.panel-header h3`: `--font-display`, caps.
- `.panel-header .action`: small button with `border: 2px solid var(--accent)`.

### 2.13 Success Message (`.success-msg`)

- `border: 3px solid var(--success)`, background tinted green.
- Hidden by default, `.show` toggles display.

### 2.14 Photo Drop Zone (`.photo-zone`)

- `border: 3px dashed var(--border)`, `background: var(--bg)`.
- Hover: `border-color: var(--accent)`.
- Icon + helper text inside.

---

## 3. Layout Patterns

### 3.1 Page Structure

```
.scanline (fixed overlay)
header (sticky, container)
main.container (max-width: 1200px)
  .page-title / .hero / .toolbar
  .item-grid / .product-grid / .item-detail / .dash-grid
  .pagination / .tabs / .similar
footer (container)
```

### 3.2 Grid Systems

| Component       | Grid template                       |
|-----------------|-------------------------------------|
| Category cards  | `repeat(auto-fit, minmax(170px, 1fr))` |
| Item cards      | `repeat(auto-fit, minmax(250px, 1fr))` |
| Product catalog | `repeat(auto-fill, minmax(260px, 1fr))` |
| Inventory slots | `repeat(auto-fill, minmax(140px, 1fr))` |
| Similar items   | `repeat(auto-fill, minmax(220px, 1fr))` |
| Steps           | `repeat(auto-fit, minmax(200px, 1fr))` |
| Features        | `repeat(auto-fit, minmax(220px, 1fr))` |
| Dashboard       | `240px 1fr` (sidebar + main)        |
| Item detail     | `1fr 1fr` (gallery + info)          |

### 3.3 Sections

Each content section on the page is separated by a 3px black bottom border.

Section vertical rhythm: `60px padding` top and bottom for major sections, `20–32px` for sub-sections.

### 3.4 Tablet Breakpoint (601–900px / 768–800px)

| Component       | Change                                     |
|-----------------|--------------------------------------------|
| Item grid       | 2 columns                                  |
| Item detail     | Stack to 1 column                          |
| Dashboard       | Stack to 1 column                          |

### 3.5 Mobile Breakpoint (≤600px)

| Component       | Change                                     |
|-----------------|--------------------------------------------|
| Header          | Column layout, centered                    |
| Navigation      | Horizontal scroll (nowrap, overflow-x)     |
| Hero            | Smaller font (24px), compact padding       |
| Category grid   | 2 columns                                  |
| Item grid       | 1 column (or list view)                    |
| Product grid    | 1 column                                   |
| Form row        | 1 column                                   |
| Buttons         | Full width                                 |
| Tabs            | Smaller padding, scrollable                |

### 3.6 List View (products.html)

Toggle persists to localStorage as `hj_view`.

```
┌──────────────────────────────────────────────────────┐
│ [ 160×160  ]  │  Vintage Levi's Denim Jacket 90s    │
│     img      │  2,500 ₽            lvl.4 seller     │  ┌─────────┐
│              │  Б/У | Отлично                        │  │ ✦ Купить│
│              │  [██████░░░░]                          │  │   ♡     │
└──────────────┴────────────────────────────────────────┴──────────┘
```

---

## 4. Interaction Patterns

### 4.1 Arcade Button Press

All `.btn` elements animate a keystroke feel:
- Default: flat on surface, `box-shadow: 4px 4px 0 black`
- Hover: slight depression, `box-shadow: 2px 2px 0 black`
- Active/mousedown: fully pressed, `box-shadow: none`, `translate(4px, 4px)`
- Transition: `all 0.08s` (snappy)

### 4.2 Card Hover

Cards lift toward the viewer:
- Default: flat, `border: 3px solid black`
- Hover: shifts `(-2px, -2px)`, cyan border, shadow to bottom-right

### 4.3 Like Toggle

- Heart icon toggles between `♡` (outline, muted) and `♥` (filled, `--danger`)
- Class `.liked` manages the visual state

### 4.4 Tab Switch

- Click changes active tab, shows corresponding pane
- Active tab has gold bottom glow (`box-shadow: inset 0 -3px 0 var(--accent2)`)
- Content fades in via `display: block`

### 4.5 Health-bar Condition Slider (sell form)

- Range input styled as health-bar: height 32px, track with live gradient
- Color changes real-time: green (>66%) → yellow (34–66%) → red (≤33%)
- Pixel thumb: 18×42px, `--accent2` fill

### 4.6 Buy Button Micro-interaction

On click (item detail):
1. Text changes to "✦ Оформляем..."
2. Button disabled
3. After 800ms: "✦ Куплено!" + grey muted style

### 4.7 View Toggle Persistence

- Grid/list view choice saved to `localStorage` key `hj_view`
- Restored on page load

### 4.8 Scanline Overlay

Persistent CRT effect: `repeating-linear-gradient` creates horizontal lines across the full viewport. Subtle opacity (`0.06`), pointer-events: none.

### 4.9 Background Grid

Two subtle retro background layers:
1. `radial-gradient` glow at top center (cyan tint)
2. `repeating-linear-gradient` horizontal lines (scanline effect, 2px pitch, very faint)

### 4.10 Blinking Cursor (hero)

`.cursor` / `.blink` class uses `animation: blink 1s step-end infinite` to simulate a terminal cursor.

---

## 5. Page Map

| Page              | File              | Key sections                                                    |
|-------------------|-------------------|-----------------------------------------------------------------|
| Landing / Home    | `landing.html`    | Arcade hero, category grid, featured items, how-it-works steps  |
| Product Catalog   | `products.html`   | Search, filter chips, grid/list toggle, pagination              |
| Item Detail       | `item.html`       | Gallery, price+HP, seller block, tabs, similar items            |
| Seller Dashboard  | `dashboard.html`  | Player HUD, sidebar menu, inventory grid, activity table        |
| Sell Form         | `sell.html`       | Item info form, condition slider, photo upload, success state   |

---

## 6. CRT / Retro Effects

### Scanline Overlay

```css
.scanline {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  background: repeating-linear-gradient(
    0deg,
    transparent, transparent 3px,
    rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px
  );
}
```

### Background Scanlines

```css
body {
  background-image:
    radial-gradient(ellipse at 50% 0%, rgba(0,245,212,0.03) 0%, transparent 60%),
    repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,212,0.012) 2px, rgba(0,245,212,0.012) 4px);
}
```

### Dithered Overlay (on health-bar fills)

```css
.fill::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    90deg, transparent, transparent 4px,
    rgba(0,0,0,0.15) 4px, rgba(0,0,0,0.15) 5px
  );
}
```

---

## 7. CSS Custom Properties (complete)

```css
:root {
  --bg: #0a0a0a;
  --surface: #161616;
  --fg: #e8e8e8;
  --muted: #505050;
  --border: #000;
  --accent: #00f5d4;
  --accent2: #f7d44a;
  --danger: #ff3c5a;
  --success: #39ff74;
  --warn: #ffd000;
  --font-display: 'Press Start 2P', 'VT323', 'Courier New', monospace;
  --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-mono: 'VT323', 'Courier New', monospace;
  --px: 4px;
}
```

---

## 8. Do's and Don'ts

### Do
- Use `--accent` (cyan) sparingly — max 2 visible uses per screen
- Keep all borders `#000` — no grey borders
- Use `--font-display` for ALL caps text (nav, buttons, labels, badges)
- Use `--font-mono` for prices, numbers, breadcrumbs
- Use `--font-body` for product descriptions and long text
- Apply `letter-spacing: 0.06em` to all uppercase text
- Use flat pixel shadows, never `box-shadow` with blur
- 3px black border on major containers, 2px on minor elements

### Don't
- Don't use rounded corners anywhere
- Don't use gradient backgrounds on cards or buttons
- Don't use Inter, Roboto, or system-ui as display font
- Don't use indigo or purple as accent
- Don't use beige, warm, or pastel backgrounds
- Don't use box-shadow with blur — flat only
- Don't mix serif fonts — this is a pixel/mono/sans system
