import { StoryblokStory } from "@storyblok/react/rsc";
import { fetchStory } from "@/utils/fetchStory";
import { extractLocaleFromPath, removeLocaleFromPath } from "@/utils/locale";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [];
}

type Params = Promise<{ slug?: string[] }>;

export default async function Home({ params }: { params: Params }) {
  const slug = (await params).slug;

  // Extract locale from the slug
  const fullPath = slug ? `/${slug.join("/")}` : "/";
  const locale = extractLocaleFromPath(fullPath);
  const cleanSlug = removeLocaleFromPath(fullPath);

  // Remove leading slash and split into array for the fetch function
  const slugArray =
    cleanSlug === "/" ? undefined : cleanSlug.slice(1).split("/");

  const pageData = await fetchStory("published", slugArray, locale);

  if (!pageData.story) notFound();

  return <StoryblokStory story={pageData.story} />;
}
