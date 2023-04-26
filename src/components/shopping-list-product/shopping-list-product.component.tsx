import { MouseEvent, useCallback, useEffect, useState } from "react";
import { ShoppingListProduct as IShoppingListProduct } from "../../common/interfaces/shopping-list-product.interface";
import { DeleteProductButton } from "../delete-product-button/delete-product-button.component";
import { ProductQuantity } from "../product-quantity/product-quantity.component";
import styles from "./shopping-list-product.module.scss";
import clsx from "clsx";
import { VisuallyHidden } from "../visually-hidden/visually-hidden.component";

interface ShoppingListProductProps extends IShoppingListProduct {
  shoppingListId: number;
  id: number;
}

export function ShoppingListProduct({
  shoppingListId,
  id,
  product: { name },
  quantity,
  isDeleted,
}: ShoppingListProductProps) {
  const [canDisplayActions, setCanDisplayActions] = useState(false);
  const [canBeDeleted, setCanBeDeleted] = useState(false);
  const actionsClassName = clsx(styles.actions, {
    [styles.actionsActive]: canDisplayActions,
  });

  const toggleActions = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;

    setCanDisplayActions((canDisplayActions) => {
      const timeout = setTimeout(() => {
        if (!canDisplayActions) {
          target.scrollIntoView({ behavior: "smooth", inline: "end" });
        }

        clearTimeout(timeout);
      }, 500);

      return !canDisplayActions;
    });
  }, []);

  useEffect(() => {
    if (isDeleted) {
      const timeout = setTimeout(() => {
        setCanBeDeleted(true);
        clearTimeout(timeout);
      }, 1000);
    }
  }, [isDeleted]);

  if (canBeDeleted) {
    return null;
  }

  return (
    <article className={isDeleted ? styles.deletedProduct : styles.product}>
      <header className={styles.header}>
        <button onClick={toggleActions} className={styles.name}>
          {name} <VisuallyHidden> - Show actions</VisuallyHidden>
        </button>
        <ProductQuantity defaultQuantity={quantity} id={id} />
      </header>
      <div className={actionsClassName}>
        <DeleteProductButton id={id} shoppingList={{ id: shoppingListId }} />
      </div>
    </article>
  );
}
