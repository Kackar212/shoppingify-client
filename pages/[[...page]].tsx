import { api, getProducts } from "../src/features/api";
import { wrapper } from "../src/features/store";
import { Categories } from "../src/components/categories/categories.component";
import { PrivatePage } from "../src/components/private-page/private-page.component";
import { withAuth } from "../src/common/auth/with-auth";
import { Header } from "../src/components/header/header.component";

export default function Home() {
  return (
    <PrivatePage>
      <Header />
      <Categories />
    </PrivatePage>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  withAuth(async ({ store }) => {
    store.dispatch(getProducts.initiate());

    await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()));

    return {
      props: {},
    };
  })
);
