import { combineReducers } from "redux";
import { bookmarksReducer } from "./bookmarksReducer";
import { sessionReducer } from "./sessionReducer";
import { themesReducer } from "./themesReducer";

export const rootReducer = combineReducers({
  bookmarks: bookmarksReducer,
  session: sessionReducer,
  themes: themesReducer
});
