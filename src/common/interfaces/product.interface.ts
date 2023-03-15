export interface Product<Category> {
  id: number;
  name: string;
  note: string | null;
  image: string | null;
  category: Omit<Category, "products">;
}
