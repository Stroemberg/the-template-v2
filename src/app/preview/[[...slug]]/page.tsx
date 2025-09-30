import { StoryblokStory } from "@storyblok/react/rsc";
import { fetchStory } from "@/utils/fetchStory";
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

  const pageData = await fetchStory(
    "draft",
    [slug].filter(Boolean) as string[]
  );
  return <StoryblokStory story={pageData.story} />;
}
