import Image from "next/image";
import styles from "./cart-button.module.scss";

export function CartButton() {
  return (
    <button className={styles.button}>
      <Image
        src="assets/shopping-cart.svg"
        alt="Open items list"
        width={40}
        height={40}
      />
    </button>
  );
}
