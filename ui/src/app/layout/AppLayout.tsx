import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../widgets/sidebar/Sidebar";
import { SearchPanel } from "../../widgets/searchPanel/SearchPanel";

import styles from "./AppLayout.module.css";

export function AppLayout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <Sidebar onSearchClick={() => setIsSearchOpen(true)} />

      <main className={styles.content}>
        <Outlet />
      </main>

      {isSearchOpen && <SearchPanel onClose={() => setIsSearchOpen(false)} />}
    </div>
  );
}
