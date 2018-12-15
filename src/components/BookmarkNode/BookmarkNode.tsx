import React, { FC, memo } from "react";
import "./BookmarkNode.css";
import { getFaviconUrl } from "../../utils/getFaviconUrl";
import folderImage from "../../assets/images/folder-open.svg";

interface Props {
  id: string;
  title: string;
  url?: string;
}

const BookmarkNode: FC<Props> = memo(props => {
  const { title, url } = props;
  const imageSrc = url ? getFaviconUrl(url) : folderImage;

  return (
    <a className="BookmarkNode" href={url} rel="noopener noreferrer">
      <div className="BookmarkNode-content">
        <img src={imageSrc} />
        <span>{title}</span>
      </div>
    </a>
  );
});

export default BookmarkNode;
