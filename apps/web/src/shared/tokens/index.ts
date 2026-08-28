/**
 * Design Tokens
 *
 * Extracted from Figma design system.
 * These tokens are the single source of truth for visual design.
 *
 * Values will be populated from Figma inspection.
 */

export const colors = {
  // Primary brand colors from Figma Design System
  primary: "#152A31", // Navy Main
  secondary: "#1E3C45", // Water
  tertiary: "#666666",
  background: "#FFFFFF",
  surface: "#F9F9F9",
  border: "#E0E0E0",
  text: {
    primary: "#152A31", // Navy Main
    secondary: "#1E3C45", // Water
    tertiary: "#999999",
  },
  error: "#DC2626",
  success: "#16A34A",
  warning: "#EA580C",
  info: "#0284C7",

  // Figma design tokens
  navy: "#152A31", // Navy Main - headings, primary text
  water: "#1E3C45", // Water - secondary text, subheadings
  brick: "#BE5B3F", // Brick - buttons, accents
  gold: "#C79A3E", // Gold - decorative accents
  paper: "#EFE6D3", // Paper - backgrounds, alt text

  // Hero section colors
  hero: {
    background: "#152A31",
    text: "#EFE6D3",
    button: "#BE5B3F",
  },
};

export const typography = {
  fontFamily: {
    base: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
    display: "'Petrona', serif",
    body: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
    monospace: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
  },
  fontSize: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "80px",
  },
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
};

export const spacing = {
  0: "0",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "28px",
  8: "32px",
  9: "36px",
  10: "40px",
  12: "48px",
  14: "56px",
  16: "64px",
  20: "80px",
  24: "96px",
};

export const radii = {
  none: "0",
  sm: "2px",
  base: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  "2xl": "16px",
  full: "9999px",
};

export const shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
};

export const breakpoints = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export const containerWidth = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
};
