import { FormHTMLAttributes, ReactNode } from "react";
import {
  useForm,
  FormProvider,
  FieldValues,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";

interface FormProps<T extends FieldValues>
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  onSubmit?: SubmitHandler<T>;
  children: ReactNode;
  options?: UseFormProps<T>;
  contextValue?: UseFormReturn<T, any>;
}

export function Form<T extends FieldValues>({
  onSubmit = () => null,
  children,
  options = {},
  contextValue,
  ...attrs
}: FormProps<T>) {
  let methods = useForm<T>(options);
  if (contextValue) {
    methods = contextValue;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...attrs}>
        {children}
      </form>
    </FormProvider>
  );
}
