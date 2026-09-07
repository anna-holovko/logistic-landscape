/**
 * Design System Tokens
 *
 * Centralized, type-safe design tokens for colors, typography, spacing,
 * and other design system values. Mirrors CSS variables in globals.css
 * for programmatic access in components and styling.
 */

export const colors = {
  // Core brand colors
  primary: "#152a31",
  secondary: "#efe6d3",
  tertiary: "#666666",
  background: "#ffffff",
  surface: "#f9f9f9",
  border: "#e0e0e0",

  // Text colors
  text: {
    primary: "#152a31",
    secondary: "#efe6d3",
    tertiary: "#999999",
  },

  // State colors
  error: "#dc2626",
  errorLight: "#ff7b7b",
  errorLighter: "#ffb3b3",
  success: "#16a34a",
  warning: "#ea580c",
  info: "#0284c7",

  // Hero section
  hero: {
    background: "#152a31",
    text: "#efe6d3",
    button: "#be5b3f",
  },

  // Figma design palette
  navy: "#152a31",
  water: "#1e3c45",
  brick: "#be5b3f",
  gold: "#c79a3e",
  paper: "#f4ede0",

  // Borders
  paperBorder: "#e2d4b7",
  secondaryBorder: "#86918c",
  tertiaryBorder: "#c5c4b7",
  paperLight: "#f7f2e9",
} as const;

export const typography = {
  fontFamily: {
    base: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
    display: "var(--font-petrona), serif",
    body: "var(--font-ibm-plex-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
    mono: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
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
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
} as const;

export const spacing = {
  0: "0",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
} as const;

export const radii = {
  sm: "2px",
  base: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  "2xl": "16px",
  full: "9999px",
} as const;

export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
} as const;

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  modal: 1400,
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
} as const;

export const tokens = {
  colors,
  typography,
  spacing,
  radii,
  shadows,
  zIndex,
  breakpoints,
} as const;

export type Colors = typeof colors;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type Radii = typeof radii;
export type Shadows = typeof shadows;
export type ZIndex = typeof zIndex;
export type Breakpoints = typeof breakpoints;
export type Tokens = typeof tokens;
