import { useState } from "react";
import { searchUsers } from "../../entities/user/api/userApi";
import type { User } from "../../entities/user/model/types";
import { API_URL } from "../../shared/config/api";
import styles from "./SearchPanel.module.css";
import { useNavigate } from "react-router-dom";

type SearchPanelProps = {
  onClose: () => void;
};

export function SearchPanel({ onClose }: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const navigate = useNavigate();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setQuery(value);

    if (!value.trim()) {
      setUsers([]);
      return;
    }

    const data = await searchUsers(value);

    setUsers(data);
  };

  return (
    <>
      <aside className={styles.panel}>
        <h2>Search</h2>

        <div className={styles.searchRow}>
          <input value={query} onChange={handleChange} placeholder="Search" />
        </div>

        <h3>Recent</h3>

        {users.map((user) => (
          <div
            key={user._id}
            className={styles.user}
            onClick={() => navigate(`/profile/${user._id}`)}
          >
            <img src={`${API_URL}${user.avatarUrl}`} alt={user.username} />

            <span>{user.username}</span>
          </div>
        ))}
      </aside>

      <div className={styles.overlay} onClick={onClose} />
    </>
  );
}
