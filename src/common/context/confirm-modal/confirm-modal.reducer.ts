import { Reducer } from "react";

export enum Action {
  Open = "open",
  Close = "close",
  Confirm = "confirm",
  Cancel = "cancel",
}

export interface ConfirmModalState {
  isOpen: boolean;
  status?: Action.Cancel | Action.Confirm;
}

export interface ConfirmModalAction {
  type: Action;
}

export const confirmModalReducer: Reducer<
  ConfirmModalState,
  ConfirmModalAction
> = (state, { type }) => {
  switch (type) {
    case Action.Open: {
      return { ...state, isOpen: true };
    }
    case Action.Close: {
      return { ...state, isOpen: false };
    }
    case Action.Confirm:
    case Action.Cancel: {
      return { status: type, isOpen: false };
    }
    default: {
      return state;
    }
  }
};
