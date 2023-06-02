import { getProducts } from "../src/features/api";
import { wrapper } from "../src/features/store";
import { Categories } from "../src/components/categories/categories.component";
import { PrivatePage } from "../src/components/private-page/private-page.component";
import { withAuth } from "../src/common/auth/with-auth";
import { Header } from "../src/components/header/header.component";
import { getQuery } from "../src/common/utils/get-query";
import { PAGINATION_TAKE } from "../src/common/constants";
import { prepareQueryPage } from "../src/common/utils/prepare-query-page";
import { getPaginationRedirect } from "../src/common/utils/get-pagination-redirect";

interface HomePageProps {
  page: number;
  take: number;
}

export default function Home({ page, take }: HomePageProps) {
  return (
    <PrivatePage>
      <Header />
      <Categories page={page} take={take} />
    </PrivatePage>
  );
}

type Query = { page: string[] };
export const getServerSideProps = wrapper.getServerSideProps(
  withAuth(async ({ store, context }) => {
    const query = getQuery(
      ({ page = [] }: Query) => ({
        page: parseInt(page[0]),
      }),
      context
    );
    const props: { take: number; page: number } = {
      take: PAGINATION_TAKE / 2,
      page: prepareQueryPage(query.page),
    };

    try {
      const { pagination } = await store
        .dispatch(getProducts.initiate(props))
        .unwrap();

      const redirect = getPaginationRedirect(pagination, query.page);

      return {
        redirect,
        props,
      };
    } catch (e) {
      return {
        props,
      };
    }
  })
);
