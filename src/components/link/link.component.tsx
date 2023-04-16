import { LinkProps, default as NextLink } from "next/link";
import { HTMLProps, PropsWithChildren } from "react";
import styles from "./link.module.scss";
import clsx from "clsx";

export function Link({
  children,
  className,
  ...props
}: PropsWithChildren<
  LinkProps & Omit<HTMLProps<HTMLAnchorElement>, "href" | "ref">
>) {
  const computedClassName = clsx(styles.link, className);

  return (
    <NextLink {...props} className={computedClassName}>
      {children}
    </NextLink>
  );
}
