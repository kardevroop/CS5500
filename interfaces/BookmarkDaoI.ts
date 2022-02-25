import Bookmark from "../models/Bookmark";
import Tuit from "../models/Tuit";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface BookmarkDaoI {
    userBookmarksTuit (uid: string, tid: string): Promise<any>;
    userUnbookmarksTuit (uid: string, tid: string): Promise<any>;
    userViewsListOfBookmarkedTuits (uid: string): Promise<Bookmark[]>;
    userBookmarksTuitUnderFolder (bookmark: Bookmark): Promise<Bookmark>;
    userMovesBookmarkToAnotherFolder (bid: string, bookmark: Bookmark): Promise<Bookmark>;
};