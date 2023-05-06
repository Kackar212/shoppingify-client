import { useRouter } from "next/router";
import { useCallback } from "react";
import { toast } from "react-toastify";

export const REDIRECT_TOAST = "REDIRECT_TOAST";
export function useRedirect(path: string = "/") {
  const router = useRouter();

  const redirect = useCallback(
    (redirectTo: string = path) => {
      return new Promise<boolean>((resolve) => {
        setTimeout(() => {
          resolve(
            toast.promise(
              router.push(redirectTo),
              { pending: "Redirecting..." },
              { toastId: REDIRECT_TOAST }
            )
          );
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [path]
  );

  return redirect;
}
