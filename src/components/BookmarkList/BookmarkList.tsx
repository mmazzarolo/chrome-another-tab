import React, { FC, memo } from "react";
import BookmarkNode from "../BookmarkNode/BookmarkNode";
import "./BookmarkList.css";

interface Props {
  bookmarkNode:
    | chrome.bookmarks.BookmarkTreeNode[]
    | chrome.bookmarks.BookmarkTreeNode;
}

const BookmarkList: FC<Props> = memo(props => {
  const { bookmarkNode } = props;
  if (Array.isArray(bookmarkNode)) {
    return (
      <ul className="BookmarkList">
        {bookmarkNode.map(x => (
          <BookmarkList bookmarkNode={x} key={x.id} />
        ))}
      </ul>
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
            <li className="BookmarkList-folder-title">{bookmarkNode.title}</li>
            <ul>
              {bookmarkNode.children.map(x => (
                <BookmarkList bookmarkNode={x} key={x.id} />
              ))}
            </ul>
          </>
        )}
      </>
    );
  }
});

export default BookmarkList;
