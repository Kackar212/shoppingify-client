import { ResetPasswordBody } from "../../common/interfaces/reset-password-body.interface";
import { useResetPasswordMutation } from "../../features/api";
import * as yup from "yup";
import { AuthForm } from "../auth-form/auth-form.component";
import { AuthFormContent } from "../auth-form-content/auth-form-content.component";
import { FormFieldInput } from "../../common/interfaces/form-field-input.interface";
import { API_SUCCESS } from "../../common/constants";
import { useGetErrorMessage } from "../../hooks/useGetErrorMessage";

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

export function ResetPasswordForm() {
  const [resetPasswordMutation, { isSuccess, error }] =
    useResetPasswordMutation();
  const errorMessage = useGetErrorMessage(error);

  return (
    <AuthForm<ResetPasswordBody>
      onSubmit={resetPasswordMutation}
      schema={resetPasswordSchema}
    >
      <AuthFormContent
        heading="Reset password"
        inputs={inputs}
        successMessage={API_SUCCESS.PASSWORD_RESETED}
        errorMessage={errorMessage}
        isSuccess={isSuccess}
      />
    </AuthForm>
  );
}
