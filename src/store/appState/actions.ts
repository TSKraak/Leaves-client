import { DEFAULT_MESSAGE_TIMEOUT } from "../../config/constants";
import { AppThunk } from "../types";
import { AppStateActionTypes } from "./types";

export const APP_LOADING = "APP_LOADING";
export const APP_DONE_LOADING = "APP_DONE_LOADING";
export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export const appLoading = (): AppStateActionTypes => ({ type: APP_LOADING });
export const appDoneLoading = (): AppStateActionTypes => ({
  type: APP_DONE_LOADING,
});
export const clearMessage = (): AppStateActionTypes => ({
  type: CLEAR_MESSAGE,
});

export const setMessage = (
  variant: string,
  dismissable: boolean,
  text: string
): AppStateActionTypes => {
  return {
    type: SET_MESSAGE,
    payload: {
      variant,
      dismissable,
      text,
    },
  };
};

export const showMessageWithTimeout = (
  variant: string,
  dismissable: boolean,
  text: string,
  timeOutMilliSeconds: number | void
): AppThunk => {
  return (dispatch) => {
    dispatch(setMessage(variant, dismissable, text));

    const timeout = timeOutMilliSeconds || DEFAULT_MESSAGE_TIMEOUT;

    setTimeout(() => dispatch(clearMessage()), timeout);
  };
};
