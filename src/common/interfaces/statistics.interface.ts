export interface Statistics {
  itemsByMonth: Array<{ month: string; items: number }>;
  popularItems: Array<{ name: string; value: number }>;
  popularCategories: Array<{ name: string; value: number }>;
}
