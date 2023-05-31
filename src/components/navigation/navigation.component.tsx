import Image from "next/image";
import { CartButton } from "../cart-button/cart-button.component";
import styles from "./navigation.module.scss";
import { NavListItem } from "../nav-list-item/nav-list-item.component";
import { useSelector } from "react-redux";
import { selectShoppingList } from "../../features/slices/shopping-list.slice";
import { selectAuth } from "../../features/slices/auth.slice";
import homepageIcon from "/public/assets/images/list.svg";
import historyPageIcon from "/public/assets/images/undo.svg";
import statisticsPageIcon from "/public/assets/images/stats.png";
import logo from "/public/assets/images/logo.svg";
import logoutPageIcon from "/public/assets/images/logout.svg";

const navigationItems = [
  {
    icon: {
      src: homepageIcon,
      alt: "Go to home page",
    },
    href: "/",
    tipLabel: "home",
  },
  {
    icon: {
      src: historyPageIcon,
      alt: "Go to history page",
    },
    href: "/history",
    tipLabel: "history",
  },
  {
    icon: {
      src: statisticsPageIcon,
      alt: "Go to statistics page",
    },
    href: "/statistics",
    tipLabel: "statistics",
  },
];

export function Navigation() {
  const shoppingList = useSelector(selectShoppingList);
  const { isLoggedIn } = useSelector(selectAuth);

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Image src={logo} alt="Shoppingify" priority />
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
          {isLoggedIn && (
            <NavListItem
              icon={{ src: logoutPageIcon, alt: "Sign out" }}
              href="/logout"
              tipLabel="sign out"
            />
          )}
        </ul>
      </nav>
      <CartButton items={shoppingList.totalItems} />
    </header>
  );
}
