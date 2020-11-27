export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS";

export interface UserState {
  token?: string;
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  city?: string;
  country?: string;
  imageUrl?: string;
  accountBlocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  token?: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: string;
  imageUrl: string;
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
  imageUrl: string;
  accountBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUser {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  city: string | undefined;
  country: string | undefined;
  imageUrl: string | undefined;
}

export interface UpdateUserPassword {
  password: string | undefined;
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
  type: typeof UPDATE_SUCCESS;
  payload: Partial<UpdateUser>;
}

interface UpdateUserPasswordAction {
  type: typeof UPDATE_PASSWORD_SUCCESS;
  payload: UpdateUserPassword;
}

export type UserActionTypes =
  | LoginAction
  | LogoutAction
  | TokenValidAction
  | UpdateUserAction
  | UpdateUserPasswordAction;
