import { FieldErrors, FieldValues, useFormContext } from "react-hook-form";
import { ReactNode } from "react";
import styles from "./form-field.module.scss";
import { Label } from "../label/label.component";
import { Error } from "../error/error.component";

interface FormFieldProps {
  name: string;
  label: string;
  render: (
    props: Omit<FormFieldProps, "render" | "className"> & {
      errors: FieldErrors<FieldValues>;
    }
  ) => ReactNode;
  required?: boolean;
  placeholder?: string;
  errorId?: string;
  className?: string;
}

export function FormField({
  name,
  label,
  render,
  required = false,
  placeholder = `Enter a ${label.toLowerCase()}`,
  errorId = `${name}-error`,
  className,
}: FormFieldProps) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`${styles.field} ${className}`}>
      <Label text={label} name={name} required={required} />
      <Error errorId={errorId} name={name} />
      {render({ name, label, errors, required, errorId, placeholder })}
    </div>
  );
}
