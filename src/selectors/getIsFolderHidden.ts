import { ReduxState } from "../types/ReduxState";

export const getIsFolderHidden = (state: ReduxState, folderId: string) => {
  const { hiddenFolderIds } = state.bookmarks;
  const isFolderHidden = hiddenFolderIds.includes(folderId);
  return isFolderHidden;
};
