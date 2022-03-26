import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/LikeModel";
import Like from "../models/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
     * Returns Singelton instance of the class
     * @returns an object instance
     */
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}

    findUserLikesTuit = async (uid: string, tid: string) =>
    LikeModel.findOne(
      {tuit: tid, likedBy: uid});


    /**
     * Retrieve all users who liked a tuit
     * @param tid The tuit id
     * @returns promise containing list of users
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .select("likedBy")
            .exec();

    /**
     * Retrieve all tuits liked by a user
     * @param uid The user id
     * @returns Promise containing a list of tuits
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .populate("likedBy")
            .exec();

    countHowManyLikedTuit = async (tid: string) =>
        LikeModel.count({tuit: tid});

    /**
     * Like a tuit
     * @param uid The user
     * @param tid The tuit
     * @returns primise containing the creation details
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    /**
     * Unlike a tuit
     * @param uid the user
     * @param tid the tuit
     * @returns The deletion status
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});
}