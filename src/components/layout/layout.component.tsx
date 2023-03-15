import { ReactNode } from "react";
import { Navigation } from "../navigation/navigation.component";
import styles from "./layout.module.scss";

interface LayoutProps {
  children: ReactNode;
  className: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className={`${className} ${styles.container}`}>
      <Navigation />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
