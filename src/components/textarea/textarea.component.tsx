import { FocusEventHandler, TextareaHTMLAttributes } from "react";
import {
  ChangeHandler,
  RegisterOptions,
  get,
  useFormContext,
} from "react-hook-form";
import styles from "./textarea.module.scss";

export interface TextAreaProps {
  options?: RegisterOptions;
  name: string;
  onChange?: ChangeHandler;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
}

export function TextArea({
  name,
  onChange,
  onBlur,
  options = {},
  ...attrs
}: TextAreaProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const hasError = !!get(errors, name);

  return (
    <textarea
      className={styles.textarea}
      aria-invalid={hasError}
      {...register(name, { onChange, onBlur, ...options })}
      {...attrs}
    ></textarea>
  );
}
