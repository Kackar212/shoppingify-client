import { createAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getActiveList } from "../api";
import { HYDRATE } from "next-redux-wrapper";

interface ShoppingListState {
  isOpen: boolean;
  totalItems: number;
  hasProducts: boolean;
}

const initialState: ShoppingListState = {
  isOpen: false,
  totalItems: 0,
  hasProducts: false,
};

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    toggle(state) {
      return { ...state, isOpen: !state.isOpen };
    },
    addProduct(state) {
      return {
        ...state,
        isOpen: true,
        totalItems: state.totalItems + 1,
        hasProducts: true,
      };
    },
    increaseTotalItems(state) {
      return { ...state, totalItems: state.totalItems + 1, hasProducts: true };
    },
    decreaseTotalItems(state) {
      const totalItems = state.totalItems - 1;

      return { ...state, totalItems, hasProducts: !!totalItems };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        createAction<RootState>(HYDRATE),
        (state, { payload: { shoppingList } }) => {
          return { ...state, ...shoppingList };
        }
      )
      .addMatcher(
        getActiveList.matchFulfilled,
        (state, { payload: { data: shoppingList } }) => {
          state.totalItems = shoppingList.products.length;
          state.hasProducts = !!state.totalItems;
        }
      );
  },
});

export const { toggle, addProduct, increaseTotalItems, decreaseTotalItems } =
  shoppingListSlice.actions;
export const selectShoppingList = (state: RootState) => state.shoppingList;
export default shoppingListSlice.reducer;
