import Image from "next/image";
import styles from "./cart-button.module.scss";
import { VisuallyHidden } from "../visually-hidden/visually-hidden.component";
import { useDispatch } from "react-redux";
import { toggle } from "../../features/slices/shopping-list.slice";
import { useCallback } from "react";
import cartIcon from "/public/assets/images/shopping-cart.svg";

interface CartButtonProps {
  items?: number;
}

export function CartButton({ items }: CartButtonProps) {
  const dispatch = useDispatch();

  const toggleShoppingList = useCallback(() => {
    dispatch(toggle());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      type="button"
      className={styles.button}
      onClick={toggleShoppingList}
    >
      <Image src={cartIcon} alt="Open items list" width={20} height={20} />
      {!!items && (
        <div className={styles.items}>
          <VisuallyHidden> - items: </VisuallyHidden>
          {items}
        </div>
      )}
    </button>
  );
}
