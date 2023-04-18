import { FormFooter } from "../../src/components/form-footer/form-footer.component";
import { Link } from "../../src/components/link/link.component";
import { ResetPasswordForm } from "../../src/components/reset-password-form/reset-password-form.component";

export default function ResetPassword() {
  return (
    <section>
      <ResetPasswordForm />
      <FormFooter>
        <Link href="/auth/login">Back to sign in</Link>
      </FormFooter>
    </section>
  );
}
