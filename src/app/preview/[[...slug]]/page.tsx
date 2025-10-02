import { StoryblokStory } from "@storyblok/react/rsc";
import { fetchStory } from "@/utils/fetchStory";
import { extractLocaleFromPath, removeLocaleFromPath } from "@/utils/locale";
import { notFound } from "next/navigation";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export default async function PreviewPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;

  const { slug, secret } = sp;

  const requiredSecret = process.env.STORYBLOK_PREVIEW_SECRET;

  const hasAccess = secret === requiredSecret;

  if (!hasAccess) notFound();

  // Extract locale from the slug
  const fullPath = slug ? `/${slug}` : "/";
  const locale = extractLocaleFromPath(fullPath);
  const cleanSlug = removeLocaleFromPath(fullPath);

  const slugArray =
    cleanSlug === "/" ? undefined : cleanSlug.slice(1).split("/");

  const pageData = await fetchStory("draft", slugArray, locale);

  if (!pageData.story) notFound();

  return <StoryblokStory story={pageData.story} />;
}
