import { select } from "redux-saga/effects";
import { ReduxState } from "./../types/ReduxState";
import { ReduxPersistedState } from "./../types/ReduxPersistedState";

export const persistSaga = function*() {
  const reduxState: ReduxState = yield select();
  const reduxStateToPersist: ReduxPersistedState = {
    settings: reduxState.settings
  };
  localStorage.setItem("REDUX_STATE", JSON.stringify(reduxStateToPersist));
};
