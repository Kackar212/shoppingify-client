import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.scss";
import { Loader } from "../loader/loader.component";

interface ButtonProps {
  children: ReactNode;
  isLoading?: boolean;
}

export function Button({
  type = "button",
  isLoading = false,
  children,
  ...attrs
}: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) {
  return (
    <button type={type} {...attrs}>
      {children}
      {isLoading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
    </button>
  );
}
