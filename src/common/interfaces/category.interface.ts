import { Product } from "./product.interface";

export interface Category {
  id: number;
  name: string;
  products: Product<Category>[];
}
