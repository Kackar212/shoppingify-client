import { PropsWithChildren, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/slices/auth.slice";
import { Modal } from "../modal/modal.component";
import { useRedirect } from "../../hooks/useRedirect";
import { Link } from "../link/link.component";

const LOGIN_PAGE_ROUTE = "/auth/login";

export function PrivatePage({ children }: PropsWithChildren) {
  const { isLoggedIn } = useSelector(selectAuth);
  const redirect = useRedirect(LOGIN_PAGE_ROUTE);
  const close = useCallback(() => redirect(), [redirect]);

  return (
    <>
      {isLoggedIn && children}
      <Modal isOpen={!isLoggedIn} close={close}>
        <p>
          You are not logged in! <Link href={LOGIN_PAGE_ROUTE}>Sign in</Link>
        </p>
      </Modal>
    </>
  );
}
