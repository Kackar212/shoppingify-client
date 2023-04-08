export const API_ERROR = {
  WRONG_CREDENTIALS: "Provided email or password are incorrect!",
  TIMEOUT: "Request has taken too long!",
  GENERIC: "Something went wrong! Try again later!",
} as const;

export const API_SUCCESS = { LOGGED_IN: "You have logged in!" };

export const VALIDATION_MODE_ALL = "all";
