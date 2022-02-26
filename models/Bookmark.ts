import Tuit from "./Tuit";
import User from "./User";

/**
 * @class Class to represent a bookmark.
 */
export default class Bookmark {
   private bookmarkedTuit: Tuit ;
   private bookmarkedBy: User;
   private bookmarkFolder: string;
}
