import { useRouter } from "next/router";
import { Loader } from "../loader/loader.component";
import { Products } from "../products/products.component";
import { useGetProductsQuery } from "../../features/api";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import styles from "./categories.module.scss";

export function Categories() {
  const router = useRouter();

  const { categories, isFetching } = useGetProductsQuery(
    router.isFallback ? skipToken : undefined,
    {
      refetchOnMountOrArgChange: 9,
      selectFromResult(result) {
        return {
          categories: result.data?.data,
          ...result,
        };
      },
    }
  );

  if (!categories) {
    return (
      <div className={styles.loader}>
        <Loader size={48} />
      </div>
    );
  }

  return (
    <div>
      {isFetching && (
        <div className={styles.fetchingLoader}>
          <Loader />
        </div>
      )}
      {categories.map((category) => (
        <Products
          key={category.id}
          category={category}
          products={category.products}
        />
      ))}
      {!categories.length && <p className={styles.noItems}>No items!</p>}
    </div>
  );
}
