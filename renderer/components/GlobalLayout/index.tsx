import { FC, ReactNode } from "react";
import DarkModeToggle from "@components/DarkModeToggle";
import { useLayoutStore } from "@state/layout";

import styles from "./style.module.scss";

const GlobalLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  const layoutScreen = useLayoutStore((state) => state.currentScreen);

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
