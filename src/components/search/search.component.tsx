import CreatableSelect from "react-select/creatable";
import { GroupBase, OptionsOrGroups, SingleValue } from "react-select";
import { Option } from "../../hooks/useSearch";

interface SearchProps {
  name: string;
  onInputChange: (value: string) => void;
  options: OptionsOrGroups<Option, GroupBase<Option>>;
  onChange: (option: SingleValue<Option>) => void;
  onCreateOption: (value: string) => void;
  value: SingleValue<Option>;
}

const INSTANCE_ID_PREFIX = "__search__";

export function Search({
  name,
  onInputChange,
  options,
  onChange,
  onCreateOption,
  value,
}: SearchProps) {
  return (
    <CreatableSelect
      instanceId={`${INSTANCE_ID_PREFIX}${name}`}
      options={options}
      onInputChange={onInputChange}
      onChange={onChange}
      onCreateOption={onCreateOption}
      value={value}
      isClearable
    />
  );
}
