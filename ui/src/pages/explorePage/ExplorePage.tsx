import { useEffect, useState } from "react";

import { getPosts } from "../../entities/post/api/postApi";
import type { Post } from "../../entities/post/model/types";
import { getMe } from "../../entities/user/api/userApi";
import type { User } from "../../entities/user/model/types";
import { API_URL } from "../../shared/config/api";
import { PostModal } from "../../widgets/postModal/PostModal";

import styles from "./ExplorePage.module.css";

export function ExplorePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    getPosts().then(setPosts);
    getMe().then(setCurrentUser);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {posts.map((post) => (
          <button
            key={post._id}
            className={styles.postButton}
            onClick={() => setSelectedPost(post)}
          >
            <img
              className={styles.image}
              src={`${API_URL}${post.imageUrl}`}
              alt={post.caption}
            />
          </button>
        ))}
      </div>

      {selectedPost && currentUser && (
        <PostModal
          post={selectedPost}
          user={selectedPost.author}
          currentUser={currentUser}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}
