import React, { FC, useState } from "react";
import styled from "styled-components";
import { getBookmarks } from "../services/chromeService";
import { BookmarkList } from "./BookmarkList";
import { useOnMount } from "../hooks/useOnMount";
import { parseBookmarkTree } from "../utils/parseBookmarkTree";
import { Header } from "./Header";

type Bookmark = chrome.bookmarks.BookmarkTreeNode;

export const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useOnMount(() => {
    updateBookmarks();
  });

  const updateBookmarks = async (query?: string) => {
    const chromeBookmarks = await getBookmarks();
    const bookmarks = parseBookmarkTree(chromeBookmarks, query);
    setBookmarks(bookmarks);
    console.log("bookmarks: ", bookmarks);
    if (isLoading) {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    console.log("click");
  };

  return (
    <Root>
      {isLoading && <div />}
      {!isLoading && (
        <>
          <Header onEditClick={handleEditClick} />
          <Main>
            <BookmarkList bookmarkNode={bookmarks} />
          </Main>
        </>
      )}
    </Root>
  );
};

const Root = styled.div`
  text-align: center;
  transition: all 0.6s ease-out;
  height: 100%;
  background: linear-gradient(to bottom, #c6ffdd, #fbd786, #f7797d);
  background: linear-gradient(to top, #c2e59c, #64b3f4);
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
`;

const Main = styled.main`
  animation: fade-in 0.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation-delay: 0.2s;
`;
