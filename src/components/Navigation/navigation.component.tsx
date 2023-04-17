import Image from "next/image";
import { CartButton } from "../cart-button/cart-button.component";
import styles from "./navigation.module.scss";
import { NavListItem } from "../nav-list-item/nav-list-item.component";
import { useSelector } from "react-redux";
import { selectShoppingList } from "../../features/slices/shopping-list.slice";

const navigationItems = [
  {
    icon: {
      src: "/assets/list.svg",
      alt: "Go to home page",
    },
    href: "/",
    tipLabel: "home",
  },
  {
    icon: {
      src: "/assets/undo.svg",
      alt: "Go to history page",
    },
    href: "/history",
    tipLabel: "history",
  },
  {
    icon: {
      src: "/assets/stats.png",
      alt: "Go to statistics page",
    },
    href: "/statistics",
    tipLabel: "statistics",
  },
];

export function Navigation() {
  const shoppingList = useSelector(selectShoppingList);

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Image
          src="/assets/logo.svg"
          alt="Shoppingify"
          width={40}
          height={40}
        />
      </h1>
      <nav>
        <ul className={styles.list}>
          {navigationItems.map(({ icon, href, tipLabel }) => (
            <NavListItem
              key={href}
              icon={icon}
              href={href}
              tipLabel={tipLabel}
            />
          ))}
        </ul>
      </nav>
      <CartButton items={shoppingList.totalItems} />
    </header>
  );
}
