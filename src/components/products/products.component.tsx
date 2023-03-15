import Link from "next/link";
import { Category } from "../../common/interfaces/category.interface";
import { Product } from "../product/product.component";
import { Product as IProduct } from "../../common/interfaces/product.interface";
import styles from "./products.module.scss";
import slugify from "slugify";

interface ProductsProps {
  category: Category;
  products: IProduct<Category>[];
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
        {products.map(({ name, id }) => (
          <Product key={id} id={id} name={name} />
        ))}
      </div>
    </section>
  );
}
