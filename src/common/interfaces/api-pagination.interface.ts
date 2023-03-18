export interface ApiPagination {
  links: {
    last: string;
    first: string;
    current: string;
    next: string;
    previous: string;
  };
  page: {
    last: number;
    first: number;
    current: number;
    next: number;
    previous: number;
  };
  take: number;
  total: number;
}
