import { ReactNode } from "react";
import { Navigation } from "./navigation/navigation.component";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
}
