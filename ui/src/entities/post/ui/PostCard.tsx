import type { Post } from "../model/types";
import { API_URL } from "../../../shared/config/api";
import styles from "./PostCard.module.css";
import { Heart, MessageCircle } from "lucide-react";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <img
              className={styles.avatar}
              src={`${API_URL}${post.author.avatarUrl}`}
              alt={post.author.username}
            />

            <p className={styles.username}>{post.author.username}</p>
          </div>

          <button className={styles.followButton}>Follow</button>
          <div className={styles.actions}>
            <Heart size={18} />
            <MessageCircle size={18} />
          </div>
        </div>
      </div>

      <img
        className={styles.image}
        src={`${API_URL}${post.imageUrl}`}
        alt={post.caption}
      />

      <div className={styles.content}>
        <div className={styles.content}>
          <p className={styles.likes}>{post.likes.length} likes</p>
          <p>
            <strong>{post.author.username}</strong> {post.caption}
          </p>
          <button className={styles.comments}>View all comments</button>
          <p className={styles.date}>{post.createdAt}</p>
        </div>
      </div>
    </article>
  );
}
