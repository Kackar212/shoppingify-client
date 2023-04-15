import { createContext } from "react";
import { UseConfirmModalResult } from "./confirm-modal.hook";

export const confirmModalContext = createContext<UseConfirmModalResult | null>(
  null
);
