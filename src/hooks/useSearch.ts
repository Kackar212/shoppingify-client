import { useCallback, useEffect, useState } from "react";
import { Options, SingleValue } from "react-select";
import { debounce } from "lodash";
import { Query, QueryState } from "../common/types";

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

export function useSearch<T extends Array<any>>(
  query: Query<T>,
  queryState: QueryState<T>,
  onMountArg: string = ""
) {
  const { data } = queryState;
  const [value, setValue] = useState<SingleValue<Option>>(
    createOption(onMountArg)
  );
  const [options, setOptions] = useState<Options<Option>>([]);

  useEffect(() => {
    query(onMountArg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onInputChange = debounce((category: string) => {
    if (data && !category) {
      return;
    }

    query(category);
  }, 200);

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
  };
}
