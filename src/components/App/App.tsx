import React, { FC, useState } from "react";
import "./App.css";
import { getBookmarks } from "../../services/chromeService";
import BookmarkList from "../BookmarkList/BookmarkList";
import { useOnMount } from "../../hooks/useOnMount";
import { parseBookmarkTree } from "../../utils/parseBookmarkTree";
import SearchBar from "../SearchBar/SearchBar";

type Bookmark = chrome.bookmarks.BookmarkTreeNode;

export const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useOnMount(() => {
    updateBookmarks();
  });

  const updateBookmarks = async (query?: string) => {
    const chromeBookmarks = await getBookmarks();
    const bookmarks = parseBookmarkTree(chromeBookmarks, query);
    setBookmarks(bookmarks);
    if (isLoading) {
      setIsLoading(false);
    }
  };

  const handleQueryChange = (query: string) => {
    setSearchQuery(query);
    updateBookmarks(query);
  };

  return (
    <div className="App">
      {isLoading && <div />}
      {!isLoading && (
        <>
          <header>
            <SearchBar query={searchQuery} onChange={handleQueryChange} />
          </header>
          <main>
            <BookmarkList bookmarkNode={bookmarks} />
          </main>
        </>
      )}
    </div>
  );
};
