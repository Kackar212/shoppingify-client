import { FormHTMLAttributes, ReactNode } from "react";
import {
  useForm,
  FormProvider,
  FieldValues,
  SubmitHandler,
  UseFormProps,
} from "react-hook-form";

interface FormProps<T extends FieldValues>
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  onSubmit?: SubmitHandler<T>;
  children: ReactNode;
  options?: UseFormProps<T>;
}

export function Form<T extends FieldValues>({
  onSubmit = () => null,
  children,
  options = {},
  ...attrs
}: FormProps<T>) {
  const methods = useForm<T>(options);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...attrs}>
        {children}
      </form>
    </FormProvider>
  );
}
