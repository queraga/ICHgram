import { useState } from "react";
import { createPost } from "../../entities/post/api/postApi";

import styles from "./CreatePostModal.module.css";
import type { Post } from "../../entities/post/model/types";

type CreatePostModalProps = {
  onClose: () => void;
  onPostCreated?: (post: Post) => void;
};

export function CreatePostModal({
  onClose,
  onPostCreated,
}: CreatePostModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleShare = async () => {
    if (!file) return;

    const response = await createPost(file, caption);

    onPostCreated?.(response.post);

    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <h2>Create new post</h2>

          <button onClick={handleShare}>Share</button>
        </div>

        <div className={styles.content}>
          <div className={styles.imageArea}>
            {preview ? (
              <img src={preview} alt="Post preview" />
            ) : (
              <label className={styles.upload}>
                <span>Upload photo</span>

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>

          <div className={styles.captionArea}>
            <textarea
              value={caption}
              maxLength={2200}
              placeholder="Write a caption..."
              onChange={(event) => setCaption(event.target.value)}
            />

            <span>{caption.length} / 2200</span>
          </div>
        </div>
      </div>
    </div>
  );
}
