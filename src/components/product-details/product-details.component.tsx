import { useCallback } from "react";
import {
  useDeleteProductMutation,
  useGetProductQuery,
} from "../../features/api";
import { useParams } from "../../hooks/useParams";
import styles from "./product-details.module.scss";
import { Sidebar } from "../sidebar/sidebar.component";
import Image from "next/image";
import {
  Action,
  ConfirmModalProvider,
  useConfirmModal,
} from "../../common/context/confirm-modal";
import { ConfirmModal } from "../confirm-modal/confirm-modal.component";
import { Button } from "../button/button.component";
import { ProductDetail } from "../product-detail/product-detail.component";
import { toast } from "react-toastify";
import { VisuallyHidden } from "../visually-hidden/visually-hidden.component";
import { AddProductButton } from "../add-product-button/add-product-button.component";

export function ProductDetails() {
  const [deleteProduct, { isLoading: isDeleting, isSuccess }] =
    useDeleteProductMutation();
  const { id } = useParams();
  const { data } = useGetProductQuery(+id, { skip: isSuccess || isDeleting });
  const modalContext = useConfirmModal();

  const onConfirm = useCallback(() => {
    toast.promise(
      deleteProduct(+id),
      {
        pending: "Deleting product, please wait.",
        success: "Product deleted!",
        error: "Product not deleted! Try again later!",
      },
      { role: "generic" }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const openConfirmModal = useCallback(() => {
    modalContext.dispatch({ type: Action.Open });
  }, [modalContext]);

  if (!data) {
    return null;
  }

  const {
    data: {
      category: { name: categoryName },
      name,
      image,
      note,
    },
  } = data;

  return (
    <>
      <Sidebar isClosed={isSuccess}>
        <div className={styles.product}>
          {image && (
            <Image
              src={image}
              fill={true}
              alt={`Image of ${name}`}
              className={styles.productImage}
            />
          )}
          <div className={styles.details}>
            <ProductDetail name="name" text={name} hasBiggerText />
            <ProductDetail name="category" text={categoryName} />
            <ProductDetail name="note" text={note} />
          </div>
          <div className={styles.buttons}>
            <Button
              onClick={openConfirmModal}
              className={styles.cancelButton}
              isLoading={isDeleting}
            >
              delete <VisuallyHidden>{name}</VisuallyHidden>
            </Button>
            <AddProductButton
              name={name}
              id={+id}
              className={styles.addItemButton}
            >
              add to list
            </AddProductButton>
          </div>
        </div>
      </Sidebar>
      <ConfirmModalProvider value={modalContext}>
        <ConfirmModal onConfirm={onConfirm}>
          <div>
            <h2>Are you sure that you want to delete this product?</h2>
          </div>
        </ConfirmModal>
      </ConfirmModalProvider>
    </>
  );
}
