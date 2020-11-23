import { combineReducers } from "redux";
import user from "./user/reducer";

const reducer = combineReducers({
  user,
  // etc.
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
