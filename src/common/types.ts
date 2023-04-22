import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import {
  LazyQueryTrigger,
  TypedUseQueryStateResult,
} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ApiResponse } from "./interfaces/api-response.interface";

export type Query<T> = LazyQueryTrigger<
  QueryDefinition<any, any, any, ApiResponse<T>>
>;
export type QueryState<T> = TypedUseQueryStateResult<ApiResponse<T>, any, any>;
