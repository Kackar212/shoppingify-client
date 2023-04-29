import {
  BaseQueryApi,
  BaseQueryFn,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { Category } from "../common/interfaces/category.interface";
import { Product } from "../common/interfaces/product.interface";
import { Context, HYDRATE } from "next-redux-wrapper";
import { ApiResponse } from "../common/interfaces/api-response.interface";
import { ApiPagination } from "../common/interfaces/api-pagination.interface";
import { User } from "../common/interfaces/user.interface";
import { RegisterBody } from "../common/interfaces/register-body.interface";
import { LoginBody } from "../common/interfaces/login-body.interface";
import { ResetPasswordBody } from "../common/interfaces/reset-password-body.interface";
import { CreateProductBody } from "../common/interfaces/create-product-body.interface";
import { SearchProductBody } from "../common/interfaces/search-product-body.interface";
import { ShoppingList } from "../common/interfaces/shopping-list.interface";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { UpdateListStatusBody } from "../common/interfaces/update-list-status-body.interface";
import { DeleteProductBody } from "../common/interfaces/delete-product-body.interface";
import { signin, signout } from "./slices/auth.slice";
import { UpdateListProductBody } from "../common/interfaces/update-list-product-body.interface";
import { addProduct, decreaseTotalItems } from "./slices/shopping-list.slice";
import type { IncomingMessage } from "http";

const API_REDUCER_PATH = "api";
const REDIRECT_URL = new URL(
  "account-activated",
  process.env.NEXT_PUBLIC_APP_URL
);
const AUTH = { credentials: "include" } as const;

type PrepareHeaders = (
  headers: Headers,
  api: BaseQueryApi & {
    extra: Context;
  }
) => MaybePromise<Headers>;

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});

const baseQueryWithAuthOnServer =
  (
    prepareHeaders?: PrepareHeaders
  ): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =>
  async (args, api, extraOptions) => {
    const isConfigObject = typeof args !== "string";
    const isObject = (value: unknown): value is Record<string, string> => {
      return (
        typeof value === "object" &&
        value !== null &&
        Reflect.getPrototypeOf(value) === Object.prototype
      );
    };

    if (isConfigObject && !args.headers) {
      args.headers = {};
    }

    if (isConfigObject && isObject(args.headers) && prepareHeaders) {
      args.headers = await prepareHeaders(
        new Headers(args.headers),
        api as BaseQueryApi & { extra: Context }
      );
    }

    const result = await baseQuery(args, api, extraOptions);

    if (!result.error) {
      return result;
    }

    const isUnauthorized = result.error.status === 401;
    if (!isUnauthorized) {
      return result;
    }

    const refreshResult = await baseQuery(
      { url: "auth/refresh", method: "POST", credentials: "include" },
      api,
      extraOptions
    );

    if (refreshResult.error) {
      api.dispatch(signout());

      return result;
    }

    const { data: user } = refreshResult.data as ApiResponse<User>;
    api.dispatch(signin(user));

    return await baseQuery(args, api, extraOptions);
  };

const createTag = <TagType>(type: TagType, id: string | number = "LIST") => {
  return { type, id };
};

