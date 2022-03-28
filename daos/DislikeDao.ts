import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/DislikeModel";
import Dislike from "../models/Dislike";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Dislikes
 * @property {DislikeDao} dislikeDao Private single instance of DislikeDao
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;

    /**
     * Returns Singelton instance of the class
     * @returns an object instance
     */
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }
    private constructor() {}

    findUserDislikesTuit = async (uid: string, tid: string) =>
    DislikeModel.findOne(
      {tuit: tid, dislikedBy: uid});


    /**
     * Retrieve all users who disliked a tuit
     * @param tid The tuit id
     * @returns promise containing list of users
     */
     findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .select("dislikedBy")
            .exec();

    /**
     * Retrieve all tuits liked by a user
     * @param uid The user id
     * @returns Promise containing a list of tuits
     */
     findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .populate("dislikedBy")
            .exec();

    countHowManyDislikedTuit = async (tid: string) =>
        DislikeModel.count({tuit: tid});

    /**
     * Like a tuit
     * @param uid The user
     * @param tid The tuit
     * @returns primise containing the creation details
     */
     userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});

    /**
     * Unlike a tuit
     * @param uid the user
     * @param tid the tuit
     * @returns The deletion status
     */
     userUndoDislikes = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, likedBy: uid});
}