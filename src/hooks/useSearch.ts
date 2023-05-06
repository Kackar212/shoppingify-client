import { useCallback, useEffect, useState } from "react";
import { Options, SingleValue } from "react-select";
import { debounce } from "lodash";
import { Query, QueryState } from "../common/types";

interface UseSearchArgs<T> {
  query: Query<T>;
  queryState: QueryState<T>;
  transformValue?: (value: string) => unknown;
  onMountArg?: string;
}

export interface Option {
  value: string;
  label: string;
  id?: number;
  name?: string;
}

function createOptions<T extends Array<any>>(
  prevOptions: Options<Option>,
  queryData: T
) {
  return queryData
    .filter(({ id }) => !prevOptions.find((item) => item.id === id))
    .map(({ name, id }) => createOption(name, id));
}

function createOption(
  value: string,
  id?: number,
  label = value,
  name = value
): Option {
  return {
    id,
    value,
    label,
    name,
  };
}

export function useSearch<T extends Array<any>>({
  query,
  queryState,
  transformValue = (value) => value,
  onMountArg = "",
}: UseSearchArgs<T>) {
  const { data } = queryState;
  const [value, setValue] = useState<SingleValue<Option>>();
  const [options, setOptions] = useState<Options<Option>>([]);

  useEffect(() => {
    query(transformValue(onMountArg));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onInputChange = debounce((category: string) => {
    if (data && !category) {
      return;
    }

    query(transformValue(category));
  }, 200);

  const reset = useCallback(() => {
    setValue(undefined);
    setOptions([]);

    query(onMountArg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onMountArg]);

  const onCreateOption = useCallback((category: string) => {
    const newOption = createOption(category);

    setValue(newOption);
    setOptions((options) => {
      return [...options, newOption];
    });
  }, []);

  const onChange = useCallback(
    (option: SingleValue<Option>) => {
      if (option?.value === value?.value) {
        return;
      }

      setValue(option);
    },
    [value]
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    return setOptions((options) => [
      ...options,
      ...createOptions(options, data.data),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return {
    onInputChange,
    onChange,
    onCreateOption,
    options,
    value,
    reset,
  };
}
