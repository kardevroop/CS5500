import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDaoI";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class UserDao implements UserDaoI {

    private static userDao: UserDao | null = null;

    /**
     * Returns Singelton instance of the class
     * @returns an object instance
     */
    public static getInstance(): UserDao {
        if (UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }

    private constructor() {
    }

    /**
     * Translates HTTP request to a Database script to get all users.
     * @returns List of users wrapped in a promise.
     */
   async findAllUsers(): Promise<User[]> {
       return await UserModel.find();
   }
   /**
     * Translates HTTP request to a Database script to get a user by id.
     * @returns The user wrapped in a promise.
     */
   async findUserById(uid: string): Promise<User> {
       return await UserModel.findById(uid);
   }
   /**
     * Translates HTTP request to a Database script to create auser tuits.
     * @returns The new user wrapped in a promise.
     */
   async createUser(user: User): Promise<User> {
       return await UserModel.create(user);
   }
   /**
     * Translates HTTP request to a Database script to delete an user.
     * @returns The operation status wrapped in a promise.
     */
   async deleteUser(uid: string):  Promise<any> {
       return await UserModel.deleteOne({_id: uid});
   }
   /**
     * Translates HTTP request to a Database script to update an user.
     * @returns The updated user wrapped in a promise.
     */
   async updateUser(uid: string, user: User): Promise<any> {
       return await UserModel.updateOne({_id: uid}, {$set: user});
   }

   deleteAllUsers = async (): Promise<any> =>
   UserModel.deleteMany({});

    deleteUsersByUsername = async (username: string): Promise<any> =>
    UserModel.deleteMany({username});

    findUserByCredentials = async (username: string, password: string): Promise<any> =>
      UserModel.findOne({username: username, password: password});

    findUserByUsername = async (username: string): Promise<any> =>
      UserModel.findOne({username});
}
