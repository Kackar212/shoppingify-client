import { useRouter } from "next/router";
import { MouseEvent, MouseEventHandler, useCallback } from "react";

interface UseBackArgs {
  delay?: number;
  onLeave?: (e: MouseEvent) => void;
  href?: string;
}

export function useGoTo({ delay = 0, onLeave, href }: UseBackArgs) {
  const router = useRouter();
  const path = href || { href: router.route, query: router.query };

  const goTo: MouseEventHandler<HTMLElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (onLeave) {
        onLeave(e);
      }

      setTimeout(() => {
        router.push(path);
      }, delay);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [delay]
  );

  return { href: path, goTo };
}
