import { LabelHTMLAttributes } from "react";
import { VisuallyHidden } from "../visually-hidden/visually-hidden.component";
import styles from "./label.module.scss";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  name: string;
  text: string;
  required?: boolean;
}

export function Label({ name, text, required = false, ...attrs }: LabelProps) {
  return (
    <label htmlFor={name} className={styles.label} {...attrs}>
      {text}
      {required ? (
        <span>
          <VisuallyHidden> (required)</VisuallyHidden>
          <span aria-hidden="true">*</span>
        </span>
      ) : (
        <span> (optional)</span>
      )}
    </label>
  );
}
