import { Category } from "./category.interface";
import { Product } from "./product.interface";

export interface ShoppingListProduct {
  id: number;
  quantity: number;
  product: Product<Category>;
  isDeleted?: boolean;
}