export const api = createApi({
  reducerPath: API_REDUCER_PATH,
  baseQuery: baseQueryWithAuthOnServer(
    (headers, { extra: ctx }): MaybePromise<Headers> => {
      if (typeof window !== "undefined") {
        return headers;
      }

      const isObject = (value: unknown): value is Object =>
        typeof value === "object" && value !== null;

      if (!isObject(ctx)) {
        return headers;
      }

      function appendHeaders(req: IncomingMessage) {
        const cookies = Reflect.get(req, "cookies");
        if (!cookies) {
          return headers;
        }

        const { AccessToken, RefreshToken } = cookies;

        headers.set(
          "cookie",
          `AccessToken=${AccessToken};RefreshToken=${RefreshToken}`
        );

        return headers;
      }

      if ("req" in ctx && isObject(ctx.req)) {
        appendHeaders(ctx.req);
      }

      if ("ctx" in ctx && ctx.ctx.req) {
        appendHeaders(ctx.ctx.req);
      }

      return headers;
    }
  ),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["shoppingList", "products"],
  endpoints: (builder) => ({
    getProducts: builder.query<ApiResponse<Category[], ApiPagination>, void>({
      query: () => "/products",
      providesTags: (result) => {
        if (!result) {
          return [createTag("products")];
        }

        return [
          ...result.data.flatMap(({ products }) =>
            products.map(({ id }) => createTag("products" as const, id))
          ),
          createTag("products"),
        ];
      },
    }),
    getProduct: builder.query<ApiResponse<Product<Category>>, number>({
      query(id: number) {
        return `products/${id}`;
      },
      providesTags: (_result, _error, id) => [{ type: "products", id }],
    }),
    createProduct: builder.mutation<
      ApiResponse<Product<Category>>,
      CreateProductBody
    >({
      query(productData) {
        return {
          method: "POST",
          url: "/products",
          body: productData,
          ...AUTH,
        };
      },
      invalidatesTags: [createTag("products")],
    }),
    searchProducts: builder.query<
      ApiResponse<Product<Category>[]>,
      SearchProductBody
    >({
      query({ name }) {
        return {
          url: `products/search/${name}`,
        };
      },
      providesTags: (result) => {
        if (!result) {
          return [createTag("products")];
        }

        return [
          ...result.data.flatMap(({ id }) =>
            createTag("products" as const, id)
          ),
          createTag("products"),
        ];
      },
    }),
    searchCategories: builder.query<ApiResponse<Category[]>, string>({
      query(name) {
        return {
          url: `categories/search/${name}`,
        };
      },
    }),
    register: builder.mutation<ApiResponse<User>, RegisterBody>({
      query(userData) {
        return {
          method: "POST",
          url: "auth/register",
          body: {
            redirect: REDIRECT_URL,
            ...userData,
          },
          ...AUTH,
        };
      },
    }),
    login: builder.mutation<ApiResponse<User>, LoginBody>({
      query(userLoginData) {
        return {
          method: "POST",
          url: "auth/login",
          body: userLoginData,
          ...AUTH,
        };
      },
    }),
    refreshToken: builder.mutation<ApiResponse<User>, void>({
      query() {
        return {
          method: "POST",
          url: "auth/refresh",
          ...AUTH,
        };
      },
    }),
    resendActivationMail: builder.mutation<ApiResponse<{}>, void>({
      query() {
        return {
          method: "POST",
          url: "auth/resend-activation-mail",
          body: {
            redirect: REDIRECT_URL,
          },
          ...AUTH,
        };
      },
    }),
    resetPassword: builder.mutation<ApiResponse<{}>, ResetPasswordBody>({
      query(resetPasswordBody) {
        return {
          method: "POST",
          url: "auth/reset-password",
          body: resetPasswordBody,
          ...AUTH,
        };
      },
    }),
    getActiveList: builder.query<ApiResponse<ShoppingList>, void>({
      query() {
        return {
          url: "/shopping-list/active",
          ...AUTH,
        };
      },
      providesTags: ["shoppingList"],
    }),
    addProductToList: builder.mutation<
      ApiResponse<ShoppingList>,
      number | number[]
    >({
      query(ids) {
        if (typeof ids === "number") {
          ids = [ids];
        }

        const body = {
          products: ids.map((id) => ({ product: { id } })),
        };

        return {
          method: "POST",
          url: "/shopping-list",
          body,
          ...AUTH,
        };
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addProduct());

          dispatch(
            api.util.updateQueryData("getActiveList", undefined, (draft) => {
              Object.assign(draft, data);
            })
          );
        } catch {}
      },
    }),
    deleteProductFromList: builder.mutation<
      ApiResponse<ShoppingList>,
      DeleteProductBody
    >({
      query({ shoppingList, id }) {
        return {
          method: "DELETE",
          url: "/shopping-list",
          body: {
            shoppingList,
            product: {
              id,
            },
          },
          ...AUTH,
        };
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(decreaseTotalItems());

          dispatch(
            api.util.updateQueryData("getActiveList", undefined, (draft) => {
              draft.data.products = draft.data.products.map((product) => {
                if (product.id === _arg.id) {
                  product.isDeleted = true;
                }

                return product;
              });
            })
          );
        } catch {}
      },
    }),
    updateListStatus: builder.mutation<
      ApiResponse<ShoppingList>,
      UpdateListStatusBody
    >({
      query({ status, id }) {
        return {
          method: "PATCH",
          url: "shopping-list/status",
          body: { status, id },
          ...AUTH,
        };
      },
      invalidatesTags: ["shoppingList"],
    }),
    saveList: builder.mutation<ApiResponse<ShoppingList>, string>({
      query(name) {
        return {
          method: "PATCH",
          url: "shopping-list/save",
          body: {
            name,
          },
          ...AUTH,
        };
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getActiveList", undefined, (draft) => {
              Object.assign(draft, data);
            })
          );
        } catch {}
      },
    }),
    updateListProduct: builder.mutation<
      ApiResponse<ShoppingList>,
      UpdateListProductBody
    >({
      query(updateListProductBody) {
        return {
          method: "PATCH",
          url: "/shopping-list",
          body: updateListProductBody,
          ...AUTH,
        };
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getActiveList", undefined, (draft) => {
              Object.assign(draft, data);
            })
          );
        } catch {}
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useSearchProductsQuery,
  useSearchCategoriesQuery,
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useResendActivationMailMutation,
  useResetPasswordMutation,
  useGetActiveListQuery,
  useAddProductToListMutation,
  useDeleteProductFromListMutation,
  useUpdateListStatusMutation,
  useSaveListMutation,
  useUpdateListProductMutation,
} = api;

export const {
  getProducts,
  getProduct,
  createProduct,
  searchProducts,
  searchCategories,
  register,
  login,
  refreshToken,
  resendActivationMail,
  resetPassword,
  getActiveList,
  addProductToList,
  deleteProductFromList,
  updateListStatus,
  saveList,
  updateListProduct,
} = api.endpoints;
