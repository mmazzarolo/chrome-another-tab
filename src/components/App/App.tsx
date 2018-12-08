import React, { FC, useState } from "react";
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
      <header className="App-header" />
      <BookmarkList bookmarkNode={bookmarks} />
    </div>
  );
};
