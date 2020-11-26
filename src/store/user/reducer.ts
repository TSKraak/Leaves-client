import { UPDATE_SUCCESS, UserActionTypes, UserState } from "./types";
import {
  LOGIN_SUCCESS,
  LOG_OUT,
  TOKEN_STILL_VALID,
  UPDATE_PASSWORD_SUCCESS,
} from "./types";

const initialState: UserState = {
  // @ts-ignore
  token: localStorage.getItem("token"),
  id: undefined,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  city: undefined,
  country: undefined,
  imageUrl: undefined,
  accountBlocked: undefined,
  createdAt: undefined,
  updatedAt: undefined,
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
      return { ...initialState, token: undefined };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case UPDATE_SUCCESS:
      return { ...state, ...action.payload };

    case UPDATE_PASSWORD_SUCCESS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
