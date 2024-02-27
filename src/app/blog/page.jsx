import PostCard from "@/components/postCard/postCard";
import { getPosts } from "@/lib/data";
import styles from "./blog.module.css";

const getData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

export const generateMetadata = async ({ params }) => {
  return {
    title: "Blog"
  }
} 


const BlogPage = async () => {
  // const posts = await getData();
  const posts = await getPosts();
  return (
    <div className={styles.container}>
      {posts.slice(0, 10).map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
