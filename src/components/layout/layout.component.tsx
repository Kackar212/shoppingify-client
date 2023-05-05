import { ReactNode } from "react";
import { Navigation } from "../navigation/navigation.component";
import styles from "./layout.module.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { ShoppingList } from "../shopping-list/shopping-list.component";
import { HashRouter } from "../../common/context/hash-router/hash-router.provider";
import { HashRoute } from "../hash-route/hash-route.component";
import { ProductDetails } from "../product-details/product-details.component";
import { CreateProductForm } from "../create-product-form/create-product-form.component";

interface LayoutProps {
  children: ReactNode;
  className: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className={`${className} ${styles.container}`}>
      <Navigation />
      <main className={styles.main}>{children}</main>
      <ShoppingList />
      <HashRouter>
        <HashRoute path="product/:name/:id">
          <ProductDetails />
        </HashRoute>
        <HashRoute path="create-product">
          <CreateProductForm />
        </HashRoute>
      </HashRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop={true}
        theme="dark"
      />
    </div>
  );
}
