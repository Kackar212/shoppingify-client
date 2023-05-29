import Image from "next/image";
import styles from "./create-product.module.scss";
import Link from "next/link";
import bottleIcon from "/public/assets/images/source.svg";

export function CreateProduct() {
  return (
    <article className={styles.container}>
      <Image
        src={bottleIcon}
        alt=""
        width={81}
        height={135}
        className={styles.image}
      />
      <header className={styles.header}>
        <p className={styles.headerText}>Didn&apos;t find what you need?</p>
      </header>
      <Link href="#create-product" className={styles.button}>
        Add item
      </Link>
    </article>
  );
}
