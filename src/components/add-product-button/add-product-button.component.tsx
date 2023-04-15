import { VisuallyHidden } from "../visually-hidden/visually-hidden.component";
import { PlusIcon } from "../plus-icon/plus-icon.component";
import styles from "./add-product-button.module.scss";
import {
  useAddProductToListMutation,
  useGetActiveListQuery,
} from "../../features/api";
import { useCallback } from "react";
import { Button } from "../button/button.component";
import { useMutationDebounce } from "../../hooks/useDebounceMutation";
import { toast } from "react-toastify";

interface AddProductButtonProps {
  id: number;
  name: string;
}

export function AddProductButton({ name, id }: AddProductButtonProps) {
  const [addProductToList, { isLoading }] = useMutationDebounce(
    useAddProductToListMutation
  );
  const { data } = useGetActiveListQuery();

  const addProduct = useCallback(() => {
    if (!data) {
      return;
    }

    const {
      data: { products },
    } = data;

    const isProductAlreadyInList = !!products.find(
      ({ product, isDeleted }) => product.id === id && !isDeleted
    );

    if (isProductAlreadyInList) {
      return toast.error("Product is already in your list!");
    }

    addProductToList(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data]);

  return (
    <Button
      type="button"
      className={styles.button}
      onClick={addProduct}
      isLoading={isLoading}
    >
      <PlusIcon color="#000" />
      <VisuallyHidden>Add {name} to list</VisuallyHidden>
    </Button>
  );
}
