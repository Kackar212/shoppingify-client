import { Category } from "./category.interface";
import { Product } from "./product.interface";

export interface ProductWithQuantity extends Product<Category> {
  quantity?: number;
}
