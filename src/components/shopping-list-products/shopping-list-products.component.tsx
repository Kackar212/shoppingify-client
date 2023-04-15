import Image from "next/image";
import { useGetActiveListQuery } from "../../features/api";
import { Loader } from "../loader/loader.component";
import { ShoppingListProduct } from "../shopping-list-product/shopping-list-product.component";
import styles from "./shopping-list-products.module.scss";
import { ShoppingListProduct as IShoppingListProduct } from "../../common/interfaces/shopping-list-product.interface";
import { useMemo } from "react";
import { selectShoppingList } from "../../features/slices/shopping-list.slice";
import { useSelector } from "react-redux";

export function ShoppingListProducts() {
  const { data: shoppingList } = useGetActiveListQuery(undefined, {
    selectFromResult: (state) => {
      return {
        ...state,
        data: state.data?.data,
      };
    },
  });
  const { hasProducts } = useSelector(selectShoppingList);

  const groupedProducts = useMemo(() => {
    if (!shoppingList) {
      return [];
    }

    return Object.entries(
      shoppingList.products.reduce((result, product) => {
        const {
          product: {
            category: { name: category },
          },
        } = product;

        if (category in result) {
          result[category].push(product);

          return result;
        }

        result[category] = [product];

        return result;
      }, {} as Record<string, IShoppingListProduct[]>)
    );
  }, [shoppingList]);

  if (!shoppingList) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      {!hasProducts ? (
        <div className={styles.noItems}>
          <span className={styles.noItemsText}>No items!</span>
          <Image
            src="/assets/no-item.svg"
            alt=""
            width="180"
            height="150"
            className={styles.noItemsImage}
            priority
          />
        </div>
      ) : (
        <div className={styles.products}>
          {groupedProducts.map(([category, products]) => {
            const hasCategoryProducts = !!products.filter(
              ({ isDeleted }) => !isDeleted
            ).length;
            return (
              <div
                key={category}
                className={
                  hasCategoryProducts ? styles.category : styles.deleteCategory
                }
              >
                <p className={styles.categoryName}>{category}</p>
                {products.map((product) => (
                  <ShoppingListProduct
                    key={product.id}
                    shoppingListId={shoppingList.id}
                    {...product}
                  />
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
