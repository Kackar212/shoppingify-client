import { ResetPasswordBody } from "../../common/interfaces/reset-password-body.interface";
import {
  useResendActivationMailMutation,
  useResetPasswordMutation,
} from "../../features/api";
import * as yup from "yup";
import { AuthForm } from "../auth-form/auth-form.component";
import { AuthFormContent } from "../auth-form-content/auth-form-content.component";
import { FormFieldInput } from "../../common/interfaces/form-field-input.interface";
import { API_SUCCESS } from "../../common/constants";
import { useGetErrorMessage } from "../../hooks/useGetErrorMessage";

const resendMailSchema = yup
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

export function ResendMailForm() {
  const [resendActivationMail, { isSuccess, error }] =
    useResendActivationMailMutation();
  const errorMessage = useGetErrorMessage(error);

  return (
    <AuthForm<ResetPasswordBody>
      onSubmit={resendActivationMail}
      schema={resendMailSchema}
    >
      <AuthFormContent
        heading="Resend activation mail"
        inputs={inputs}
        successMessage={API_SUCCESS.MAIL_RESENT}
        errorMessage={errorMessage}
        isSuccess={isSuccess}
      />
    </AuthForm>
  );
}
