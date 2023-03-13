import Image from "next/image";
import Link from "next/link";
import { CartButton } from "../cart-button/cart-button.component";

export function Navigation() {
  return (
    <header>
      <h1>
        <Image src="assets/logo.svg" alt="Shoppingify" width={70} height={70} />
      </h1>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <Image
                src="assets/list.svg"
                alt="Go to home page"
                width={35}
                height={35}
              />
            </Link>
          </li>
          <li>
            <Link href="/history">
              <Image
                src="assets/undo.svg"
                alt="Go to history page"
                width={35}
                height={35}
              />
            </Link>
          </li>
          <li>
            <Link href="/statistics">
              <Image
                src="assets/chart.svg"
                alt="Go to statistics page"
                width={35}
                height={35}
              />
            </Link>
          </li>
        </ul>
      </nav>
      <CartButton />
    </header>
  );
}
