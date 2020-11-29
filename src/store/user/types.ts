export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS";
export const DELETE_FAVORITE_USER = "DELETE_FAVORITE_USER";
export const ADD_FAVORITE_USER = "ADD_FAVORITE_USER";

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
  following: FollowingUserObject[];
}

export interface FollowingUserObject {
  id: number;
  followingUsers: {};
}

export interface User {
  token?: string;
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  city?: string;
  country?: string;
  imageUrl?: string;
  accountBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  following: FollowingUserObject[];
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
  following: FollowingUserObject[];
}

export interface UpdateUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  city?: string;
  country?: string;
  imageUrl?: string;
}

export interface UpdateUserPassword {
  password?: string;
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

interface DeleteFavoriteUserAction {
  type: typeof DELETE_FAVORITE_USER;
  payload: FollowingUserObject[];
}

interface AddFavoriteUserAction {
  type: typeof ADD_FAVORITE_USER;
  payload: FollowingUserObject;
}

export type UserActionTypes =
  | LoginAction
  | LogoutAction
  | TokenValidAction
  | UpdateUserAction
  | UpdateUserPasswordAction
  | DeleteFavoriteUserAction
  | AddFavoriteUserAction;
