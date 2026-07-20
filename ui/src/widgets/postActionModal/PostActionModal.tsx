import styles from "./PostActionModal.module.css";

type PostActionsModalProps = {
  onClose: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
};

export function PostActionsModal({
  onClose,
  onDelete,
  onEdit,
}: PostActionsModalProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className={`${styles.action} ${styles.delete}`}
          onClick={onDelete}
        >
          Delete
        </button>

        <button className={styles.action} onClick={onEdit}>
          Edit
        </button>

        <button className={styles.action}>Go to post</button>

        <button className={styles.action}>Copy link</button>

        <button className={styles.action} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
