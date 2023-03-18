import { ApiPagination } from "./api-pagination.interface";

export interface ApiResponse<
  Data,
  Pagination extends ApiPagination | undefined = undefined
> {
  data: Data;
  status: number;
  message: string;
  pagination: Pagination;
}
