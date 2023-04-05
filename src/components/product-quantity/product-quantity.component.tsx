import { useCallback, useState } from "react";
import { ProductQuantityButton } from "../product-quantity-button/product-quantity-button.component";
import { ProductQuantityInput } from "../product-quantity-input/product-quantity-input.component";
import { useUpdateListProductMutation } from "../../features/api";
import { MinusIcon } from "../minus-icon/minus-icon.component";
import { PlusIcon } from "../plus-icon/plus-icon.component";
import { VisuallyHidden } from "../visually-hidden/visually-hidden.component";
import styles from "./product-quantity.module.scss";
import { useMutationDebounce } from "../../hooks/useDebounceMutation";

interface ProductQuantityProps {
  id: number;
  defaultQuantity: number;
}

export function ProductQuantity({ id, defaultQuantity }: ProductQuantityProps) {
  const [quantity, setQuantity] = useState(defaultQuantity);
  const [updateListProduct] = useMutationDebounce(useUpdateListProductMutation);

  const updateQuantity = useCallback(
    (quantity: number) => {
      if (!quantity) {
        return;
      }

      setQuantity((prevQuantity) => {
        if (quantity < 0 || quantity > 99999) {
          return prevQuantity;
        }

        updateListProduct({ id, quantity });

        return quantity;
      });
    },
    [id, updateListProduct]
  );

  const sharedProps = { id, quantity, updateQuantity };

  return (
    <div className={styles.productQuantity}>
      <ProductQuantityButton {...sharedProps} step={-1}>
        <MinusIcon />
        <VisuallyHidden>Decrease product quantity</VisuallyHidden>
      </ProductQuantityButton>
      <ProductQuantityInput {...sharedProps} />
      <ProductQuantityButton {...sharedProps} step={1}>
        <PlusIcon />
        <VisuallyHidden>Increase product quantity</VisuallyHidden>
      </ProductQuantityButton>
    </div>
  );
}
