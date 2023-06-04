import { withAuth } from "../../src/common/auth/with-auth";
import { getLists, useGetListsQuery } from "../../src/features/api";
import { wrapper } from "../../src/features/store";
import { getQuery } from "../../src/common/utils/get-query";
import { QueryPage } from "../../src/common/types";
import { PAGINATION_TAKE } from "../../src/common/constants";
import { prepareQueryPage } from "../../src/common/utils/prepare-query-page";
import { HistoryListing } from "../../src/components/history-listing/history-listing.component";
import { usePagination } from "../../src/hooks/usePagination";
import { getPaginationRedirect } from "../../src/common/utils/get-pagination-redirect";

interface HistoryProps {
  take: number;
  page: number;
}

export default function History({ take, page }: HistoryProps) {
  const { shoppingLists, total } = useGetListsQuery(
    { take, page },
    {
      selectFromResult(result) {
        return {
          shoppingLists: result.data?.data,
          total: result.data?.pagination.total || 0,
          ...result,
        };
      },
    }
  );
  const pagination = usePagination({
    page,
    take,
    total,
    leftDirection: 3,
  });

  if (!shoppingLists) {
    return null;
  }

  return (
    <HistoryListing shoppingLists={shoppingLists} pagination={pagination} />
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  withAuth(async ({ store, context }) => {
    const { page } = getQuery(
      ({ page = [] }: QueryPage) => ({ page: parseInt(page[0], 10) }),
      context
    );

    const props = { take: PAGINATION_TAKE, page: prepareQueryPage(page) };
    try {
      const { pagination } = await store
        .dispatch(getLists.initiate(props))
        .unwrap();

      const redirect = getPaginationRedirect(pagination, page, "/history");

      return { redirect, props };
    } catch {
      return { props };
    }
  })
);
