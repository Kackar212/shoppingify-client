import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { API_ERROR } from "../common/constants";

export interface ApiError {
  data: {
    code: string;
    message: string;
    statusCode: number;
  };
  status: number;
}

export function useGetErrorMessage(
  error?: FetchBaseQueryError | SerializedError
) {
  if (!error) {
    return;
  }

  function isFetchBaseQueryError(
    error: FetchBaseQueryError | SerializedError
  ): error is FetchBaseQueryError {
    return "error" in error && "status" in error;
  }

  if (isFetchBaseQueryError(error) && typeof error.status === "string") {
    if (error.status === "TIMEOUT_ERROR") {
      return API_ERROR.TIMEOUT;
    }

    return API_ERROR.GENERIC;
  }

  const {
    data: { code, message },
  } = error as ApiError;

  function isApiErrorCode(code: string): code is keyof typeof API_ERROR {
    return Object.prototype.hasOwnProperty.call(API_ERROR, code);
  }

  if (isApiErrorCode(code)) {
    return API_ERROR[code];
  }

  return message;
}
