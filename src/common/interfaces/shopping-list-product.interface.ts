import { Category } from "./category.interface";
import { Product } from "./product.interface";
import { ShoppingList } from "./shopping-list.interface";

export interface ShoppingListProduct {
  id: number;
  quantity: number;
  product: Product<Category>;
}
