import { ApiPagination } from "../interfaces/api-pagination.interface";

export function getPage(pagination: ApiPagination, page: number) {
  if (pagination.page.last < page) {
    return pagination.page.last;
  }

  if (pagination.page.first > page) {
    return pagination.page.first;
  }

  return page;
}
