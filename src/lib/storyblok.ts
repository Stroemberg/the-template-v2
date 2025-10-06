import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";

import Page from "@/components/Page";
import Teaser from "@/components/Teaser";

export const getStoryblokApi = (version: "draft" | "published") => {
  return storyblokInit({
    accessToken:
      version === "draft"
        ? process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN
        : process.env.NEXT_PUBLIC_STORYBLOK_PUBLISHED_TOKEN,
    components: {
      page: Page,
      teaser: Teaser,
    },
    use: [apiPlugin],
    enableFallbackComponent: true,
  })();
};
