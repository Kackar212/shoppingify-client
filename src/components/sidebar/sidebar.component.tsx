import { PropsWithChildren, useEffect, useState } from "react";
import { useGoTo } from "../../hooks/useGoTo";
import FocusTrap from "focus-trap-react";
import { Link } from "../link/link.component";
import { ArrowIcon } from "../arrow-icon/arrow-icon.component";
import clsx from "clsx";
import styles from "./sidebar.module.scss";
import { useRouter } from "next/router";

interface SidebarProps {
  isClosed?: boolean;
}

export function Sidebar({
  children,
  isClosed,
}: PropsWithChildren<SidebarProps>) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { href, goTo } = useGoTo({
    delay: 500,
    onLeave: () => setIsMounted(false),
  });
  const className = clsx(styles.container, {
    [styles.showContainer]: isMounted,
  });

  useEffect(() => {
    if (!isClosed) {
      return;
    }

    setIsMounted(false);
    const timeout = setTimeout(() => {
      router.push(router.route);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClosed]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <FocusTrap>
      <section className={className}>
        <div className={styles.scrollContainer}>
          <Link href={href} onClick={goTo} className={styles.back}>
            <ArrowIcon className={styles.arrow} /> back
          </Link>
          {children}
        </div>
      </section>
    </FocusTrap>
  );
}
