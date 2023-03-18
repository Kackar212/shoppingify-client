import { Category } from "./category.interface";

export interface CreateProductBody {
  name: string;
  category: Omit<Category, "products">;
  note?: string;
  image?: string;
}
