import { GroupBase, OptionProps, components } from "react-select";
import { Option } from "../../hooks/useSearch";
import { useCallback } from "react";
import { Link } from "../link/link.component";

export function SelectProductOption(
  props: OptionProps<Required<Option>, false, GroupBase<Required<Option>>>
) {
  const {
    clearValue,
    data: { name, id },
  } = props;

  const selectOption = useCallback(() => {
    setTimeout(() => clearValue());
  }, [clearValue]);

  return (
    <components.Option {...props}>
      <Link
        href={`#product/${name}/${id}`}
        onClick={selectOption}
        data-value={name}
      >
        {props.data.name}
      </Link>
    </components.Option>
  );
}
