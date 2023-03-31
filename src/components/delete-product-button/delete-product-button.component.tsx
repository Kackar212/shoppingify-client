import { useCallback } from "react";
import { useDeleteProductFromListMutation } from "../../features/api";
import { TrashCanIcon } from "../trash-can-icon/trash-can-icon.component";
import { VisuallyHidden } from "../visually-hidden/visually-hidden.component";
import styles from "./delete-product-button.module.scss";
import { Button } from "../button/button.component";

interface DeleteProductButtonProps {
  id: number;
  shoppingList: {
    id: number;
  };
}

export function DeleteProductButton({
  id,
  shoppingList,
}: DeleteProductButtonProps) {
  const [deleteProductFromList, { isLoading }] =
    useDeleteProductFromListMutation();

  const deleteProduct = useCallback(() => {
    deleteProductFromList({ shoppingList, id });
  }, [id, shoppingList, deleteProductFromList]);

  return (
    <Button
      onClick={deleteProduct}
      className={styles.button}
      disabled={isLoading}
      isLoading={isLoading}
    >
      <TrashCanIcon />
      <VisuallyHidden>Remove product from list</VisuallyHidden>
    </Button>
  );
}
