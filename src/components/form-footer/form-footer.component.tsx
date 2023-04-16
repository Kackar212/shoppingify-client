import styles from "./form-footer.module.scss";
import { PropsWithChildren } from "react";

export function FormFooter({ children }: PropsWithChildren) {
  return <div className={styles.text}>{children}</div>;
}
