import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/explore">Explore</NavLink>
        <NavLink to="/messages">Messages</NavLink>
        <NavLink to="/notifications">Notifications</NavLink>
        <NavLink to="/create">Create</NavLink>
      </nav>

      <p>© 2026 ICHgram</p>
    </footer>
  );
}
