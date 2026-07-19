import { useEffect, useState } from "react";
import type { Post } from "../../entities/post/model/types.ts";
import { getPosts } from "../../entities/post/api/postApi.ts";
import { PostCard } from "../../entities/post/ui/PostCard.tsx";
import styles from "./HomePage.module.css";

export function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then((data) => {
      setPosts(data);
    });
  }, []);

  return (
    <div className={styles.home}>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
