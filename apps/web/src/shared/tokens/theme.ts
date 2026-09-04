/**
 * Theme Configuration
 *
 * Central point for theme colors used in metadata and UI.
 * Change these values and they propagate throughout the app.
 */

import { colors } from "./tokens";

export const themeConfig = {
  primaryColor: colors.primary,
  backgroundColor: colors.hero.background,
} as const;

export type ThemeConfig = typeof themeConfig;
