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
export type HTMLInputTypeAttribute =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week"
  | "textarea";
