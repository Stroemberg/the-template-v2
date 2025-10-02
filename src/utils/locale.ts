/**
 * Extract locale from URL pathname
 * Supports formats like: /en/page, /sv/page, /page (defaults to 'en')
 */

// Move to separate file maybve or?
export const AVAILABLE_LOCALES = ["en", "sv"] as const;

export function extractLocaleFromPath(pathname: string): string {
  const pathSegments = pathname.split("/").filter(Boolean);
  const localeFromPath = pathSegments[0];

  return localeFromPath;
}

/**
 * Remove locale from pathname to get the actual page slug
 * /en/about -> /about, /sv/contact -> /contact
 */
export function removeLocaleFromPath(pathname: string): string {
  const pathSegments = pathname.split("/").filter(Boolean);

  // If first segment is a locale, remove it
  if (AVAILABLE_LOCALES.includes(pathSegments[0] as Locale)) {
    return "/" + pathSegments.slice(1).join("/");
  }

  return pathname;
}

/**
 * Get all available locales from your Storyblok configuration
 */

export type Locale = (typeof AVAILABLE_LOCALES)[number];
