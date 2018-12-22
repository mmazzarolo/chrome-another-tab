import React, { FC, memo } from "react";
import styled from "styled-components/macro";
import { BookmarkNode } from "./BookmarkNode";
import { ChromeBookmark } from "../types/ChromeBookmark";

interface Props {
  bookmarkNode: ChromeBookmark[] | ChromeBookmark;
}

export const BookmarkList: FC<Props> = memo(props => {
  const { bookmarkNode } = props;
  if (Array.isArray(bookmarkNode)) {
    return (
      <RootList>
        {bookmarkNode.map(x => (
          <BookmarkList bookmarkNode={x} key={x.id} />
        ))}
      </RootList>
    );
  } else {
    return (
      <>
        {!bookmarkNode.children && (
          <BookmarkNode
            id={bookmarkNode.id}
            title={bookmarkNode.title}
            url={bookmarkNode.url}
          />
        )}
        {bookmarkNode.children && (
          <>
            <FolderTitle>{bookmarkNode.title}</FolderTitle>
            <Folder>
              {bookmarkNode.children.map(x => (
                <BookmarkList bookmarkNode={x} key={x.id} />
              ))}
            </Folder>
          </>
        )}
      </>
    );
  }
});

const RootList = styled.ul`
  text-align: left;
`;

const Folder = styled.ul`
  display: grid;
  grid-gap: 12px 32px;
  grid-template-columns: repeat(auto-fit, 320px);
  grid-auto-rows: 54px;
  padding-left: 0;
`;

const FolderTitle = styled.li`
  list-style: none;
  padding-left: 0px;
  color: #252124;
  font-size: 19px;
  margin-top: 30px;
  margin-bottom: 10px;
  font-weight: 500;
`;
