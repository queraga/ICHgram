import type { Post } from "../model/types";
import { API_URL } from "../../../shared/config/api";
import styles from "./PostCard.module.css";

type PostCardProps = {
  post: Post;
  onClick?: () => void;
};

export function PostCard({ post, onClick }: PostCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <img
            className={styles.avatar}
            src={`${API_URL}${post.author.avatarUrl}`}
            alt={post.author.username}
          />

          <p className={styles.username}>{post.author.username}</p>
        </div>
      </div>

      <button className={styles.imageButton} onClick={onClick}>
        <img
          className={styles.image}
          src={`${API_URL}${post.imageUrl}`}
          alt={post.caption}
        />
      </button>

      <div className={styles.content}>
        <p className={styles.likes}>{post.likes.length} likes</p>

        <p>
          <strong>{post.author.username}</strong> {post.caption}
        </p>

        <button className={styles.comments} onClick={onClick}>
          View all comments
        </button>

        <p className={styles.date}>{post.createdAt}</p>
      </div>
    </article>
  );
}
