import { combineReducers } from "redux";
import { bookmarksReducer } from "./bookmarksReducer";
import { appReducer } from "./appReducer";
import { settingsReducer } from "./settingsReducer";

export const rootReducer = combineReducers({
  app: appReducer,
  bookmarks: bookmarksReducer,
  settings: settingsReducer
});
