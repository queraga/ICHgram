import { useState, useEffect } from "react";
import type { Post } from "../../entities/post/model/types";
import type { User } from "../../entities/user/model/types";
import { API_URL } from "../../shared/config/api";
import styles from "./PostModal.module.css";
import { PostActionsModal } from "../postActionModal/PostActionModal";
import {
  createComment,
  getComments,
  toggleCommentLike,
} from "../../entities/comment/api/commentApi";
import type { Comment } from "../../entities/comment/model/types";
import {
  toggleLike,
  deletePost,
  updatePost,
} from "../../entities/post/api/postApi";
import { Heart, MessageCircle } from "lucide-react";

type PostModalProps = {
  post: Post;
  user: User;
  currentUser: User;
  onClose: () => void;
  onDelete?: (postId: string) => void;
};

export function PostModal({
  post,
  user,
  currentUser,
  onClose,
  onDelete,
}: PostModalProps) {
  const [showActions, setShowActions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [caption, setCaption] = useState(post.caption);
  const [editedCaption, setEditedCaption] = useState(post.caption);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [likes, setLikes] = useState(post.likes);
  const isLiked = likes.some((likeId) => likeId.toString() === currentUser._id);

  useEffect(() => {
    getComments(post._id).then(setComments);
  }, [post._id]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    await createComment(post._id, commentText);

    const freshComments = await getComments(post._id);

    setComments(freshComments);
    setCommentText("");
  };

  const handleLike = async () => {
    const response = await toggleLike(post._id);

    setLikes(response.likes);
  };

  const handleCommentLike = async (commentId: string) => {
    await toggleCommentLike(commentId);

    const freshComments = await getComments(post._id);

    setComments(freshComments);
  };

  const handleDelete = async () => {
    await deletePost(post._id);

    onDelete?.(post._id);
    onClose();
  };

  const handleEdit = async () => {
    const response = await updatePost(post._id, editedCaption);

    setCaption(response.post.caption);
    setIsEditing(false);
    setShowActions(false);
  };

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
              <PostActionsModal
                onClose={() => setShowActions(false)}
                onDelete={handleDelete}
                onEdit={() => {
                  setEditedCaption(caption);
                  setIsEditing(true);
                  setShowActions(false);
                }}
              />
            )}
          </div>

          <div className={styles.caption}>
            <strong>{user.username}</strong>

            {isEditing ? (
              <div className={styles.editCaption}>
                <textarea
                  value={editedCaption}
                  onChange={(event) => setEditedCaption(event.target.value)}
                />

                <button onClick={handleEdit}>Save</button>
              </div>
            ) : (
              <span>{caption}</span>
            )}
          </div>
          <div className={styles.comments}>
            {comments.map((comment) => {
              const isCommentLiked = comment.likes.some(
                (likeId) => likeId.toString() === currentUser._id,
              );

              return (
                <div key={comment._id} className={styles.comment}>
                  <img
                    className={styles.commentAvatar}
                    src={`${API_URL}${comment.author.avatarUrl}`}
                    alt={comment.author.username}
                  />

                  <div className={styles.commentContent}>
                    <div>
                      <strong>{comment.author.username}</strong>
                      <span>{comment.text}</span>
                    </div>

                    <span className={styles.commentLikes}>
                      Likes: {comment.likes.length}
                    </span>
                  </div>

                  <button
                    className={styles.commentLikeButton}
                    onClick={() => handleCommentLike(comment._id)}
                  >
                    <Heart
                      size={16}
                      fill={isCommentLiked ? "red" : "none"}
                      color={isCommentLiked ? "red" : "currentColor"}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          <div className={styles.postActions}>
            <div className={styles.actionButtons}>
              <button onClick={handleLike}>
                <Heart
                  fill={isLiked ? "red" : "none"}
                  color={isLiked ? "red" : "currentColor"}
                />
              </button>

              <button>
                <MessageCircle />
              </button>
            </div>

            <strong>
              {likes.length} {likes.length === 1 ? "like" : "likes"}
            </strong>
          </div>

          <div className={styles.addComment}>
            <input
              type="text"
              value={commentText}
              placeholder="Add comment"
              onChange={(event) => setCommentText(event.target.value)}
            />

            <button onClick={handleAddComment}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
