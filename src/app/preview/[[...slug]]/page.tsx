import { StoryblokStory } from "@storyblok/react/rsc";
import { fetchStory } from "@/utils/fetchStory";
import { notFound } from "next/navigation";

type Params = Promise<{ slug?: string[] }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function PreviewPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const sp = await searchParams;

  // Enforce presence of secret in query string
  const providedSecret = Array.isArray(sp.secret)
    ? sp.secret[0]
    : (sp.secret as string | undefined);
  const requiredSecret = process.env.STORYBLOK_PREVIEW_SECRET;

  // If an env secret is configured, require it to match; otherwise, require presence only
  const hasAccess = requiredSecret
    ? providedSecret === requiredSecret
    : Boolean(providedSecret);

  if (!hasAccess) notFound();

  // Prefer slug from query string to support /preview?secret=...&slug=...
  const slugFromQuery = Array.isArray(sp.slug)
    ? sp.slug[0]
    : (sp.slug as string | undefined);

  const slugSegments = slugFromQuery
    ? slugFromQuery.split("/").filter(Boolean)
    : slug;

  const pageData = await fetchStory("draft", slugSegments);
  return <StoryblokStory story={pageData.story} />;
}
