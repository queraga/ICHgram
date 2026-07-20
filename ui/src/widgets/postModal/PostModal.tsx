import { useState } from "react";
import type { Post } from "../../entities/post/model/types";
import type { User } from "../../entities/user/model/types";
import { API_URL } from "../../shared/config/api";
import styles from "./PostModal.module.css";
import { PostActionsModal } from "../postActionModal/PostActionModal";

type PostModalProps = {
  post: Post;
  user: User;
  onClose: () => void;
};

export function PostModal({ post, user, onClose }: PostModalProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <img
          className={styles.modalImage}
          src={`${API_URL}${post.imageUrl}`}
          alt={post.caption}
        />

        <div className={styles.modalContent}>
          <div className={styles.header}>
            <div className={styles.user}>
              <img
                className={styles.avatar}
                src={`${API_URL}${user.avatarUrl}`}
                alt={user.username}
              />

              <strong>{user.username}</strong>
            </div>

            <button
              className={styles.moreButton}
              onClick={() => setShowActions(true)}
            >
              ...
            </button>
            {showActions && (
              <PostActionsModal onClose={() => setShowActions(false)} />
            )}
          </div>

          <div className={styles.caption}>
            <strong>{user.username}</strong>
            <span>{post.caption}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
