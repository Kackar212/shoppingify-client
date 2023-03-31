import { FocusEventHandler, InputHTMLAttributes } from "react";
import {
  ChangeHandler,
  RegisterOptions,
  get,
  useFormContext,
} from "react-hook-form";
import styles from "./input.module.scss";

interface InputProps {
  options?: RegisterOptions;
  name: string;
  onChange?: ChangeHandler;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export function Input({
  name,
  onChange,
  onBlur,
  options = {},
  ...attrs
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const hasError = !!get(errors, name);

  return (
    <input
      className={styles.input}
      aria-invalid={hasError}
      {...register(name, { onChange, onBlur, ...options })}
      {...attrs}
    />
  );
}
