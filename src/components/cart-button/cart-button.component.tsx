import Image from "next/image";
import styles from "./cart-button.module.scss";
import { VisuallyHidden } from "../visually-hidden/visually-hidden.component";

interface CartButtonProps {
  items?: number;
}

export function CartButton({ items }: CartButtonProps) {
  return (
    <button type="button" className={styles.button}>
      <Image
        src="/assets/shopping-cart.svg"
        alt="Open items list"
        width={20}
        height={20}
      />
      {items && (
        <div className={styles.items}>
          <VisuallyHidden> - items: </VisuallyHidden>
          {items}
        </div>
      )}
    </button>
  );
}
