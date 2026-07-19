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

type SidebarProps = {
  onSearchClick: () => void;
};

export function Sidebar({ onSearchClick }: SidebarProps) {
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

        <NavLink to="/create" className={styles.link}>
          <SquarePlus />
          <span>Create</span>
        </NavLink>
      </nav>

      <NavLink to="/profile" className={`${styles.link} ${styles.profile}`}>
        <div className={styles.avatar} />
        <span>Profile</span>
      </NavLink>
    </aside>
  );
}
