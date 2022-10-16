import { FC, ReactNode } from "react";
import DarkModeToggle from "@components/DarkModeToggle";

import styles from "./style.module.scss";

const GlobalLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <DarkModeToggle />
      </div>
      {children}
    </main>
  );
};
export default GlobalLayout;
