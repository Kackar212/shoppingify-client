import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectAuth } from "../features/slices/auth.slice";

export function useRedirect(path: string = "/", authRedirect: boolean = false) {
  const router = useRouter();
  const { isLoggedIn } = useSelector(selectAuth);

  const redirect = useCallback((redirectTo: string = path) => {
    toast.promise(router.push(redirectTo), { pending: "Redirecting..." });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authRedirect && isLoggedIn) {
      redirect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, authRedirect]);

  return redirect;
}
