import { ReactNode } from "react";
import { Navigation } from "../navigation/navigation.component";
import styles from "./layout.module.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

interface LayoutProps {
  children: ReactNode;
  className: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className={`${className} ${styles.container}`}>
      <Navigation />
      <main className={styles.main}>{children}</main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop={true}
        theme="dark"
      />
    </div>
  );
}
