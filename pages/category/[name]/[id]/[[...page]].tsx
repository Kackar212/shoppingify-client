import { useRouter } from "next/router";
import {
  getProductsByCategory,
  useGetProductsByCategoryQuery,
} from "../../../../src/features/api";
import { wrapper } from "../../../../src/features/store";
import { withAuth } from "../../../../src/common/auth/with-auth";
import { PAGINATION_TAKE } from "../../../../src/common/constants";
import { PaginationQuery } from "../../../../src/common/interfaces/pagination-query.interface";
import { PrivatePage } from "../../../../src/components/private-page/private-page.component";
import { usePagination } from "../../../../src/hooks/usePagination";
import { getQuery } from "../../../../src/common/utils/get-query";
import { Category } from "../../../../src/components/category/category.component";
import { prepareQueryPage } from "../../../../src/common/utils/prepare-query-page";
import { getPaginationRedirect } from "../../../../src/common/utils/get-pagination-redirect";

interface CategoryPageProps extends PaginationQuery {
  id: number;
}

export default function CategoryPage({ id, page, take }: CategoryPageProps) {
  const router = useRouter();
  const {
    pagination: { total },
    products,
    category,
    error,
  } = useGetProductsByCategoryQuery(
    {
      id,
      page,
      take,
    },
    {
      selectFromResult(result) {
        return {
          products: result.data?.data.products!,
          category: result.data?.data.category!,
          pagination: result.data?.pagination!,
          ...result,
        };
      },
    }
  );

  const pagination = usePagination({
    page,
    total,
    take,
    leftDirection: 3,
  });

  if (error) {
    router.replace("/404");

    return null;
  }

  if (!products) {
    return <p>Sorry, we couldn&apos;t load products! Try again later</p>;
  }

  return (
    <PrivatePage>
      <Category
        pagination={pagination}
        category={category}
        products={products}
      />
    </PrivatePage>
  );
}

type Query = { page: string[]; id: string; name: string };

export const getServerSideProps = wrapper.getServerSideProps(
  withAuth(async ({ store, context }) => {
    const query = getQuery(
      ({ page = [], id, name }: Query) => ({
        page: parseInt(page[0]),
        id: parseInt(id, 10),
        name,
      }),
      context
    );
    const page = prepareQueryPage(query.page);

    try {
      const { pagination } = await store
        .dispatch(
          getProductsByCategory.initiate({
            id: query.id,
            page,
            take: PAGINATION_TAKE,
          })
        )
        .unwrap();

      const redirect = getPaginationRedirect(
        pagination,
        query.page,
        `/category/${query.name}/${query.id}`
      );

      return {
        redirect,
        props: {
          id: query.id,
          page,
          take: PAGINATION_TAKE,
        },
      };
    } catch (e) {
      return {
        notFound: true,
      };
    }
  })
);
