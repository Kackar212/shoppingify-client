import { ShoppingListProduct } from "./shopping-list-product.interface";
import { ListStatus } from "../types";

export interface ShoppingList {
  id: number;
  name?: string;
  status: ListStatus;
  createdAt: string;
  updatedAt: string;
  products: ShoppingListProduct[];
}
