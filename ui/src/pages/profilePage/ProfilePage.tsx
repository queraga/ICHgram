import { useEffect, useState } from "react";
import { getMe, getMyPosts } from "../../entities/user/api/userApi";
import type { User } from "../../entities/user/model/types";
import type { Post } from "../../entities/post/model/types";
import { API_URL } from "../../shared/config/api";
import styles from "./ProfilePage.module.css";
import { useNavigate } from "react-router-dom";
import { PostModal } from "../../widgets/postModal/PostModal";

export function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    getMe().then(setUser);
    getMyPosts().then(setPosts);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileHeader}>
        <img
          className={styles.avatar}
          src={`${API_URL}${user.avatarUrl}`}
          alt={user.username}
        />

        <div className={styles.profileInfo}>
          <div className={styles.topRow}>
            <h2>{user.username}</h2>

            <button
              className={styles.editButton}
              onClick={() => navigate("/profile/edit")}
            >
              Edit profile
            </button>
          </div>

          <div className={styles.stats}>
            <span>{posts.length} posts</span>
            <span>{user.followers.length} followers</span>
            <span>{user.following.length} following</span>
          </div>

          <p>{user.fullName}</p>

          <p>{user.bio}</p>

          <a href={user.website}>{user.website}</a>
        </div>
      </div>

      <div className={styles.posts}>
        {posts.map((post) => (
          <button
            key={post._id}
            className={styles.postButton}
            onClick={() => setSelectedPost(post)}
          >
            <img src={`${API_URL}${post.imageUrl}`} alt={post.caption} />
          </button>
        ))}
      </div>
      {selectedPost && (
        <PostModal
          post={selectedPost}
          user={user}
          currentUser={user}
          onClose={() => setSelectedPost(null)}
          onDelete={(postId) => {
            setPosts((prev) => prev.filter((post) => post._id !== postId));
            setSelectedPost(null);
          }}
        />
      )}
    </div>
  );
}
