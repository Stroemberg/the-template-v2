import { StoryblokStory } from "@storyblok/react/rsc";
import { fetchStory } from "@/utils/fetchStory";
import { extractLocaleFromPath, removeLocaleFromPath } from "@/utils/locale";
import { notFound } from "next/navigation";
import { generateMetadataFromSeo } from "@/utils/generateMetadataFromSeo";
import { processSlugForStoryblok } from "@/utils/processPaths";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;

  const { slug } = sp;

  const { slugArray, locale } = processSlugForStoryblok(slug);

  try {
    const pageData = await fetchStory("draft", slugArray, locale);
    const pageContent = pageData.story.content;

    return generateMetadataFromSeo(pageContent.seo_fields[0], "draft");
  } catch {
    return {};
  }
}

export default async function PreviewPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;

  const { slug, secret } = sp;

  const hasAccess = secret === process.env.STORYBLOK_PREVIEW_SECRET;

  if (!hasAccess) notFound();

  const { slugArray, locale } = processSlugForStoryblok(slug);

  try {
    const pageData = await fetchStory("draft", slugArray, locale);
    return <StoryblokStory story={pageData.story} />;
  } catch (error) {
    console.error("Error fetching story:", error);
    notFound();
  }
}
