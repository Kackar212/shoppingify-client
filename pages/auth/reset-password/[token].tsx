import { useRouter } from "next/router";
import { FormFooter } from "../../../src/components/form-footer/form-footer.component";
import { Link } from "../../../src/components/link/link.component";
import { ResetPasswordForm } from "../../../src/components/reset-password-form/reset-password-form.component";
import { useRedirect } from "../../../src/hooks/useRedirect";
import { useEffect } from "react";
import { NextPageContext } from "next/types";

interface ResetPasswordProps {
  token: string;
}

export default function ResetPassword({ token }: ResetPasswordProps) {
  const redirect = useRedirect();
  
  useEffect(() => {
    if (typeof token !== "string") {
      redirect('/');
    }
  }, [])

  if (!token) {
    return null;
  }

  return (
    <section>
      <ResetPasswordForm token={token as string} />
      <FormFooter>
        <Link href="/auth/login">Back to sign in</Link>
      </FormFooter>
    </section>
  );
}

export function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      token: context.query.token,
    }
  }
}
