import { FormFooter } from "../../src/components/form-footer/form-footer.component";
import { Link } from "../../src/components/link/link.component";
import { ResendMailForm } from "../../src/components/resend-mail-form/resend-mail-form.component";

export default function ResendActivationMail() {
  return (
    <section>
      <ResendMailForm />
      <FormFooter>
        <p>
          <Link href="/auth/login">Sign in</Link>
        </p>
      </FormFooter>
    </section>
  );
}
