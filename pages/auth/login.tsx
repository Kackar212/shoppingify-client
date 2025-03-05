import { LoginForm } from "../../src/components/login-form/login-form.component";
import { FormFooter } from "../../src/components/form-footer/form-footer.component";
import { Link } from "../../src/components/link/link.component";

export default function Login() {
  return (
    <section>
      <LoginForm />
      <FormFooter>
        <p>
          You don&apos;t have account?{" "}
          <Link href="/auth/register">Sign up</Link>
        </p>
        <p>
          You forgot password?{" "}
          <Link href="/auth/forgot-password">Reset password</Link>
        </p>
        <p>
          Do you want to{" "}
          <Link href="/auth/resend-activation-mail">
            resent activation mail
          </Link>
          ?
        </p>
      </FormFooter>
    </section>
  );
}
