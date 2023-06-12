import React from "react";
import { withAuth } from "../../../../src/common/auth/with-auth";
import { PAGINATION_TAKE } from "../../../../src/common/constants";
import { GetListQuery } from "../../../../src/common/interfaces/get-list-query.interface";
import { getPaginationRedirect } from "../../../../src/common/utils/get-pagination-redirect";
import { getQuery } from "../../../../src/common/utils/get-query";
import { prepareQueryPage } from "../../../../src/common/utils/prepare-query-page";
import { getList, useGetListQuery } from "../../../../src/features/api";
import { wrapper } from "../../../../src/features/store";
import { usePagination } from "../../../../src/hooks/usePagination";
import { HistoryListDetails } from "../../../../src/components/history-list-details/history-list-details.component";

export default function HistoryItem({ id, page, take }: GetListQuery) {
  const { shoppingList, total } = useGetListQuery(
    {
      id,
      page,
      take,
    },
    {
      selectFromResult(result) {
        return {
          ...result,
          shoppingList: result.data?.data,
          total: result.data?.pagination.total || 0,
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

  if (!shoppingList) {
    return null;
  }

  return (
    <HistoryListDetails shoppingList={shoppingList} pagination={pagination} />
  );
}

type Query = { page: string[]; id: string; name: string };
export const getServerSideProps = wrapper.getServerSideProps(
  withAuth(async ({ store, context }) => {
    const { page, id, name } = getQuery(
      ({ page = [], id, name }: Query) => ({
        page: parseInt(page[0]),
        id: parseInt(id),
        name,
      }),
      context
    );
    const props = { id, page: prepareQueryPage(page), take: PAGINATION_TAKE };

    try {
      const { pagination } = await store
        .dispatch(getList.initiate(props))
        .unwrap();

      const redirect = getPaginationRedirect(
        pagination,
        page,
        `/history/${name}/${id}`
      );

      return {
        redirect,
        props,
      };
    } catch {
      return {
        notFound: true,
      };
    }
  })
);
