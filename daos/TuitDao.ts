import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDaoI";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI";
import Tuit from "../models/Tuit";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class TuitDao implements TuitDao {

    private static tuitDao: TuitDao | null = null;

    /**
     * Returns Singelton insatne of the class
     * @returns an object instance
     */
    public static getInstance(): TuitDao {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() {
    }

    /**
     * Translates HTTP request to a Database script to get all tuits.
     * @returns List of tuits wrapped in a promise.
     */
   async findAllTuits(): Promise<Tuit[]> {
       return await TuitModel.find();
   }

   /**
     * Translates HTTP request to a Database script to get all tuits posted by a user.
     * @returns List of tuits wrapped in a promise.
     */
   async findTuitsByUser(uid: string): Promise<Tuit[]> {
       return await TuitModel.find({postedBy: uid});
   }

   /**
     * Translates HTTP request to a Database script to get a tuit by Id.
     * @returns The concerned tuit wrapped in a promise.
     */
   async findTuitById(tid: string): Promise<Tuit> {
    return await TuitModel.findById(tid);
   }

   /**
     * Translates HTTP request to a Database script to create a tuit.
     * @returns The new tuit wrapped in a promise.
     */
    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit, postedBy: uid});

   /**
     * Translates HTTP request to a Database script to update a tuit.
     * @returns Changes to the tuit wrapped in a promise.
     */
   async updateTuit(tid: string, tuit: Tuit): Promise<any> {
    return await TuitModel.updateOne({_id: tid}, {$set: tuit});
   }

   /**
     * Translates HTTP request to a Database script to delete a tuits.
     * @returns The operation status wrapped in a promise.
     */
   async deleteTuit(tid: string):  Promise<any> {
       return await TuitModel.deleteOne({_id: tid});
   }

   /**
    * Delete a tuit based on text matching
    * @param text the text to be matched against
    * @returns the delete status
    */
   deleteTuitByText = async (text: string): Promise<any> =>
   TuitModel.deleteOne({tuit: text});

/**
 * Update the statistics of a tuit
 * @param tid the tuit id
 * @param newStats the updated stats
 * @returns the tuit with new stats
 */
   updateLikes = async (tid: string, newStats: any) =>
    TuitModel.updateOne(
      {_id: tid},
      {$set: {stats: newStats}});


}
