import { createContext } from "react";
import { HashRouterContext } from "../../interfaces/hash-router-context.interface";

export const hashRouterContext = createContext<HashRouterContext | null>(null);
