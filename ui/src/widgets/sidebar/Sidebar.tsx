import { NavLink } from "react-router-dom";
import {
  House,
  Search,
  Compass,
  MessageCircle,
  Heart,
  SquarePlus,
} from "lucide-react";

import styles from "./Sidebar.module.css";
import { useState, useEffect } from "react";
import { getMe } from "../../entities/user/api/userApi";
import type { User } from "../../entities/user/model/types";
import { API_URL } from "../../shared/config/api";

type SidebarProps = {
  onSearchClick: () => void;
  onCreateClick: () => void;
};

export function Sidebar({ onSearchClick, onCreateClick }: SidebarProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMe().then(setUser);
  }, []);

  return (
    <aside className={styles.sidebar}>
      <img className={styles.logo} src="/logo/ichgramLogo.svg" alt="ICHgram" />

      <nav className={styles.nav}>
        <NavLink to="/" className={styles.link}>
          <House />
          <span>Home</span>
        </NavLink>

        <button type="button" className={styles.link} onClick={onSearchClick}>
          <Search />
          <span>Search</span>
        </button>

        <NavLink to="/explore" className={styles.link}>
          <Compass />
          <span>Explore</span>
        </NavLink>

        <NavLink to="/messages" className={styles.link}>
          <MessageCircle />
          <span>Messages</span>
        </NavLink>

        <NavLink to="/notifications" className={styles.link}>
          <Heart />
          <span>Notifications</span>
        </NavLink>

        <button type="button" className={styles.link} onClick={onCreateClick}>
          <SquarePlus />
          <span>Create</span>
        </button>
      </nav>

      <NavLink to="/profile" className={`${styles.link} ${styles.profile}`}>
        {user?.avatarUrl ? (
          <img
            className={styles.avatar}
            src={`${API_URL}${user.avatarUrl}`}
            alt={user.username}
          />
        ) : (
          <div className={styles.avatar} />
        )}
        <span>Profile</span>
      </NavLink>
    </aside>
  );
}
