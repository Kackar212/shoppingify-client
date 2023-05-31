import { Category as ICategory } from "../../common/interfaces/category.interface";
import { Product as IProduct } from "../../common/interfaces/product.interface";
import {
  PaginationState,
  UsePaginationResult,
} from "../../hooks/usePagination";
import { Loader } from "../loader/loader.component";
import { Paginator } from "../paginator/paginator.component";
import { Product } from "../product/product.component";
import styles from "./category.module.scss";

interface CategoryProps {
  pagination: UsePaginationResult;
  category: ICategory;
  products: IProduct<ICategory>[];
}

export function Category({ pagination, category, products }: CategoryProps) {
  const { total, state } = pagination;
  const isPaginationStateStart = state === PaginationState.Start;

  return (
    <div>
      <div className={styles.container}>
        <h2 className={styles.categoryName}>
          {category.name} ({total})
        </h2>
        <div className={styles.products}>
          {products.map(({ name, id }) => (
            <Product key={id} id={id} name={name} />
          ))}
        </div>
      </div>
      <div className={styles.paginator}>
        {isPaginationStateStart && (
          <div className={styles.loader}>
            <Loader size={32} />
          </div>
        )}
        <Paginator {...pagination} />
      </div>
    </div>
  );
}
