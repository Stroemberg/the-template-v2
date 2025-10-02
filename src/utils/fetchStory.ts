import { getStoryblokApi } from "@/lib/storyblok";

export const fetchStory = async (
  version: "draft" | "published",
  slug?: string[],
  locale?: string
) => {
  const correctSlug = `/${slug ? slug.join("/") : "home"}`;

  const api = getStoryblokApi();

  const { data } = await api.get(`/cdn/stories${correctSlug}`, {
    version,
    language: locale,
  });

  return data;
};
