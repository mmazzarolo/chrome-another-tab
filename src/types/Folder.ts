import { Bookmark } from "./Bookmark";

export interface Folder {
  index?: number;
  title: string;
  url?: string;
  id: string;
  parentId?: string;
  isHidden: boolean;
  bookmarks: Bookmark[];
}
