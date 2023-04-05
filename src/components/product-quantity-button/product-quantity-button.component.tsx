import { ReactNode, useCallback } from "react";
import { Button } from "../button/button.component";
import styles from "./product-quantity-button.module.scss";
import { VisuallyHidden } from "../visually-hidden/visually-hidden.component";

interface ProductQuantityButtonProps {
  step: number;
  quantity: number;
  updateQuantity: (quantity: number) => void;
  children: ReactNode;
}

export function ProductQuantityButton({
  step,
  quantity,
  updateQuantity,
  children,
}: ProductQuantityButtonProps) {
  const changeQuantity = useCallback(() => {
    updateQuantity(quantity + step);
  }, [updateQuantity, step, quantity]);

  return (
    <Button className={styles.button} onClick={changeQuantity}>
      {children}
      <VisuallyHidden>{quantity}</VisuallyHidden>
    </Button>
  );
}
