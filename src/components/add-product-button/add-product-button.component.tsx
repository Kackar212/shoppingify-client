import { VisuallyHidden } from "../visually-hidden/visually-hidden.component";
import { PlusIcon } from "../plus-icon/plus-icon.component";
import styles from "./add-product-button.module.scss";

interface AddProductButtonProps {
  id: number;
  name: string;
}

export function AddProductButton({ name, id }: AddProductButtonProps) {
  return (
    <button type="button" className={styles.button}>
      <PlusIcon color="#000" />
      <VisuallyHidden>Add {name} to list</VisuallyHidden>
    </button>
  );
}
