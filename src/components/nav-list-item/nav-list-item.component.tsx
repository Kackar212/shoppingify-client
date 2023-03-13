import Link from "next/link";
import styles from "./nav-list-item.module.scss";
import Image from "next/image";

interface NavListItemProps {
  href: string;
  icon: {
    src: string;
    alt: string;
  };
}

export function NavListItem({ href, icon }: NavListItemProps) {
  return (
    <li className={styles.listItem}>
      <Link href={href} className={styles.link}>
        <Image src={icon.src} alt={icon.alt} width={24} height={24} />
      </Link>
    </li>
  );
}
