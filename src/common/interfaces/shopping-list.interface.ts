import { ShoppingListProduct } from "./shopping-list-product.interface";

export interface ShoppingList {
  id: number;
  name?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  products: ShoppingListProduct[];
}
