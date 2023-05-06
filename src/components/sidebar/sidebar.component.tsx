import { PropsWithChildren, useEffect, useState } from "react";
import { useGoTo } from "../../hooks/useGoTo";
import FocusTrap from "focus-trap-react";
import { Link } from "../link/link.component";
import { ArrowIcon } from "../arrow-icon/arrow-icon.component";
import clsx from "clsx";
import styles from "./sidebar.module.scss";

export function Sidebar({ children }: PropsWithChildren) {
  const [isMounted, setIsMounted] = useState(false);
  const { href, goTo } = useGoTo({
    delay: 500,
    onLeave: () => setIsMounted(false),
  });
  const className = clsx(styles.container, {
    [styles.showContainer]: isMounted,
  });

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
