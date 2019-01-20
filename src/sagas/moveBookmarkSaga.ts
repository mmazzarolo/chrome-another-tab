import { ActionType } from "typesafe-actions";
import { put } from "redux-saga/effects";
import { moveBookmark } from "./../services/chromeService";
import { actions } from "../actions/index";

// When the user sorts a bookmark item trough drag and drop we also update it
// in the Chrome bookmarks
export const moveBookmarkSaga = function*(
  action: ActionType<typeof actions.moveBookmark>
) {
  const { bookmark, oldIndex, newIndex } = action.payload;
  yield moveBookmark(bookmark, oldIndex, newIndex);
  yield put(actions.moveBookmarkSuccess());
};
