import { FormFieldInput } from "../../common/interfaces/form-field-input.interface";
import { Button } from "../button/button.component";
import { FormField } from "../form-field/form-field.component";
import { Input } from "../input/input.component";
import { useFormContext } from "react-hook-form";
import styles from "./auth-form-content.module.scss";
import { useEffect } from "react";

interface AuthFormContentProps {
  heading: string;
  errorMessage?: string;
  successMessage: string;
  inputs: FormFieldInput[];
  submitButtonText?: string;
  isSuccess: boolean;
}

export function AuthFormContent({
  heading,
  errorMessage,
  successMessage,
  inputs,
  isSuccess,
  submitButtonText = heading,
}: AuthFormContentProps) {
  const {
    reset,
    formState: { isSubmitSuccessful, defaultValues },
  } = useFormContext();

  useEffect(() => {
    if (isSubmitSuccessful && !isSuccess) {
      reset({ ...defaultValues, password: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful, isSuccess]);

  return (
    <>
      <h2>{heading}</h2>
      <p className={styles.message}>
        <span className={styles.error}>{errorMessage}</span>
        <span className={styles.success}>{isSuccess && successMessage}</span>
      </p>

      {inputs.map(
        ({ name, label, type = "text", required = true, ...rest }) => (
          <FormField
            key={name}
            name={name}
            label={label}
            required={required}
            className={styles.field}
            render={({ name, errorId, placeholder }) => {
              return (
                <Input
                  name={name}
                  id={name}
                  aria-describedby={errorId}
                  placeholder={placeholder}
                  type={type}
                  {...rest}
                />
              );
            }}
          />
        )
      )}
      <Button type="submit" className={styles.submitButton}>
        {submitButtonText}
      </Button>
    </>
  );
}
