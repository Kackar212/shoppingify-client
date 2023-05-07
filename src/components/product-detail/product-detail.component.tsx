import clsx from "clsx";
import styles from "./product-detail.module.scss";

interface ProductDetailProps {
  name: string;
  text: string | null;
  hasBiggerText?: boolean;
}

export function ProductDetail({
  name,
  text,
  hasBiggerText = false,
}: ProductDetailProps) {
  const textClassName = clsx(styles.text, {
    [styles.textBigger]: hasBiggerText,
  });

  if (!text) {
    return null;
  }

  return (
    <div className={styles.info}>
      <span className={styles.name}>{name}</span>
      <p className={textClassName}>{text}</p>
    </div>
  );
}
