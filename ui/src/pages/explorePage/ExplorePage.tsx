import { useEffect, useState } from "react";

import { getPosts } from "../../entities/post/api/postApi";
import type { Post } from "../../entities/post/model/types";
import { API_URL } from "../../shared/config/api";

import styles from "./ExplorePage.module.css";

export function ExplorePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {posts.map((post) => (
          <img
            key={post._id}
            className={styles.image}
            src={`${API_URL}${post.imageUrl}`}
            alt={post.caption}
          />
        ))}
      </div>
    </div>
  );
}
