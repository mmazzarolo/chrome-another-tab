import React, { FC, memo } from "react";
import styled from "styled-components/macro";
import { BookmarkListItem } from "./BookmarkListItem";
import { BookmarkListFolder } from "./BookmarkListFolder";
import { BookmarkTree } from "../types/BookmarkTree";

interface Props {
  bookmarkTree: BookmarkTree;
}

export const BookmarkList: FC<Props> = memo(props => {
  const { bookmarkTree } = props;
  return (
    <RootList>
      {bookmarkTree.map(folder => {
        return (
          <BookmarkListFolder key={folder.id} title={folder.title}>
            {folder.bookmarks.map(bookmark => (
              <BookmarkListItem
                key={bookmark.id}
                id={bookmark.id}
                title={bookmark.title}
                url={bookmark.url}
              />
            ))}
          </BookmarkListFolder>
        );
      })}
    </RootList>
  );
});

const RootList = styled.ul`
  text-align: left;
  padding-left: 0;
`;
