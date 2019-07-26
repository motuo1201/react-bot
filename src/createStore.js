import { createStore as reduxCreateStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import { messageReducer } from "./reducers/Message";

export default function createStore() {
  const store = reduxCreateStore(
    combineReducers({
      messages: messageReducer,
    }),
    applyMiddleware(
      logger,
    )
  );

  return store;
}