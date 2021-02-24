import { getAllPostsForHome } from "../lib/api";

export default function Home({ allPosts, preview }) {
  return <div>Hello</div>;
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: { allPosts, preview },
    revalidate: 1,
  };
}
