import React, { FC, memo, useState } from "react";
import styled from "styled-components/macro";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { BookmarkListItem } from "./BookmarkListItem";
import { BookmarkListFolder } from "./BookmarkListFolder";
import { BookmarkTree } from "../types/BookmarkTree";
import { Bookmark } from "../types/Bookmark";
import { Folder } from "../types/Folder";
import { actions } from "../actions";
import { useMappedActions } from "../hooks/useMappedActions";

interface BookmarkListProps {
  bookmarkTree: BookmarkTree;
}

export const BookmarkList: FC<BookmarkListProps> = memo(props => {
  const { bookmarkTree } = props;
  const [isDragging, setIsDragging] = useState(false);
  const { moveBookmark } = useMappedActions(actions);
  const handleStartDragging = () => setIsDragging(true);
  const handleStopDragging = (
    folder: Folder,
    params: {
      oldIndex: number;
      newIndex: number;
    }
  ) => {
    setIsDragging(false);
    const bookmark = folder.bookmarks[params.oldIndex];
    moveBookmark(bookmark, params.oldIndex, params.newIndex);
  };
  const { hideFolder, showFolder } = useMappedActions(actions);
  return (
    <Root>
      {bookmarkTree.map(folder => {
        const handleOptionClick = () => {
          if (folder.isHidden) {
            showFolder(folder.id);
          } else {
            hideFolder(folder.id);
          }
        };
        return (
          <BookmarkListFolder
            key={folder.id}
            title={folder.title}
            isHidden={folder.isHidden}
            onOptionClick={handleOptionClick}
          >
            <SortableBookmarkList
              key={folder.id}
              folder={folder}
              isFolderHidden={folder.isHidden}
              isDragging={isDragging}
              axis="xy"
              distance={8}
              updateBeforeSortStart={handleStartDragging}
              onSortEnd={params => handleStopDragging(folder, params)}
            />
          </BookmarkListFolder>
        );
      })}
    </Root>
  );
});

const SortableBookmarkList = SortableContainer<{
  folder: Folder;
  isDragging: boolean;
  isFolderHidden: boolean;
}>(props => {
  return (
    <Grid>
      {props.folder.bookmarks.map((bookmark, index) => (
        <SortableBookmarkListItem
          key={bookmark.id}
          index={index}
          bookmark={bookmark}
          isDragging={props.isDragging}
          isHidden={props.isFolderHidden}
        />
      ))}
    </Grid>
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

const Root = styled.ul`
  display: block;
  text-align: left;
  padding-left: 0;
  width: 100%;
  max-width: 860px;
`;

const Grid = styled.ul`
  display: grid;
  grid-gap: 12px 20px;
  grid-template-columns: repeat(auto-fit, 260px);
  grid-auto-rows: 54px;
  padding-left: 0;
`;
