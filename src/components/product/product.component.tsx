import { AddProductButton } from "../add-product-button/add-product-button.component";
import styles from "./product.module.scss";

interface ProductProps {
  id: number;
  name: string;
}

export function Product({ id, name }: ProductProps) {
  return (
    <div className={styles.product}>
      <span className={styles.name}>{name}</span>
      <AddProductButton id={id} name={name} />
    </div>
  );
}
