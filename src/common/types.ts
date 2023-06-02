import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import {
  LazyQueryTrigger,
  TypedUseQueryStateResult,
} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ApiResponse } from "./interfaces/api-response.interface";
import { ChangeHandler, RegisterOptions } from "react-hook-form";
import { MultiLineInput } from "./interfaces/multi-line-input.interface";
import { SingleLineInput } from "./interfaces/single-line-input.interface";

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
  | "week";

export type TextFieldProps = (MultiLineInput | SingleLineInput) & {
  options?: RegisterOptions;
  name: string;
  onChange?: ChangeHandler;
};

export type QueryPage = { page: string[] };
