import { api, getProducts } from "../src/features/api";
import { wrapper } from "../src/features/store";
import { Categories } from "../src/components/categories/categories.component";
import { PrivatePage } from "../src/components/private-page/private-page.component";

export default function Home() {
  return (
    <PrivatePage>
      <Categories />
    </PrivatePage>
  );
}

Home.getInitialProps = wrapper.getInitialPageProps((store) => async () => {
  store.dispatch(getProducts.initiate());

  await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()));

  return {};
});
