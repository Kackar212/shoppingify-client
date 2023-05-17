import styles from "./search.module.scss";
import CreatableSelect from "react-select/creatable";
import { GroupBase, OptionsOrGroups, SingleValue } from "react-select";
import { Option } from "../../hooks/useSearch";
import React, { useCallback } from "react";
import Select, {
  PublicBaseSelectProps,
} from "react-select/dist/declarations/src/Select";
import { CreatableAdditionalProps } from "react-select/dist/declarations/src/useCreatable";

interface SearchProps {
  name: string;
  onInputChange: (value: string) => void;
  options: OptionsOrGroups<Option, GroupBase<Option>>;
  onChange: (option: SingleValue<Option>) => void;
  onCreateOption: (value: string) => void;
  value?: SingleValue<Option>;
  hideDropdownIndicator?: boolean;
  isCreatable?: boolean;
  isValidNewOption: CreatableAdditionalProps<
    Option,
    GroupBase<Option>
  >["isValidNewOption"];
  components?: PublicBaseSelectProps<
    Option,
    false,
    GroupBase<Option>
  >["components"];
}

const INSTANCE_ID_PREFIX = "__search__";

type IsValidNewOption = CreatableAdditionalProps<
  Option,
  GroupBase<Option>
>["isValidNewOption"];

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
    isCreatable = true,
    isValidNewOption: shouldCreateNewOption,
    components,
  },
  ref
) {
  const isValidNewOption = useCallback<NonNullable<IsValidNewOption>>(
    (...args) => {
      if (shouldCreateNewOption) {
        return shouldCreateNewOption(...args);
      }

      return isCreatable;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
      isValidNewOption={isValidNewOption}
      components={components}
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
            margin: "1rem 0",
          };
        },
        option: (state) => ({
          ...state,
          wordBreak: "break-word",
          fontSize: "1.15rem",
          color: "#828282",
        }),
      }}
      classNames={{
        control: () => `${styles.search} ${styles.input}`,
        valueContainer: () => styles.valueContainer,
        placeholder: () => styles.placeholder,
        menuList: () => styles.menuList,
        menu: () => styles.menu,
        option: (state) => {
          if (state.isFocused) {
            return styles.focusedOption;
          }

          if (state.isSelected) {
            return styles.selectedOption;
          }

          return styles.option;
        },
      }}
    />
  );
});
