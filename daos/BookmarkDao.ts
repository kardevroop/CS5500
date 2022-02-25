import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import UserModel from "../mongoose/UserModel";
import BookmarkModel from "../mongoose/BookmarkModel";
import TuitModel from "../mongoose/TuitModel";
import User from "../models/User";
import Tuit from "../models/Tuit";
import Bookmark from "../models/Bookmark";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Returns Singelton instance of the class
     * @returns an object instance
     */
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}

    /**
     * Bookmark a tuit
     * @param uid The user id
     * @param tid The tuit id
     * @returns bookark creation status
     */
    userBookmarksTuit  = async (uid: string, tid: string): Promise<any> => 
        BookmarkModel.create({bookmarkedTuit: tid, bookmarkedBy: uid});

    /**
     * Unbookmark a tuit
     * @param uid The user id
     * @param tid The tuit id 
     * @returns bookmark deletion status
     */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedTuit: tid, bookmarkedBy: uid});

    /**
     * Retrieve list of bookmarks
     * @param uid The user id
     * @returns list of bookmarks
     */
    userViewsListOfBookmarkedTuits = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({bookmarkedBy: uid})
            .populate("bookmarkedTuit")
            .populate("bookmarkedBy")
            .exec();

    /**
     * Bookmark a tuit under a folder
     * @param uid The user id
     * @param tid The tuit id
     * @param folder the folder
     * @returns 
     */
    userBookmarksTuitUnderFolder = async (bookark: Bookmark): Promise<any> =>
        BookmarkModel.create(bookark);

    /**
     * Move a bookmarked tuit between folders
     * @param bid The bookmark id
     * @param bookmark the bookmark
     * @returns 
     */
    userMovesBookmarkToAnotherFolder = async (bid: string, bookmark: Bookmark): Promise<any> =>
        BookmarkModel.updateOne({_id: bid}, {$set: bookmark});
}