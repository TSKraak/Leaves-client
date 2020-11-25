import {
  APP_DONE_LOADING,
  APP_LOADING,
  CLEAR_MESSAGE,
  SET_MESSAGE,
} from "./actions";

export interface MessageState {
  variant: string | undefined;
  dismissable: boolean | undefined;
  text: string | undefined;
}

export interface AppState {
  message: MessageState;
  loading: boolean;
}

interface AppLoadingAction {
  type: typeof APP_LOADING;
}

interface AppDoneLoadingAction {
  type: typeof APP_DONE_LOADING;
}

interface SetMessageAction {
  type: typeof SET_MESSAGE;
  payload: MessageState;
}

interface ClearMessageAction {
  type: typeof CLEAR_MESSAGE;
}

export type AppStateActionTypes =
  | AppLoadingAction
  | AppDoneLoadingAction
  | SetMessageAction
  | ClearMessageAction;
