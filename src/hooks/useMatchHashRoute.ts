import { useRouter } from "next/router";
import { HashRoute } from "../common/interfaces/hash-route.interface";

export function useMatchHashRoute(
  routes: Record<string, HashRoute>
): HashRoute | null {
  const router = useRouter();

  const [_, hashPathname] = router.asPath.split("#");
  if (!hashPathname) {
    return null;
  }

  const route =
    Object.entries(routes)
      .map(([_, { pathname, matchers = {} }]) => {
        const regex = Object.entries(matchers).reduce(
          (pathname, [name, matcher]) => {
            return pathname.replace(`:${name}`, `(?<${name}>${matcher})`);
          },
          pathname
        );

        const routeMatcher = new RegExp(regex);

        const match = hashPathname.match(routeMatcher);

        const isMatched = !!match;

        return {
          pathname,
          matchers,
          isMatched,
          parameters: isMatched && match.groups ? match.groups : {},
        };
      })
      .find(({ isMatched }) => isMatched) || null;

  return route;
}
