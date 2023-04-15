import { Dispatch, useReducer } from "react";
import {
  ConfirmModalAction,
  ConfirmModalState,
  confirmModalReducer,
} from "./confirm-modal.reducer";

export interface UseConfirmModalResult extends ConfirmModalState {
  dispatch: Dispatch<ConfirmModalAction>;
}

const initialState: ConfirmModalState = {
  isOpen: false,
};

export function useConfirmModal(): UseConfirmModalResult {
  const [modalState, dispatch] = useReducer(confirmModalReducer, initialState);

  return { ...modalState, dispatch };
}
