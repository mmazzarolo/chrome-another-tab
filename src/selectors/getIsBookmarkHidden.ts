import { includes } from "lodash";
import { ReduxState } from "../types/ReduxState";

export const getIsBookmarkHidden = (state: ReduxState, bookmarkId: string) => {
  const { hiddenBookmarkIds } = state.bookmarks;
  return includes(hiddenBookmarkIds, bookmarkId);
};
