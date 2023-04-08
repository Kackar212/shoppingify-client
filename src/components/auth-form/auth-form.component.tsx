import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "../form/form.component";
import { VALIDATION_MODE_ALL } from "../../common/constants";
import { FieldValues, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import styles from "./auth-form.module.scss";
import { ReactNode } from "react";

interface AuthFormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  schema: yup.ObjectSchema<Record<string, unknown>>;
  children: ReactNode;
}

export function AuthForm<T extends FieldValues>({
  onSubmit,
  schema,
  children,
}: AuthFormProps<T>) {
  return (
    <Form<T>
      onSubmit={onSubmit}
      options={{
        resolver: yupResolver(schema),
        mode: VALIDATION_MODE_ALL,
      }}
      className={styles.form}
    >
      {children}
    </Form>
  );
}
