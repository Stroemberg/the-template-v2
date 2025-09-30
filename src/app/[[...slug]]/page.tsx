import { StoryblokStory } from "@storyblok/react/rsc";
import { fetchStory } from "@/utils/fetchStory";

export async function generateStaticParams() {
  return [];
}

type Params = Promise<{ slug?: string[] }>;

export default async function Home({ params }: { params: Params }) {
  const slug = (await params).slug;
  console.log("Home page", slug);
  const pageData = await fetchStory("published", slug);

  return <StoryblokStory story={pageData.story} />;
}
