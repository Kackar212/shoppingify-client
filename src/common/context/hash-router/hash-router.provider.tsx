import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { hashRouterContext } from "./hash-router.context";
import { useMatchHashRoute } from "../../../hooks/useMatchHashRoute";
import { HashRoute } from "../../interfaces/hash-route.interface";

const { Provider } = hashRouterContext;

const hashRoutes: Record<string, HashRoute> = {
  [`product/:name/:id`]: {
    pathname: `product/:name/:id`,
    matchers: { name: "[a-zA-Z-0-9]+", id: "[0-9]+" },
  },
  "create-product": {
    pathname: "create-product",
  },
};

export function HashRouter({ children }: PropsWithChildren) {
  const route = useMatchHashRoute(hashRoutes);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return <Provider value={{ route, isMounted }}>{children}</Provider>;
}
