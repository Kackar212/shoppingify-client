import { PaginationQuery } from "./pagination-query.interface";

export interface GetListQuery extends PaginationQuery {
  id: number;
}
