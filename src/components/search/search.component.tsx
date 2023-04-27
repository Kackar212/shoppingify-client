import styles from "./search.module.scss";
import CreatableSelect from "react-select/creatable";
import { GroupBase, OptionsOrGroups, SingleValue } from "react-select";
import { Option } from "../../hooks/useSearch";
import React from "react";
import Select from "react-select/dist/declarations/src/Select";

interface SearchProps {
  name: string;
  onInputChange: (value: string) => void;
  options: OptionsOrGroups<Option, GroupBase<Option>>;
  onChange: (option: SingleValue<Option>) => void;
  onCreateOption: (value: string) => void;
  value?: unknown;
  hideDropdownIndicator?: boolean;
}

const INSTANCE_ID_PREFIX = "__search__";

export const Search = React.forwardRef<
  Select<any, false, GroupBase<any>>,
  SearchProps
>(function Search(
  {
    name,
    onInputChange,
    options,
    onChange,
    onCreateOption,
    value,
    hideDropdownIndicator = true,
  },
  ref
) {
  return (
    <CreatableSelect
      ref={ref}
      instanceId={`${INSTANCE_ID_PREFIX}${name}`}
      options={options}
      onInputChange={onInputChange}
      onChange={onChange}
      onCreateOption={onCreateOption}
      value={value}
      isClearable
      maxMenuHeight={210}
      placeholder={`Enter a ${name.toLowerCase()}`}
      styles={{
        dropdownIndicator: (state) => ({
          display: hideDropdownIndicator ? "none" : "block",
        }),
        indicatorSeparator: () => ({
          display: hideDropdownIndicator ? "none" : "block",
        }),
        menu: (state) => {
          return {
            position: "static",
          };
        },
      }}
      classNames={{
        control: () => `${styles.search} ${styles.input}`,
        valueContainer: () => styles.valueContainer,
        placeholder: () => styles.placeholder,
      }}
    />
  );
});
