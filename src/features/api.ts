import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category } from "../common/interfaces/category.interface";
import { Product } from "../common/interfaces/product.interface";
import { HYDRATE } from "next-redux-wrapper";
import { ApiResponse } from "../common/interfaces/api-response.interface";
import { ApiPagination } from "../common/interfaces/api-pagination.interface";
import { User } from "../common/interfaces/user.interface";
import { RegisterBody } from "../common/interfaces/register-body.interface";
import { LoginBody } from "../common/interfaces/login-body.interface";
import { ResetPasswordBody } from "../common/interfaces/reset-password-body.interface";
import { CreateProductBody } from "../common/interfaces/create-product-body.interface";
import { SearchProductBody } from "../common/interfaces/search-product-body.interface";
import { ShoppingList } from "../common/interfaces/shopping-list.interface";

const API_REDUCER_PATH = "api";
const REDIRECT_URL = new URL(
  "account-activated",
  process.env.NEXT_PUBLIC_APP_URL
);
const AUTH = { credentials: "include" } as const;

export const api = createApi({
  reducerPath: API_REDUCER_PATH,
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getProducts: builder.query<ApiResponse<Category[], ApiPagination>, void>({
      query: () => "/products",
    }),
    getProduct: builder.query<ApiResponse<Product<Category>>, number>({
      query(id: number) {
        return `products/${id}`;
      },
    }),
    createProduct: builder.query<
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
    }),
    deleteProductFromList: builder.mutation({
      query({ shoppingList, id }) {
        return {
          method: "POST",
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
    }),
    updateListStatus: builder.mutation({
      query() {
        return {
          method: "PATCH",
          url: "shopping-list/status",
          ...AUTH,
        };
      },
    }),
    saveList: builder.mutation<ApiResponse<ShoppingList>, number>({
      query(shoppingListId) {
        return {
          method: "PATCH",
          url: "shopping-list/save",
          body: {
            id: shoppingListId,
            status: "saved",
          },
          ...AUTH,
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useResendActivationMailMutation,
  useResetPasswordMutation,
} = api;

export const {
  getProducts,
  getProduct,
  register,
  login,
  refreshToken,
  resendActivationMail,
  resetPassword,
  addProductToList,
  deleteProductFromList,
  updateListStatus,
  saveList,
} = api.endpoints;
