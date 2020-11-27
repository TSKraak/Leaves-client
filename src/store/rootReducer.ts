import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import plants from "./plants/reducer";

const reducer = combineReducers({
  appState,
  user,
  plants,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
