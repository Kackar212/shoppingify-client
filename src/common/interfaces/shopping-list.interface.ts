import { ShoppingListProduct } from "./shopping-list-product.interface";
import { ListStatus } from "../types";
import { ShoppingListUser } from "./shopping-list-user.interface";

export interface ShoppingList {
  id: number;
  name?: string;
  status: ListStatus;
  createdAt: string;
  updatedAt: string;
  products: ShoppingListProduct[];
  authorizedUsers: Array<ShoppingListUser>;
}
