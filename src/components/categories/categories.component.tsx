import { Loader } from "../loader/loader.component";
import { Products } from "../products/products.component";
import { useGetProductsQuery } from "../../features/api";
import styles from "./categories.module.scss";
import { Paginator } from "../paginator/paginator.component";
import { usePagination } from "../../hooks/usePagination";

interface CategoriesProps {
  take: number;
  page: number;
}

export function Categories({ take, page }: CategoriesProps) {
  const { categories, isFetching, pagination } = useGetProductsQuery(
    { take, page },
    {
      selectFromResult(result) {
        return {
          categories: result.data?.data,
          pagination: result.data?.pagination,
          ...result,
        };
      },
    }
  );
  const paginationData = usePagination({
    page,
    take,
    total: pagination?.total || 0,
  });

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
      <Paginator {...paginationData} />
    </div>
  );
}
