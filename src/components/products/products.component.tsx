import Link from "next/link";
import { Category } from "../../common/interfaces/category.interface";
import { Product } from "../product/product.component";
import styles from "./products.module.scss";
import slugify from "slugify";
import { ProductWithQuantity } from "../../common/interfaces/product-with-quantity.interface";

interface ProductsProps {
  category: Omit<Category, "products">;
  products: ProductWithQuantity[];
}

export function Products({ category: { name, id }, products }: ProductsProps) {
  const categoryName = slugify(name, { lower: true });

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <Link
          href={`category/${categoryName}/${id}`}
          className={styles.category}
        >
          {name}
        </Link>
      </header>
      <div className={styles.products}>
        {products.map(({ name, id, quantity }) => (
          <Product key={id} id={id} name={name} quantity={quantity} />
        ))}
      </div>
    </section>
  );
}
