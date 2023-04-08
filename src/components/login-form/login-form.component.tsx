import { useCallback, useEffect } from "react";
import { LoginBody } from "../../common/interfaces/login-body.interface";
import { useGetErrorMessage } from "../../hooks/useGetErrorMessage";
import { useLoginMutation } from "../../features/api";
import { API_SUCCESS } from "../../common/constants";
import { toast } from "react-toastify";
import * as yup from "yup";
import { FormFieldInput } from "../../common/interfaces/form-field-input.interface";
import { AuthFormContent } from "../auth-form-content/auth-form-content.component";
import { AuthForm } from "../auth-form/auth-form.component";

export const inputs: FormFieldInput[] = [
  { name: "email", label: "Email" },
  { name: "password", label: "Password", type: "password" },
];

export const signInSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(30).required(),
  })
  .required();

export function LoginForm() {
  const [signInUser, { error, isSuccess, isLoading, data }] =
    useLoginMutation();
  const errorMessage = useGetErrorMessage(error);

  const signIn = useCallback(
    async (data: LoginBody) => {
      if (isLoading) {
        return;
      }

      toast.promise(signInUser(data), { pending: "Wait" });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading]
  );

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("user", JSON.stringify(data.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <AuthForm<LoginBody> schema={signInSchema} onSubmit={signIn}>
      <AuthFormContent
        inputs={inputs}
        isSuccess={isSuccess}
        heading="Sign in"
        errorMessage={errorMessage}
        successMessage={API_SUCCESS.LOGGED_IN}
      />
    </AuthForm>
  );
}
