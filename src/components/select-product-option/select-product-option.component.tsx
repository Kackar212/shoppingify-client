import { GroupBase, OptionProps, components } from "react-select";
import { Option } from "../../hooks/useSearch";
import { useCallback } from "react";
import { Link } from "../link/link.component";
import styles from "./select-product-option.module.scss";

export function SelectProductOption(
  props: OptionProps<Option, false, GroupBase<Option>>
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
        className={styles.link}
      >
        {props.data.name}
      </Link>
    </components.Option>
  );
}
