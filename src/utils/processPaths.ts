import { extractLocaleFromPath, removeLocaleFromPath } from "./locale";

/**
 * Converts Next.js slug parameters to Storyblok API format with locale extraction.
 *
 * @param slug - Route slug from params (string[]) or searchParams (string)
 * @returns Object with slugArray for fetchStory and extracted locale
 */
export function processSlugForStoryblok(slug?: string | string[]) {
  const fullPath = Array.isArray(slug)
    ? slug.length
      ? `/${slug.join("/")}`
      : "/"
    : slug
      ? `/${slug}`
      : "/";

  const locale = extractLocaleFromPath(fullPath);
  const cleanSlug = removeLocaleFromPath(fullPath);

  // Convert to array format for fetchStory - handles "home" default
  const slugArray =
    cleanSlug === "/" ? undefined : cleanSlug.slice(1).split("/");

  return { slugArray, locale };
}
