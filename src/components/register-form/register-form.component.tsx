import { useCallback } from "react";
import { useGetErrorMessage } from "../../hooks/useGetErrorMessage";
import { useRegisterMutation } from "../../features/api";
import { API_SUCCESS } from "../../common/constants";
import { toast } from "react-toastify";
import * as yup from "yup";
import { FormFieldInput } from "../../common/interfaces/form-field-input.interface";
import { AuthFormContent } from "../auth-form-content/auth-form-content.component";
import {
  inputs as signInInputs,
  signInSchema,
} from "../login-form/login-form.component";
import { RegisterBody } from "../../common/interfaces/register-body.interface";
import { AuthForm } from "../auth-form/auth-form.component";

export const inputs: FormFieldInput[] = [
  { name: "name", label: "Name" },
  ...signInInputs,
];

export const signUpSchema = signInSchema
  .shape({
    name: yup.string().min(3).max(25).required(),
  })
  .required();

export function RegisterForm() {
  const [signUpUser, { error, isSuccess, isLoading }] = useRegisterMutation();
  const errorMessage = useGetErrorMessage(error);

  const signUp = useCallback(
    async (data: RegisterBody) => {
      if (isLoading) {
        return;
      }

      toast.promise(signUpUser(data), { pending: "Wait" });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading]
  );

  return (
    <AuthForm<RegisterBody> schema={signUpSchema} onSubmit={signUp}>
      <AuthFormContent
        inputs={inputs}
        isSuccess={isSuccess}
        heading="Sign up"
        errorMessage={errorMessage}
        successMessage={API_SUCCESS.ACCOUNT_CREATED}
      />
    </AuthForm>
  );
}
