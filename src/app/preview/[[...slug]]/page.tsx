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

  console.log("PreviewPage searchParams:", sp);

  const { slug, secret } = sp;

  const requiredSecret = process.env.STORYBLOK_PREVIEW_SECRET;

  const hasAccess = secret === requiredSecret;

  if (!hasAccess) notFound();

  // Extract locale from the slug query parameter
  const fullPath = slug ? `/${slug}` : "/";
  const locale = extractLocaleFromPath(fullPath);
  const cleanSlug = removeLocaleFromPath(fullPath);

  // Convert to array format for fetchStory (it will handle the prefix removal)
  const slugArray =
    cleanSlug === "/" ? undefined : cleanSlug.slice(1).split("/");

  try {
    const pageData = await fetchStory("draft", slugArray, locale);
    return <StoryblokStory story={pageData.story} />;
  } catch (error) {
    console.error("Error fetching story:", error);
    notFound();
  }
}
