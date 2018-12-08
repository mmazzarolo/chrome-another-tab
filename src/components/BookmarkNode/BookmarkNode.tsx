import React, { FC, memo } from "react";
import "./BookmarkNode.css";
import { getFaviconUrl } from "../../utils/getFaviconUrl";

interface Props {
  id: string;
  title: string;
  url?: string;
}

const BookmarkNode: FC<Props> = memo(props => {
  const { title, url } = props;
  let faviconUrl = url ? getFaviconUrl(url) : "";
  return (
    <a
      className="BookmarkNode"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="BookmarkNode-content">
        <img src={faviconUrl} />
        <span>{title}</span>
      </div>
    </a>
  );
});

export default BookmarkNode;
