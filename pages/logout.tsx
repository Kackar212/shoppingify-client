import { deleteCookie } from "cookies-next";
import { signout } from "../src/features/slices/auth.slice";
import { wrapper } from "../src/features/store";
import Login from "./auth/login";

export default Login;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      deleteCookie("AccessToken", { req, res });
      deleteCookie("RefreshToken", { req, res });
      deleteCookie("user", { req, res });

      store.dispatch(signout());

      return {
        props: {},
      };
    }
);
