import { ForgotPasswordForm } from "../../src/components/forgot-password-form/forgot-password-form.component";
import { FormFooter } from "../../src/components/form-footer/form-footer.component";
import { Link } from "../../src/components/link/link.component";

export default function ForgotPassword() {
  return (
    <section>
      <ForgotPasswordForm />
      <FormFooter>
        <Link href="/auth/login">Back to sign in</Link>
      </FormFooter>
    </section>
  );
}
