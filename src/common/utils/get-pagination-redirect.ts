import { ApiPagination } from "../interfaces/api-pagination.interface";
import { getPage } from "./get-page";

export function getPaginationRedirect(
  pagination: ApiPagination,
  page: number,
  destination: string = ""
) {
  const redirectDestinationPage: number = getPage(pagination, page);

  if (!page || redirectDestinationPage === page) {
    return;
  }

  return {
    destination: `${destination}/${redirectDestinationPage}`,
    permanent: false,
  };
}
