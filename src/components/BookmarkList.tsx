import React, { FC, memo, useState, useCallback } from "react";
import styled from "styled-components/macro";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { BookmarkListItem } from "./BookmarkListItem";
import { BookmarkListFolder } from "./BookmarkListFolder";
import { BookmarkTree } from "../types/BookmarkTree";
import { Bookmark } from "../types/Bookmark";
import { Folder } from "../types/Folder";
import { ReduxState } from "../types/ReduxState";
import { getIsFolderHidden } from "../selectors/getIsFolderHidden";
import { useMappedState } from "redux-react-hook";
import { actions } from "../actions";
import { useMappedActions } from "../hooks/useMappedActions";

interface BookmarkListProps {
  bookmarkTree: BookmarkTree;
}

export const BookmarkList: FC<BookmarkListProps> = memo(props => {
  const { bookmarkTree } = props;
  const [isDragging, setIsDragging] = useState(false);
  const mapActions = {
    moveBookmark: actions.moveBookmark
  };
  const { moveBookmark } = useMappedActions(mapActions);
  const handleStartDragging = () => setIsDragging(true);
  const handleStopDragging = (
    parentId: string,
    params: {
      oldIndex: number;
      newIndex: number;
    }
  ) => {
    setIsDragging(false);
    moveBookmark(parentId, params.oldIndex, params.newIndex);
  };
  return (
    <RootList>
      {bookmarkTree.map(folder => {
        return (
          <SortableBookmarkList
            key={folder.id}
            folder={folder}
            axis="xy"
            distance={8}
            updateBeforeSortStart={handleStartDragging}
            onSortEnd={params => handleStopDragging(folder.id, params)}
            isDragging={isDragging}
          />
        );
      })}
    </RootList>
  );
});

const SortableBookmarkList = SortableContainer<{
  folder: Folder;
  isDragging: boolean;
}>(props => {
  const { folder, isDragging } = props;
  const mapState = useCallback(
    (state: ReduxState) => ({
      isHidden: getIsFolderHidden(state, folder.id)
    }),
    [folder.id]
  );
  const { isHidden } = useMappedState(mapState);
  const mapActions = {
    hideFolder: actions.hideFolder,
    showFolder: actions.showFolder
  };
  const { hideFolder, showFolder } = useMappedActions(mapActions);

  const handleOptionClick = () => {
    if (isHidden) {
      showFolder(folder.id);
    } else {
      hideFolder(folder.id);
    }
  };
  return (
    <BookmarkListFolder
      key={folder.id}
      id={folder.id}
      title={folder.title}
      isHidden={isHidden}
      onOptionClick={handleOptionClick}
    >
      {folder.bookmarks.map((bookmark, index) => (
        <SortableBookmarkListItem
          key={bookmark.id}
          index={index}
          bookmark={bookmark}
          isDragging={isDragging}
          isHidden={isHidden}
        />
      ))}
    </BookmarkListFolder>
  );
});

const SortableBookmarkListItem = SortableElement<{
  bookmark: Bookmark;
  isDragging: boolean;
  isHidden: boolean;
}>(({ bookmark, isDragging, isHidden }) => (
  <BookmarkListItem
    key={bookmark.id}
    id={bookmark.id}
    title={bookmark.title}
    url={bookmark.url}
    isHoverDisabled={isDragging}
    isTransitionDisabled={isDragging}
    isHidden={isHidden}
  />
));

const RootList = styled.ul`
  display: block;
  text-align: left;
  padding-left: 0;
  width: 100%;
  max-width: 860px;
`;
