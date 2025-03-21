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
  PASSWORD_RESETED: "Your password has been reset!",
  PRODUCT_CREATED: "New product has been created!",
  MAIL_RESENT: "Activation mail has been resent!",
  FORGOT_PASSWORD: "Check your email address and follow the link!",
};

export const VALIDATION_MODE_ALL = "all";

export const LIST_STATUS = {
  COMPLETED: "completed",
  CANCELED: "canceled",
  ACTIVE: "active",
} as const;

export const LOGIN_ROUTE = "/auth/login";
export const PAGINATION_TAKE = 50;

export const CANCELED_BADGE_COLOR = "#eb5757";
export const COMPLETED_BADGE_COLOR = "#56ccf2";
