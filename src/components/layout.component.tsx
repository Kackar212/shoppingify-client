import { ReactNode } from "react";
import { Navigation } from "./navigation/navigation.component";

interface LayoutProps {
  children: ReactNode;
  className: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className={className}>
      <Navigation />
      <main>{children}</main>
    </div>
  );
}
