import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import reducer from "./rootReducer";

const devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  : (x: string) => x;
const enhancer = compose(applyMiddleware(ReduxThunk), devTools);
const store = createStore(reducer, enhancer);

export default store;
