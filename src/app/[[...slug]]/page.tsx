import { StoryblokStory } from "@storyblok/react/rsc";
import { fetchStory } from "@/utils/fetchStory";
import { notFound } from "next/navigation";
import { generateMetadataFromSeo } from "@/utils/generateMetadataFromSeo";
import { processSlugForStoryblok } from "@/utils/processPaths";

export async function generateStaticParams() {
  return [];
}

type Params = Promise<{ slug?: string[] }>;

export async function generateMetadata({ params }: { params: Params }) {
  const slug = (await params).slug;

  const { slugArray, locale } = processSlugForStoryblok(slug);

  try {
    const pageData = await fetchStory("published", slugArray, locale);
    const pageContent = pageData.story.content;

    return generateMetadataFromSeo(pageContent.seo_fields[0], "published");
  } catch {
    return {};
  }
}

export default async function Home({ params }: { params: Params }) {
  const slug = (await params).slug;

  const { slugArray, locale } = processSlugForStoryblok(slug);

  try {
    const pageData = await fetchStory("published", slugArray, locale);
    return <StoryblokStory story={pageData.story} />;
  } catch {
    notFound();
  }
}
