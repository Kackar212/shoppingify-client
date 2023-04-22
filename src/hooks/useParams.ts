import { hashRouterContext } from "../common/context/hash-router/hash-router.context";
import { useSafeContext } from "./useSafeContext";

export function useParams() {
  const { route } = useSafeContext(hashRouterContext);

  return route && route.parameters ? route.parameters : {};
}
