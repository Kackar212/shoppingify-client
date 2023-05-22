export const API_ERROR = {
  WRONG_CREDENTIALS: "Provided email or password are incorrect!",
  USER_ALREADY_EXISTS: "User with this name or email already exists!",
  PASSWORD_ALREADY_RESETED: "You already reseted your password!",
  TIMEOUT: "Request has taken too long!",
  GENERIC: "Something went wrong! Try again later!",
} as const;

export const API_SUCCESS = {
  LOGGED_IN: "You have logged in!",
  ACCOUNT_CREATED: "Your account has been created! Check your e-mail!",
  PASSWORD_RESETED: "New password was sent to your email!",
};

export const VALIDATION_MODE_ALL = "all";

export const LIST_STATUS = {
  COMPLETED: "completed",
  CANCELED: "canceled",
} as const;

export const LOGIN_ROUTE = "/auth/login";
export const PAGINATION_TAKE = 50;
