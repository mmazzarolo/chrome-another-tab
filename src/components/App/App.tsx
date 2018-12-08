import React, { FC, useState } from "react";
import "./App.css";
import { getBookmarks } from "../../services/chromeService";
import BookmarkList from "../BookmarkList/BookmarkList";
import { useOnMount } from "../../hooks/useOnMount";
import { flattenBookmarkTree } from "../../utils/flattenBookmarkTree";
import SearchBar from "../SearchBar/SearchBar";

export const App: FC = () => {
  const [bookmarks, setBookmarks] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const updateBookmarks = async (query?: string) => {
    const chromeBookmarks = await getBookmarks(query);
    const bookmarks = flattenBookmarkTree(chromeBookmarks);
    console.log("bookmarks", bookmarks);
    setBookmarks(bookmarks);
  };
  useOnMount(() => {
    updateBookmarks();
  });
  const handleQueryChange = (query: string) => {
    setSearchQuery(query);
    updateBookmarks(query);
  };
  return (
    <div className="App">
      <header className="App-header">
        <SearchBar query={searchQuery} onChange={handleQueryChange} />
      </header>
      <BookmarkList bookmarkNode={bookmarks} />
    </div>
  );
};
