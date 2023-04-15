import { Context, useContext } from "react";

export function useSafeContext<T>(context: Context<T>) {
  const contextResult = useContext(context);

  if (contextResult === null) {
    throw new Error("Context is null!");
  }

  return contextResult;
}
