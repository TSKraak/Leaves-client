export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

export interface UserState {
  user: {
    token: string;
    name: string;
    email: string;
  };
}

export interface User {
  token: string;
  name: string;
  email: string;
}

interface LoginAction {
  type: typeof LOGIN_SUCCESS;
  payload: { token: string };
}

interface LogoutAction {
  type: typeof LOG_OUT;
}

interface TokenValidAction {
  type: typeof TOKEN_STILL_VALID;
  payload: {};
}

export type UserActionTypes = LoginAction | LogoutAction | TokenValidAction;
