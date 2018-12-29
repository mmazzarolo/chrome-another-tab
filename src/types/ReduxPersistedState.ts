import { State as BookmarksState } from "../reducers/bookmarksReducer";
import { State as SettingsState } from "../reducers/settingsReducer";

export type ReduxPersistedState = {
  bookmarks: BookmarksState;
  settings: SettingsState;
};
