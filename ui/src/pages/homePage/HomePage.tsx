import { useEffect, useState } from "react";
import type { Post } from "../../entities/post/model/types";
import type { User } from "../../entities/user/model/types";
import { getFeedPosts } from "../../entities/post/api/postApi";
import { getMe } from "../../entities/user/api/userApi";
import { PostCard } from "../../entities/post/ui/PostCard";
import { PostModal } from "../../widgets/postModal/PostModal";
import styles from "./HomePage.module.css";

export function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    getFeedPosts().then(setPosts);
    getMe().then(setCurrentUser);
  }, []);

  return (
    <div className={styles.home}>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onClick={() => setSelectedPost(post)}
        />
      ))}

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
