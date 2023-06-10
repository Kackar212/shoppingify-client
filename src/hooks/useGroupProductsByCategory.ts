import { useCallback, useMemo } from "react";
import { ShoppingListProduct } from "../common/interfaces/shopping-list-product.interface";
import { CategoryWithoutProducts } from "../common/types";

export function useGroupProductsByCategory(products: ShoppingListProduct[]) {
  const hasCategory = useCallback(
    (
      categories: CategoryWithoutProducts[],
      category: CategoryWithoutProducts
    ) => {
      return categories.find(({ name }) => name === category.name);
    },
    []
  );

  return useMemo(
    () =>
      products
        .reduce<CategoryWithoutProducts[]>(
          (categories, { product: { category } }) => {
            if (hasCategory(categories, category)) {
              return categories;
            }

            categories.push(category);

            return categories;
          },
          []
        )
        .map((category) => {
          return {
            category,
            products: products
              .filter(
                ({
                  product: {
                    category: { name: categoryName },
                  },
                }) => categoryName === category.name
              )
              .map(({ product, quantity }) => ({ ...product, quantity })),
          };
        }),
    [products, hasCategory]
  );
}
