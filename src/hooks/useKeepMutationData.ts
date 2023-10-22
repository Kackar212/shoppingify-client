import { useRef } from "react";

export function useKeepMutationData<T>(mutationData: T, defaultData: Partial<T>) {
  const data = useRef(defaultData);

  if (mutationData) {
    data.current = mutationData;
  }

  return data;
}