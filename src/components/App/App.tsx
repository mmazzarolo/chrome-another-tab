import React, { FC, useState } from "react";
import logo from "../../assets/images/logo.svg";
import "./App.css";
import { getBookmarks } from "../../services/chromeService";
import BookmarkList from "../BookmarkList/BookmarkList";
import { useOnMount } from "../../hooks/useOnMount";
import { flattenBookmarkTree } from "../../utils/flattenBookmarkTree";

export const App: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);
  const updateBookmarks = async (query?: string) => {
    const chromeBookmarks = await getBookmarks();
    const bookmarks = flattenBookmarkTree(chromeBookmarks);
    setBookmarks(bookmarks);
  };
  useOnMount(() => {
    updateBookmarks();
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <BookmarkList bookmarkNode={bookmarks} />
    </div>
  );
};
