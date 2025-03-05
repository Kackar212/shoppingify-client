import { ResetPasswordBody } from "../../common/interfaces/reset-password-body.interface";
import { useForgotPasswordMutation, useResetPasswordMutation } from "../../features/api";
import * as yup from "yup";
import { AuthForm } from "../auth-form/auth-form.component";
import { AuthFormContent } from "../auth-form-content/auth-form-content.component";
import { FormFieldInput } from "../../common/interfaces/form-field-input.interface";
import { API_SUCCESS } from "../../common/constants";
import { useGetErrorMessage } from "../../hooks/useGetErrorMessage";
import { ResetPasswordRequestBody } from "../../common/interfaces/reset-password-request-body.interface";

const resetPasswordSchema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

const inputs: FormFieldInput[] = [
  {
    name: "email",
    label: "Email",
  },
];

export function ForgotPasswordForm() {
  const [forgotPasswordMutation, { isSuccess, error }] =
    useForgotPasswordMutation();
  const errorMessage = useGetErrorMessage(error);

  return (
    <AuthForm<ResetPasswordRequestBody>
      onSubmit={forgotPasswordMutation}
      schema={resetPasswordSchema}
    >
      <AuthFormContent
        heading="Forgot password"
        inputs={inputs}
        successMessage={API_SUCCESS.FORGOT_PASSWORD}
        errorMessage={errorMessage}
        isSuccess={isSuccess}
      />
    </AuthForm>
  );
}
