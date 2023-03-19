import Link from "next/link";
import styles from "./nav-list-item.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";

interface NavListItemProps {
  href: string;
  icon: {
    src: string;
    alt: string;
  };
}

export function NavListItem({ href, icon }: NavListItemProps) {
  const router = useRouter();
  const ariaCurrent = router.route === href ? "page" : undefined;

  return (
    <li className={styles.listItem}>
      <Link href={href} className={styles.link} aria-current={ariaCurrent}>
        <Image
          src={icon.src}
          alt={icon.alt}
          width={24}
          height={24}
          className={styles.icon}
        />
      </Link>
    </li>
  );
}
