import React, { FC, memo } from "react";
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
        <li>{bookmarkNode.title}</li>
        {bookmarkNode.children && (
          <ul>
            {bookmarkNode.children.map(x => (
              <BookmarkList bookmarkNode={x} key={x.id} />
            ))}
          </ul>
        )}
      </>
    );
  }
});

export default BookmarkList;
