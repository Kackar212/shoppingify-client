import { ReactElement } from "react";
import { useGetActiveListQuery } from "../../features/api";
import { ShoppingListProducts } from "../shopping-list-products/shopping-list-products.component";
import { CreateProduct } from "../create-product/create-product.component";
import { SaveListForm } from "../save-list-form/save-list-form.component";
import styles from "./shopping-list.module.scss";
import { ChangeStatus } from "../change-status/change-status.component";
import { selectShoppingList } from "../../features/slices/shopping-list.slice";
import { useSelector } from "react-redux";

export function ShoppingList(): ReactElement {
  const { data: shoppingList, name } = useGetActiveListQuery(undefined, {
    selectFromResult(state) {
      return {
        ...state,
        name: state.data?.data.name,
        data: state.data?.data,
      };
    },
  });

  const { isOpen } = useSelector(selectShoppingList);

  return (
    <section className={isOpen ? styles.shoppingListOpen : styles.shoppingList}>
      <CreateProduct />
      <h2>{name}</h2>
      <ShoppingListProducts />
      {shoppingList && name ? (
        <ChangeStatus shoppingListId={shoppingList?.id} />
      ) : (
        <SaveListForm />
      )}
    </section>
  );
}
