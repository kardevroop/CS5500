import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserControllerI";

/**
 * @class UserController Implements RESTful Web service API for users resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users to create a new user instance</li>
 *     <li>GET /api/users to retrieve all the user instances</li>
 *     <li>GET /api/users/:uid to retrieve an individual user instance </li>
 *     <li>PUT /api/users to modify an individual user instance </li>
 *     <li>DELETE /api/users/:uid to remove a particular user instance</li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
 * @property {UserController} userController Singleton controller implementing
 * RESTful Web service API
 */
export default class UserController implements UserControllerI {
   app: Express;
   userDao: UserDao = UserDao.getInstance();

   private static userController: UserController | null = null;

   /**
    * Return a singleton instance of this controller.
    * @param app instance of the express server.
    * @returns instance of this class.
    */
   public static getInstance(app: Express): UserController {
        if(UserController.userController === null) {
            UserController.userController = new UserController();
            //this.app = app;
            app.get('/api/users', UserController.userController.findAllUsers);
            app.get('/api/users/:userid', UserController.userController.findUserById);
            app.post('/api/users', UserController.userController.createUser);
            app.delete('/api/users/:userid', UserController.userController.deleteUser);
            app.put('/api/users/:userid', UserController.userController.updateUser);
            app.delete("/api/users", UserController.userController.deleteAllUsers);
            app.post("/api/login", UserController.userController.login);

            //Only for testing
            app.get("/api/users/create",
            UserController.userController.createUser);
            app.get("/api/users/id/:uid/delete",
                UserController.userController.deleteUser);
            app.get("/api/users/username/:username/delete",
                UserController.userController.deleteUsersByUsername);
            app.get("/api/users/delete",
                UserController.userController.deleteAllUsers);
        }
        return UserController.userController;
   }

   private constructor(){

   }
//    constructor(app: Express, userDao: UserDao) {
//        this.app = app;
//        this.userDao = userDao;
//        this.app.get('/users', this.findAllUsers);
//        this.app.get('/users/:userid', this.findUserById);
//        this.app.post('/users', this.createUser);
//        this.app.delete('/users/:userid', this.deleteUser);
//        this.app.put('/users/:userid', this.updateUser);
//    }

   /**
    * Return all users.
    * @param {Request} req Get request to return all users.
    * @param {Response} res Response element to capture all users.
    * @returns List of users as JSON.
    */
   findAllUsers = (req: Request, res: Response) =>
       this.userDao.findAllUsers()
           .then(users => res.json(users));
    /**
    * Return user by id.
    * @param {Request} req Get request to return specific user.
    * @param {Response} res Response element to capture the user.
    * @returns user object as JSON.
    */
   findUserById = (req: Request, res: Response) =>
       this.userDao.findUserById(req.params.userid)
           .then(user => res.json(user));
   /**
    * Create a new user.
    * @param {Request} req POST request to create a new user.
    * @param {Response} res Response element to capture new user details.
    * @returns user as JSON.
    */
   createUser = (req: Request, res: Response) =>
       this.userDao.createUser(req.body)
           .then(user => res.json(user));
   /**
    * Delete a user.
    * @param {Request} req DELETE request to delete a user.
    * @param {Response} res Delete status.
    * @returns The status of the operation.
    */
   deleteUser = (req: Request, res: Response) =>
       this.userDao.deleteUser(req.params.userid)
           .then(status => res.json(status));
   /**
    * Update the details of a user.
    * @param {Request} req PUT request to update a user.
    * @param {Response} res User update details.
    * @returns updated user object as JSON.
    */
   updateUser = (req: Request, res: Response) =>
       this.userDao.updateUser(req.params.userid, req.body)
           .then(status => res.json(status));

    deleteAllUsers = (req: Request, res: Response) =>
    this.userDao.deleteAllUsers()
        .then((status) => res.send(status));
   
    deleteUsersByUsername = (req: Request, res: Response) =>
        this.userDao.deleteUsersByUsername(req.params.username)
        .then(status => res.send(status));

    login = (req: Request, res: Response) =>
    this.userDao.findUserByCredentials(req.body.username, req.body.password)
        .then(user => {
            res.json(user)
        });

    register = (req: Request, res: Response) =>
    this.userDao.findUserByUsername(req.body.username)
        .then(user => {
            
        })
}
