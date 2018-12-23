interface Bookmark {
  index?: number;
  title: string;
  url?: string;
  dateGroupModified?: number;
  id: string;
  parentId?: string;
}

interface Folder {
  index?: number;
  title: string;
  url?: string;
  id: string;
  parentId?: string;
  bookmarks: Bookmark[];
}

export type BookmarkTree = Folder[];
