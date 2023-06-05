import { ShoppingList } from "../../common/interfaces/shopping-list.interface";
import { UsePaginationResult } from "../../hooks/usePagination";
import { HistoryShoppingList } from "../history-shopping-list/history-shopping-list.component";
import { Paginator } from "../paginator/paginator.component";
import styles from "./history-listing.module.scss";

interface HistoryListingProps {
  shoppingLists: Array<[string[], ShoppingList[]]>;
  pagination: UsePaginationResult;
}

export function HistoryListing({
  shoppingLists,
  pagination,
}: HistoryListingProps) {
  return (
    <article className={styles.article}>
      <h2>History</h2>
      {shoppingLists.map(([[month, year], lists]) => (
        <section key={`${month},${year}`} className={styles.section}>
          <header>
            <h3 className={styles.heading}>
              {month} {year}
            </h3>
          </header>
          <ul className={styles.lists}>
            {lists.map((list) => (
              <HistoryShoppingList key={list.id} {...list} name={list.name!} />
            ))}
          </ul>
        </section>
      ))}
      {!shoppingLists.length && (
        <p>There are no items in your shopping history!</p>
      )}
      <Paginator {...pagination} />
    </article>
  );
}
