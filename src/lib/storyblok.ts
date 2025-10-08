import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";

import Page from "@/components/Page";
import Teaser from "@/components/Teaser";
import TextBlock from "@/blocks/text-block";
import ImageBlock from "@/blocks/image";

export const getStoryblokApi = (version: "draft" | "published") => {
  return storyblokInit({
    accessToken:
      version === "draft"
        ? process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN
        : process.env.NEXT_PUBLIC_STORYBLOK_PUBLISHED_TOKEN,
    components: {
      page: Page,
      teaser: Teaser,
      text_block: TextBlock,
      image: ImageBlock,
    },
    use: [apiPlugin],
    enableFallbackComponent: true,
  })();
};
