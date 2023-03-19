import { VisuallyHidden } from "../visually-hidden/visually-hidden.component";
import styles from "./loader.module.scss";

interface LoaderProps {
  label?: boolean;
  size?: number;
}

export function Loader({ label = true, size = 24 }: LoaderProps) {
  return (
    <span className={styles.loader}>
      <style jsx>{`
        .${styles.loader} {
          --size: ${size}px;
        }
      `}</style>
      {label && <VisuallyHidden>Wait</VisuallyHidden>}
    </span>
  );
}
