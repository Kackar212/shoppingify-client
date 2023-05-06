import { useLogoutMutation } from "../src/features/api";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import { LOGIN_ROUTE } from "../src/common/constants";
import { useRedirect } from "../src/hooks/useRedirect";

const LOGOUT_TOAST = "LOGOUT_TOAST";
export default function Logout() {
  const [logout] = useLogoutMutation();
  const redirect = useRedirect(LOGIN_ROUTE);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      return;
    }

    isMounted.current = true;
    const logoutPromise = logout();

    toast
      .promise(
        logoutPromise,
        {
          pending: "Logging out...",
          success: "You have benn logged out!",
        },
        { toastId: LOGOUT_TOAST }
      )
      .then(() => {
        redirect();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
