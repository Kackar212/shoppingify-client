import { MutationDefinition } from "@reduxjs/toolkit/dist/query";
import { UseMutation } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { DebouncedFunc, debounce } from "lodash";
import { useRef } from "react";

export function useMutationDebounce<T>(
  useMutation: UseMutation<MutationDefinition<any, any, any, T>>,
  wait: number = 250
) {
  const [trigger, state] = useMutation();
  const debouncedTrigger = useRef(debounce(trigger, wait)).current;

  return [debouncedTrigger, state] as [
    DebouncedFunc<typeof trigger>,
    typeof state
  ];
}
