import { UserActionTypes, UserState } from "./types";
import { LOGIN_SUCCESS, LOG_OUT, TOKEN_STILL_VALID } from "./types";

const initialState: UserState = {
  token: localStorage.getItem("token"),
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  city: null,
  country: null,
  accountBlocked: null,
  createdAt: null,
  updatedAt: null,
};

// eslint-disable-next-line
export default (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      // @ts-ignore
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
