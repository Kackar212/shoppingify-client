import { RegisterForm } from "../../src/components/register-form/register-form.component";
import { FormFooter } from "../../src/components/form-footer/form-footer.component";
import { Link } from "../../src/components/link/link.component";

export default function Login() {
  return (
    <section>
      <RegisterForm />
      <FormFooter>
        You already have account?
        <Link href="/auth/login">Sign in</Link>
      </FormFooter>
    </section>
  );
}
