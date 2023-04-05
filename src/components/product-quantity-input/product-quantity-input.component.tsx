import { ChangeEvent, useCallback } from "react";
import styles from "./product-quantity-input.module.scss";
import { VisuallyHidden } from "../visually-hidden/visually-hidden.component";

interface ProductQuantityProps {
  id: number;
  quantity: number;
  updateQuantity: (quantity: number) => void;
}

export function ProductQuantityInput({
  id,
  quantity,
  updateQuantity,
}: ProductQuantityProps) {
  const changeQuantity = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { target } = e;

      updateQuantity(+target.value);
    },
    [updateQuantity]
  );

  const inputId = `product-quantity-${id}`;

  return (
    <label htmlFor={inputId} className={styles.label}>
      <input
        id={inputId}
        type="number"
        value={quantity}
        className={styles.quantity}
        onChange={changeQuantity}
      />
      <VisuallyHidden>Quantity</VisuallyHidden>
      <span aria-hidden="true">&nbsp;pcs</span>
    </label>
  );
}
