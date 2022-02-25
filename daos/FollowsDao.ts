import FollowsDaoI from "../interfaces/FollowsDaoI";
import UserModel from "../mongoose/UserModel";
import FollowedByModel from "../mongoose/FollowedByModel";
import FollowingModel from "../mongoose/FollowingModel";
import FollowingTopicModel from "../mongoose/FollowingTopicModel";
import TopicModel from "../mongoose/TopicModel";
import User from "../models/User";

/**
 * @class FollowsDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowsDao} followsDao Private single instance of FollowsDao
 */
export default class FollowsDao implements FollowsDaoI {
    private static followsDao: FollowsDao | null = null;

    /**
     * Returns Singelton instance of the class
     * @returns an object instance
     */
    public static getInstance = (): FollowsDao => {
        if(FollowsDao.followsDao === null) {
            FollowsDao.followsDao = new FollowsDao();
        }
        return FollowsDao.followsDao;
    }
    private constructor() {}

    /**
     * Follow another user
     * @param uid The user who follows
     * @param fuid The user being followed
     * @returns The status of creation
     */
    follow = async (uid: string, fuid: string): Promise<any> => 
        FollowingModel.create({profile: uid, following: fuid}).then(res => {
            FollowedByModel.create({profile: fuid, followedBy: uid})
        });

    /**
     * Unfollow a user
     * @param uid The user following
     * @param fuid The user being followed
     * @returns The deletion status
     */
    unfollow = async (uid: string, fuid: string): Promise<any> =>
        FollowingModel.deleteOne({profile: uid, following: fuid}).then(() => {
            return FollowedByModel.deleteOne({profile: fuid, followedBy: uid})
        });

    /**
     * Retrievs a list of users being followed by this user
     * @param uid The user id
     * @returns list of users
     */
    findFollowingList = async (uid: string): Promise<User[]> =>
        FollowingModel
        .find({profile: uid})
        .select({following: 1})
        .populate("following");

    /**
     * Retrieves list of user following this user
     * @param uid the user id
     * @returns list of users
     */
    findFollowedBy = async (uid: string): Promise<User[]> =>
        FollowedByModel.find({profile: uid}).select({followedBy: 1}).populate("followedBy");

    followTopic = async (uid: string, topicid: string): Promise<any> =>
        FollowingTopicModel.create({profile: uid, following: topicid})

    findUsersFollowingSameTopic = async (topicid: string): Promise<User[]> =>
        FollowingTopicModel
        .find({following: topicid})
        .select({profile: 1})
        .populate("profile");
}