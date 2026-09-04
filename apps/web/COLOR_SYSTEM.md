# Centralized Color System

All colors in the application are now centralized and managed through a single source of truth. This guide explains how to use, customize, and update colors throughout the project.

## Structure

The color system is organized in three layers:

### 1. **Design Tokens** (`src/shared/tokens/tokens.ts`)
TypeScript constants that define all color values with type safety.

```ts
import { colors } from '@/shared/tokens';

const buttonColor = colors.hero.button;        // "#be5b3f"
const errorColor = colors.error;               // "#dc2626"
const brandPrimary = colors.primary;           // "#152a31"
```

**Color Categories:**
- `colors.primary` — Main brand color (navy)
- `colors.secondary` — Secondary color (paper/cream)
- `colors.text.*` — Text colors (primary, secondary, tertiary)
- `colors.error*` — Error states (error, errorLight, errorLighter)
- `colors.success` — Success state
- `colors.warning` — Warning state
- `colors.info` — Info state
- `colors.hero.*` — Hero section colors
- `colors.navy`, `colors.water`, `colors.brick`, `colors.gold`, `colors.paper` — Figma palette

### 2. **CSS Variables** (`src/shared/styles/globals.css`)
CSS custom properties that mirror the TypeScript tokens for use in stylesheets.

```css
/* Use in any CSS file */
.button {
  background-color: var(--color-hero-button);
  color: var(--color-text-primary);
}

/* All available: */
--color-primary
--color-secondary
--color-text-primary/secondary/tertiary
--color-error / --color-error-light / --color-error-lighter
--color-hero-background / --color-hero-text / --color-hero-button
--color-navy / --color-water / --color-brick / --color-gold / --color-paper
```

### 3. **Theme Configuration** (`src/shared/tokens/theme.ts`)
High-level theme values for metadata and browser UI.

```ts
import { themeConfig } from '@/shared/tokens';

themeConfig.primaryColor;      // "#152a31" (used in layout.tsx, manifest.ts)
themeConfig.backgroundColor;   // "#152a31" (used in manifest.ts)
```

## Updating Colors

### Changing a Color Everywhere

To change a color globally, update it in **ONE place only**:

**In `src/shared/tokens/tokens.ts`:**
```ts
export const colors = {
  primary: "#152a31",  // ← Change here
  // ...
};
```

This automatically updates:
- ✅ TypeScript constant (for component imports)
- ✅ CSS variable in `globals.css` (when `build` runs)
- ✅ Viewport theme color in `layout.tsx`
- ✅ Manifest colors in `manifest.ts`
- ✅ All CSS files using `var(--color-primary)`

### Step-by-Step: Change Brand Color

1. Open `src/shared/tokens/tokens.ts`
2. Find the `colors` object
3. Update the value:
   ```ts
   primary: "#FF0000",  // Changed from "#152a31"
   ```
4. Run `npm run build` or `npm run dev`
5. The new color is now used everywhere

## Usage Examples

### In React Components (TypeScript)

```tsx
import { colors } from '@/shared/tokens';

export function Button() {
  return (
    <button style={{ backgroundColor: colors.hero.button }}>
      Subscribe
    </button>
  );
}
```

### In CSS Files

```css
.newsletter-form {
  background-color: var(--color-hero-background);
  color: var(--color-hero-text);
}

.input--error {
  border-color: var(--color-error-light);
}
```

### In Styled Components or CSS-in-JS

```tsx
import { colors } from '@/shared/tokens';

const styles = {
  button: {
    backgroundColor: colors.hero.button,
    ':hover': {
      backgroundColor: colors.brick,
    },
  },
};
```

### In Metadata (layout.tsx, manifest.ts)

```ts
import { themeConfig } from '@/shared/tokens';

export const viewport: Viewport = {
  themeColor: themeConfig.primaryColor,
};
```

## Adding New Colors

To add a new color that should be reusable:

1. **Add to TypeScript tokens** (`src/shared/tokens/tokens.ts`):
   ```ts
   export const colors = {
     // ... existing colors
     customColor: "#FF5733",
   };
   ```

2. **Add CSS variable** (`src/shared/styles/globals.css`):
   ```css
   :root {
     /* ... existing variables */
     --color-custom: #FF5733;
   }
   ```

3. **Use in your code**:
   ```css
   /* In CSS */
   .element { color: var(--color-custom); }
   ```
   
   ```tsx
   // In React
   import { colors } from '@/shared/tokens';
   const myColor = colors.customColor;
   ```

## Files Using the Color System

- ✅ `src/app/layout.tsx` — Viewport theme color
- ✅ `src/app/manifest.ts` — PWA manifest colors
- ✅ `src/app/globals.css` — Newsletter page styles
- ✅ `src/features/newsletter/client/components/subscription-confirmation.css` — Modal styles
- ✅ All future CSS files (use `var(--color-*)` pattern)

## Benefits

✨ **Single Source of Truth** — Change a color once, update everywhere  
🎨 **Type-Safe** — TypeScript provides autocomplete and type checking  
🔧 **Easy Maintenance** — No hardcoded hex values scattered around  
🚀 **Future-Proof** — Add new colors without refactoring  
📱 **Metadata Sync** — Browser UI colors stay in sync with app colors  

## Quick Checklist

When adding a new styled component:
- [ ] Use `var(--color-*)` in CSS files
- [ ] Use `import { colors } from '@/shared/tokens'` in React
- [ ] Never hardcode hex values like `#152a31`
- [ ] If adding a new color, update both `tokens.ts` and `globals.css`
