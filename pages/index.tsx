import { getAllPostsForHome } from "../lib/api";
import { useAmp } from "next/amp";

export const config = { amp: true };

export default function Home({ allPosts, preview }) {
  const isAmp = useAmp();
  return <div>Hello</div>;
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: { allPosts, preview },
    revalidate: 1,
  };
}
