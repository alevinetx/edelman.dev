import { useRouter } from "next/router";

export default function Post() {
  const router = useRouter();
  const { slug } = router.query;

  return <p>Post: {slug}</p>;
}

// export async function getStaticProps({ params, preview = false }) {
//   return {};
// }

// export async function getStaticPaths({}) {
//   return {};
// }
