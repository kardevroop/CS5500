import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDaoI";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI";
import Tuit from "../models/Tuit";

export default class TuitDao implements TuitDao {

    private static tuitDao: TuitDao | null = null;

    public static getInstance(): TuitDao {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() {
    }

   async findAllTuits(): Promise<Tuit[]> {
       return await TuitModel.find();
   }
   async findTuitsByUser(uid: string): Promise<Tuit[]> {
       return await TuitModel.findById(uid);
   }
   async findTuitById(tid: string): Promise<Tuit> {
    return await TuitModel.findById(tid);
   }
   async createTuit(tuit: Tuit): Promise<Tuit> {
       return await TuitModel.create(tuit);
   }
   async updateTuit(tid: string, tuit: Tuit): Promise<any> {
    return await TuitModel.updateOne({_id: tid}, {$set: tuit});
   }
   async deleteTuit(tid: string):  Promise<any> {
       return await TuitModel.deleteOne({_id: tid});
   }
}
