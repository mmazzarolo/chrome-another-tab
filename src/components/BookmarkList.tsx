import React, { FC, memo } from "react";
import styled from "styled-components/macro";
import { BookmarkNode } from "./BookmarkNode";
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
          <div key={folder.id}>
            <FolderTitle>{folder.title}</FolderTitle>
            <Folder>
              {folder.bookmarks.map(bookmark => (
                <BookmarkNode
                  key={bookmark.id}
                  id={bookmark.id}
                  title={bookmark.title}
                  url={bookmark.url}
                />
              ))}
            </Folder>
          </div>
        );
      })}
    </RootList>
  );
});

const RootList = styled.ul`
  text-align: left;
  padding-left: 0;
`;

const Folder = styled.ul`
  display: grid;
  grid-gap: 12px 20px;
  grid-template-columns: repeat(auto-fit, 320px);
  grid-auto-rows: 54px;
  padding-left: 0;
`;

const FolderTitle = styled.li`
  list-style: none;
  padding-left: 0px;
  color: white;
  font-size: 19px;
  margin-top: 30px;
  margin-bottom: 10px;
  font-weight: 500;
`;
