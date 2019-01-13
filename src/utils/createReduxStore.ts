import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "../reducers";
import { rootSaga } from "../sagas";
import { NODE_ENV } from "../config/constants";

const loggerMiddleware = createLogger({
  collapsed: true,
  duration: true
});

const sagaMiddleware = createSagaMiddleware();

export const createReduxStore = (initialState?: {}) => {
  const middlewares = [];
  if (NODE_ENV === "development") {
    middlewares.push(loggerMiddleware);
  }
  middlewares.push(sagaMiddleware);
  const enhancer = compose(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, initialState!, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
};
