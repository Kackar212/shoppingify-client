import Image from "next/image";
import { CartButton } from "../cart-button/cart-button.component";
import styles from "./navigation.module.scss";
import { NavListItem } from "../nav-list-item/nav-list-item.component";

const navigationItems = [
  {
    icon: {
      src: "assets/list.svg",
      alt: "Go to home page",
    },
    href: "/",
  },
  {
    icon: {
      src: "assets/undo.svg",
      alt: "Go to history page",
    },
    href: "/history",
  },
  {
    icon: {
      src: "assets/chart.svg",
      alt: "Go to statistics page",
    },
    href: "/statistics",
  },
];

export function Navigation() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Image src="assets/logo.svg" alt="Shoppingify" width={40} height={40} />
      </h1>
      <nav>
        <ul className={styles.list}>
          {navigationItems.map(({ icon, href }) => (
            <NavListItem key={href} icon={icon} href={href} />
          ))}
        </ul>
      </nav>
      <CartButton />
    </header>
  );
}
