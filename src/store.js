import { createStore, combineReducers, applyMiddleware } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  state: reducer
});

const middlewares = applyMiddleware(thunk);

export const store = createStore(rootReducer, middlewares);
