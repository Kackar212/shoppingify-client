import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { VisuallyHidden } from "../visually-hidden/visually-hidden.component";
import styles from "./error.module.scss";

interface ErrorProps {
  errorId: string;
  name: string;
}

export function Error({ errorId, name }: ErrorProps) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => {
        console.log(message);
        if (!message) {
          return null;
        }

        return (
          <span id={errorId} className={styles.error} aria-live="polite">
            <VisuallyHidden>Error: </VisuallyHidden>
            {message}
          </span>
        );
      }}
    />
  );
}
