export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const UPDATE_USER = "UPDATE_USER";

export interface UserState {
  token: string | null;
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  city: string | null;
  country: string | null;
  accountBlocked: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface User {
  token: string | null;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: string;
  accountBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserWithoutToken {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: string;
  accountBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

interface LoginAction {
  type: typeof LOGIN_SUCCESS;
  payload: User;
}

interface LogoutAction {
  type: typeof LOG_OUT;
}

interface TokenValidAction {
  type: typeof TOKEN_STILL_VALID;
  payload: UserWithoutToken;
}

interface UpdateUserAction {
  type: typeof UPDATE_USER;
  payload: Partial<User>;
}

export type UserActionTypes =
  | LoginAction
  | LogoutAction
  | TokenValidAction
  | UpdateUserAction;
