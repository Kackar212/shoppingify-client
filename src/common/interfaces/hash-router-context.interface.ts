import { HashRoute } from "./hash-route.interface";

export interface HashRouterContext {
  route: HashRoute | null;
  isMounted: boolean;
}
