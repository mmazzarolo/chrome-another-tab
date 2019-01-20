/**
 * The list of bookmark folders. Handle the interactions between the folder
 * show/hide option and Redux.
 */
import React, { FC, memo, useState } from "react";
import styled from "styled-components/macro";
import { FolderHeader } from "./FolderHeader";
import { BookmarkTree } from "../types/BookmarkTree";
import { Folder } from "../types/Folder";
import { actions } from "../actions";
import { useMappedActions } from "../hooks/useMappedActions";
import { BookmarkGrid } from "./BookmarkGrid";

interface Props {
  bookmarkTree: BookmarkTree;
}

export const FolderList: FC<Props> = memo(({ bookmarkTree }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { moveBookmark } = useMappedActions(actions);
  const handleStartDragging = () => {
    setIsDragging(true);
  };
  const handleStopDragging = (
    folder: Folder,
    params: {
      oldIndex: number;
      newIndex: number;
    }
  ) => {
    const bookmark = folder.bookmarks[params.oldIndex];
    moveBookmark(bookmark, params.oldIndex, params.newIndex);
    setIsDragging(false);
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
          <FolderItem key={folder.id}>
            <FolderHeader
              title={folder.title}
              isHidden={folder.isHidden}
              onOptionClick={handleOptionClick}
            />
            <BookmarkGrid
              folder={folder}
              isFolderHidden={folder.isHidden}
              isDragging={isDragging}
              axis="xy"
              distance={8}
              updateBeforeSortStart={handleStartDragging}
              onSortEnd={params => handleStopDragging(folder, params)}
            />
          </FolderItem>
        );
      })}
    </Root>
  );
});

const Root = styled.ul`
  display: block;
  text-align: left;
  padding-left: 0;
  width: 100%;
  max-width: 860px;
`;

const FolderItem = styled.li`
  list-style: none;
  padding-left: 0px;
  margin-top: 30px;
  margin-bottom: 10px;
`;
