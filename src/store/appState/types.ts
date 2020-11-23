import {
  APP_DONE_LOADING,
  APP_LOADING,
  CLEAR_MESSAGE,
  SET_MESSAGE,
} from "./actions";

export interface AppState {
  appState: {
    message: string | null;
    loading: boolean;
  };
}

interface AppLoadingAction {
  type: typeof APP_LOADING;
  payload: { loading: boolean };
}

interface AppDoneLoadingAction {
  type: typeof APP_DONE_LOADING;
  payload: { loading: boolean };
}

interface SetMessageAction {
  type: typeof SET_MESSAGE;
  payload: { message: string };
}

interface ClearMessageAction {
  type: typeof CLEAR_MESSAGE;
  payload: { message: null };
}

export type AppStateActionTypes =
  | AppLoadingAction
  | AppDoneLoadingAction
  | SetMessageAction
  | ClearMessageAction;
