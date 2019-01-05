import { State as BookmarksState } from "../reducers/bookmarksReducer";
import { State as ThemesState } from "../reducers/themesReducer";

export type ReduxPersistedState = {
  bookmarks: BookmarksState;
  themes: ThemesState;
};
