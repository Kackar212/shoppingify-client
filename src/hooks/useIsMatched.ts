import { hashRouterContext } from "../common/context/hash-router/hash-router.context";
import { useSafeContext } from "./useSafeContext";

export function useIsMatched(path: string) {
  const { route } = useSafeContext(hashRouterContext);

  return route && route.pathname === path;
}
