import type { Metadata } from "next";
import type { StoryblokSeoFields } from "@/storyblok-component-types";

export function generateMetadataFromSeo(
  seoFields: StoryblokSeoFields | undefined,
  version: "draft" | "published"
): Metadata {
  if (!seoFields) {
    return {};
  }

  const { title, description, og_image, no_index } = seoFields;

  const draftPrefix = version === "draft" ? "[DRAFT] " : "";

  return {
    title: draftPrefix + title,
    description: draftPrefix + description,
    openGraph: {
      title: draftPrefix + title,
      description: draftPrefix + description,
      images: [og_image?.filename || ""],
    },
    twitter: {
      title: draftPrefix + title,
      description: draftPrefix + description,
      images: [og_image?.filename || ""],
    },
    robots: no_index || version === "draft" ? "noindex" : "index, follow",
  };
}
