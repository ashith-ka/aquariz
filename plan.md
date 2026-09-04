# Professional Website Polish Plan — Aquariz & Flanora

## Core Problems Identified

| Issue | Current | Professional Fix |
|-------|---------|------------------|
| **Border radius overuse** | `var(--radius-sm:8px)`, `md:14px`, `lg:22px`, `full:9999px` everywhere — cards, buttons, inputs, badges, chips, images | Use **sharp or subtle radii only**: 4px for buttons/inputs, 8px for cards, 0px for images/tables. Full-round only for pills/avatars |
| **Font weights abused** | 300-800 all over; headings 800, body 400, buttons 700-800, labels 700 | **2-3 weights max**: Display 600/700, Body 400/500, UI 500/600. Never 300 or 800 for body text |
| **Spacing inconsistency** | Random padding: 0.35rem, 0.4rem, 0.45rem, 0.55rem, 0.65rem, 0.75rem, 0.85rem, 0.95rem, 1rem, 1.15rem, 1.25rem, 1.5rem, 1.75rem, 2rem, 2.25rem, 2.5rem, 3rem, 3.5rem, 4rem, 6rem | **8px baseline scale**: 4, 8, 12, 16, 24, 32, 48, 64. Use CSS clamp for responsive |
| **Shadow/glow overload** | 6+ shadow variables, glowing borders, gradient borders, inset shadows, box-shadow on hover everywhere | **1-2 shadow tokens**: `shadow-sm` (cards), `shadow-md` (elevated). No colored glows unless brand-specific and rare |
| **Gradient abuse** | 15+ gradient backgrounds (linear, radial, mesh, pattern layers) | **Flat colors + 1 accent gradient**. Gradients only on primary CTA |
| **Color palette chaos** | 20+ CSS custom properties for color, many near-duplicates | **6-8 semantic tokens**: bg, surface, border, text, muted, primary, accent, danger |

---

## Specific Changes to Make

### 1. Typography System (flanora/index.html:53-54)
```css
/* REPLACE the font stack */
--font-body: 'Plus Jakarta Sans', system-ui, sans-serif;  /* keep */
--font-display: 'Playfair Display', Georgia, serif;      /* keep */

/* ADD a proper scale */
--text-xs: 0.75rem;    --text-sm: 0.875rem;
--text-base: 1rem;     --text-lg: 1.125rem;
--text-xl: 1.25rem;    --text-2xl: 1.5rem;
--text-3xl: 1.875rem;  --text-4xl: 2.25rem;
--text-5xl: 3rem;      --text-6xl: 3.75rem;

/* Line heights */
--leading-tight: 1.1;  --leading-snug: 1.375;
--leading-normal: 1.6; --leading-relaxed: 1.75;
```

### 2. Spacing Scale (replace all arbitrary values)
```css
--space-1: 4px;  --space-2: 8px;  --space-3: 12px;
--space-4: 16px; --space-5: 24px; --space-6: 32px;
--space-8: 48px; --space-10: 64px; --space-12: 96px;
```

### 3. Radius Scale (flanora/index.html:56-59)
```css
/* REPLACE */
--radius-none: 0;
--radius-sm: 4px;    /* buttons, inputs, badges */
--radius-md: 8px;    /* cards, dropdowns */
--radius-lg: 12px;   /* modals, hero image */
--radius-full: 9999px; /* pills, avatars only */
```

### 4. Shadow System (flanora/index.html:61-63)
```css
/* REPLACE all shadow vars with */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 12px rgba(0,0,0,0.08);
--shadow-lg: 0 12px 24px rgba(0,0,0,0.12);
--shadow-focus: 0 0 0 3px rgba(34,197,94,0.3);
```

### 5. Color Audit — consolidate to semantic tokens
```css
/* Current 20+ → 8 semantic */
--color-bg: #05150a;
--color-surface: #0a2313;
--color-border: rgba(255,255,255,0.08);
--color-text: #f1f5f9;
--color-text-muted: #94a3b8;
--color-primary: #15803d;      /* brand green */
--color-accent: #e6a742;       /* brand gold */
--color-error: #ef4444;
```

### 6. Component-Specific Fixes

| Component | Current | Fix |
|-----------|---------|-----|
| **Buttons** | 4+ variants, all radius-full, gradient backgrounds, heavy shadows | 2 variants (primary/secondary), radius-sm, flat bg, subtle shadow |
| **Cards** | radius-lg, gradient borders, glow shadows, hover transform -4px | radius-md, 1px border, shadow-sm, hover shadow-md (no transform) |
| **Form inputs** | radius-sm, gradient borders, heavy focus rings | radius-sm, 1px border, focus-ring only |
| **Badges/pills** | radius-full everywhere, gradient backgrounds | radius-sm for badges, radius-full only for pill CTAs |
| **Images** | radius-md on product photos | **radius-none** (sharp corners look intentional) |
| **Tables** | rounded corners | **sharp corners** |

### 7. Layout Rhythm
- Section padding: `clamp(48px, 8vw, 96px)` vertical, `clamp(16px, 4vw, 32px)` horizontal
- Grid gaps: consistent 24px (mobile) / 32px (desktop)
- Component internal padding: 16px/24px not 15px/22px/25px

### 8. Remove "AI Tell" Patterns
- ❌ `backdrop-filter: blur(16px)` on every nav/drawer
- ❌ `transform: translateY(-2px)` on every hover
- ❌ `box-shadow: var(--shadow-glow-green)` colored glows
- ❌ Emoji in headings (`🏢`, `⭐`, `🔥`, `🎁`, `🚀`)
- ❌ Gradient text on headings (keep for 1 hero max)
- ❌ Multiple background layers (mesh + pattern + gradients)
- ❌ Loading screen with spinner (unnecessary for static site)

---

## Priority Order

1. **Typography & spacing scale** — affects everything
2. **Radius reduction** — immediate visual maturity
3. **Shadow/color consolidation** — reduces cognitive load
4. **Component audit** — buttons, cards, forms, tables
5. **Remove decorative noise** — mesh, patterns, glows, emoji

---

## Files to Modify

- `flanora/index.html` — main Flanora site (primary)
- `index.html` — Aquariz corporate hub (apply same token system)
- `flanora/404.html` & `404.html` — error pages (consistency)

## Verification Checklist

- [ ] All spacing uses `--space-*` tokens
- [ ] All radii use `--radius-*` tokens (max 3 values used)
- [ ] All shadows use `--shadow-*` tokens (max 2 values used)
- [ ] All colors use semantic `--color-*` tokens (max 8 values)
- [ ] No emoji in heading/text content
- [ ] No gradient text except hero headline
- [ ] No colored box-shadow glows
- [ ] No backdrop-filter blur > 8px
- [ ] No transform on hover except primary CTA
- [ ] Images have `border-radius: 0`
- [ ] Tables have sharp corners
- [ ] Font weights limited to 400/500/600/700