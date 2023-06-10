import slugify from "slugify";
import { AddProductButton } from "../add-product-button/add-product-button.component";
import styles from "./product.module.scss";
import Link from "next/link";

interface ProductProps {
  id: number;
  name: string;
  quantity?: number;
}

export function Product({ id, name, quantity }: ProductProps) {
  const slugifiedName = slugify(name, { lower: true });

  return (
    <div className={styles.product}>
      <Link className={styles.name} href={`#product/${slugifiedName}/${id}`}>
        {name}
      </Link>
      {quantity ? (
        <span className={styles.quantity}>{quantity} pcs</span>
      ) : (
        <AddProductButton id={id} name={name} />
      )}
    </div>
  );
}
