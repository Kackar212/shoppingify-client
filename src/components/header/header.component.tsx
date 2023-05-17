import { searchProducts } from "../../features/api";
import { useSearch } from "../../hooks/useSearch";
import { Search } from "../search/search.component";
import { SelectProductOption } from "../select-product-option/select-product-option.component";
import styles from "./header.module.scss";

export function Header() {
  const [searchProductsByName, products] = searchProducts.useLazyQuery();
  const searchProps = useSearch({
    query: searchProductsByName,
    queryState: products,
    transformValue: (value) => ({ name: value }),
  });

  return (
    <div className={styles.header}>
      <p className={styles.text}>
        <span className={styles.name}>Shoppingify</span> allows you take your
        shopping list wherever you go
      </p>
      <Search
        name="product"
        {...searchProps}
        isCreatable={false}
        components={{ Option: SelectProductOption }}
        isMenuStatic={false}
      />
    </div>
  );
}
