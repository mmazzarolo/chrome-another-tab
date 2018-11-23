import React, { memo } from "react";
import "./BookmarkList.css";

interface BookmarkSublistProps {
  node: chrome.bookmarks.BookmarkTreeNode;
}

const BookmarkSublist: React.FC<BookmarkSublistProps> = memo(props => {
  const { node } = props;
  return (
    <>
      <li>{node.title}</li>
      {node.children && (
        <ul>
          {node.children.map(x => (
            <BookmarkSublist node={x} key={x.id} />
          ))}
        </ul>
      )}
    </>
  );
});

interface BookmarkListProps {
  bookmarks: chrome.bookmarks.BookmarkTreeNode[];
}
const BookmarkList: React.FC<BookmarkListProps> = memo(props => {
  return (
    <ul className="BookmarkList">
      {props.bookmarks.map(x => (
        <BookmarkSublist node={x} key={x.id} />
      ))}
    </ul>
  );
});

export default BookmarkList;
