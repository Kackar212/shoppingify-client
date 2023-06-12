import { ShoppingList } from "../../common/interfaces/shopping-list.interface";
import { useGroupProductsByCategory } from "../../hooks/useGroupProductsByCategory";
import { UsePaginationResult } from "../../hooks/usePagination";
import { Paginator } from "../paginator/paginator.component";
import { Products } from "../products/products.component";
import { StatusBadge } from "../status-badge/status-badge.component";
import { Time } from "../time/time.component";
import styles from "./history-list-details.module.scss";

interface HistoryListDetailsProps {
  shoppingList: ShoppingList;
  pagination: UsePaginationResult;
}

export function HistoryListDetails({
  shoppingList,
  pagination,
}: HistoryListDetailsProps) {
  const categories = useGroupProductsByCategory(shoppingList?.products || []);

  return (
    <div className={styles.container}>
      <h2>{shoppingList.name}</h2>
      <div className={styles.row}>
        <StatusBadge status={shoppingList.status} />
        <Time date={shoppingList.createdAt} />
      </div>
      {categories.map(({ category, products }) => (
        <Products key={category.name} category={category} products={products} />
      ))}
      <Paginator {...pagination} />
    </div>
  );
}
