import { getStoryblokApi } from "@/lib/storyblok";
import { ISbStoryData } from "@storyblok/react";

export const fetchStory = async (
  version: "draft" | "published",
  slug?: string[],
  locale?: string
): Promise<{ story: ISbStoryData }> => {
  let correctSlug = `/${slug ? slug.join("/") : "home"}`;

  // Remove locale prefix from slug for all API calls
  // This handles both preview (en/params from query) and published (en/params from path)
  if (correctSlug.startsWith("/en") || correctSlug.startsWith("/sv")) {
    // Remove the locale prefix (e.g., "/en/about" -> "/about", "/sv" -> "/")
    correctSlug = correctSlug.replace(/^\/(en|sv)/, "") || "/";

    // If we end up with just "/" after removal, use "/home" instead
    if (correctSlug === "/") {
      correctSlug = "/home";
    }
  }

  const api = getStoryblokApi(version);

  const { data } = await api.get(`/cdn/stories${correctSlug}`, {
    version,
    language: locale,
  });

  return data;
};
