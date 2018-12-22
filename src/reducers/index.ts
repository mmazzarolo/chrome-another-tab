import { combineReducers } from "redux";
import { bookmarksReducer } from "./bookmarksReducer";
import { sessionReducer } from "./sessionReducer";
import { settingsReducer } from "./settingsReducer";

export const rootReducer = combineReducers({
  bookmarks: bookmarksReducer,
  session: sessionReducer,
  settings: settingsReducer
});
