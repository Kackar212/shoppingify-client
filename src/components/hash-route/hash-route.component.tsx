import { PropsWithChildren } from "react";
import { hashRouterContext } from "../../common/context/hash-router/hash-router.context";
import { useSafeContext } from "../../hooks/useSafeContext";
import { useIsMatched } from "../../hooks/useIsMatched";

export function HashRoute({
  path,
  children = null,
}: PropsWithChildren<{ path: string }>) {
  const isMatched = useIsMatched(path);
  const { isMounted } = useSafeContext(hashRouterContext);

  if (!isMatched || !isMounted) {
    return null;
  }

  return <>{children}</>;
}
