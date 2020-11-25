import {
  APP_LOADING,
  APP_DONE_LOADING,
  SET_MESSAGE,
  CLEAR_MESSAGE,
} from "./actions";
import { AppState, AppStateActionTypes } from "./types";

const initialState: AppState = {
  loading: false,
  message: {
    variant: undefined,
    dismissable: undefined,
    text: undefined,
  },
};

// eslint-disable-next-line
export default (state = initialState, action: AppStateActionTypes) => {
  switch (action.type) {
    case APP_LOADING:
      return { ...state, loading: true };

    case APP_DONE_LOADING:
      return { ...state, loading: false };

    case SET_MESSAGE:
      return { ...state, message: action.payload };

    case CLEAR_MESSAGE:
      return {
        ...state,
        message: initialState.message,
      };

    default:
      return state;
  }
};
