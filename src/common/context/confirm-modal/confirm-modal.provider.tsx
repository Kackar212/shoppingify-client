import { ReactNode } from "react";
import { confirmModalContext } from "./confirm-modal.context";
import { UseConfirmModalResult } from "./confirm-modal.hook";

const { Provider } = confirmModalContext;

interface ProviderProps {
  children: ReactNode;
  value: UseConfirmModalResult;
}

export function ConfirmModalProvider({ children, value }: ProviderProps) {
  return <Provider value={value}>{children}</Provider>;
}
