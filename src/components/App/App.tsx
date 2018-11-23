import React, { Component } from "react";
import logo from "../../assets/images/logo.svg";
import "./App.css";
import { getBookmarks } from "../../services/chromeService";
import BookmarkList from "../BookmarkList/BookmarkList";

interface State {
  bookmarks: chrome.bookmarks.BookmarkTreeNode[];
}

class App extends Component<{}, State> {
  state = {
    bookmarks: []
  };
  componentDidMount() {
    this.updateBookmarks();
  }

  updateBookmarks = async (query?: string) => {
    const bookmarks = await getBookmarks();
    this.setState({ bookmarks });
  };

  render() {
    const { bookmarks } = this.state;
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
        <BookmarkList bookmarks={bookmarks} />
      </div>
    );
  }
}

export default App;
