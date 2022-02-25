import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import FollowsDao from "../daos/FollowsDao";
import FollowsControllerI from "../interfaces/FollowsControllerI";

 /**
  * @class FollowsController Implements RESTful Web service API for likes resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>POST /api/users/:uid/follow/:fuid allows a user to follow another
  *     </li>
  *     <li>DELTE /api/users/:uid/unfollow/:fuid allows a user to not follow another anymore 
  *     </li>
  *     <li>GET api/users/:uid/following returns all users one is following
  *     </li>
  *     <li>GET api/users/:uid/followers returns all user following one
  *     </li>
  * </ul>
  * @property {FollowsDao} followsDao Singleton DAO implementing likes CRUD operations
  * @property {FollowsController} followsController Singleton controller implementing
  * RESTful Web service API
  */
export default class FollowsController implements FollowsControllerI {
   app: Express;
   followsDao: FollowsDao = FollowsDao.getInstance();
   private static followsController: FollowsController | null = null

   /**
    * Get a singleton instance of the controller.
    * @param app Instance of the express server.
    */
   public static getInstance(app: Express) {
       if (FollowsController.followsController === null) {
           this.followsController = new FollowsController();
            //this.app = app;
            app.post('/api/users/:uid/follow/:fuid', FollowsController.followsController.follow);
            app.delete('/api/users/:uid/unfollow/:fuid', FollowsController.followsController.unfollow);
            app.get('/api/users/:uid/following', FollowsController.followsController.findFollowingList);
            app.get('/api/users/:uid/followers', FollowsController.followsController.findFollowedBy);
            app.post('/api/users/:uid/follow/topic/:topicid', FollowsController.followsController.followTopic);
            app.get('/api/topic/:topicid/following', FollowsController.followsController.findUsersFollowingSameTopic);
       }
   }

   private constructor() {

   }
//    constructor(app: Express, tuitDao: TuitDao) {
//        this.app = app;
//        this.tuitDao = tuitDao;
//        this.app.get('/tuits', this.findAllTuits);
//        this.app.get('/tuits/:tid', this.findTuitById);
//        this.app.get('/users/:uid/tuits', this.findTuitsByUser);
//        this.app.post('/tuits', this.createTuit);
//        this.app.put('/tuits/:tid', this.updateTuit);
//        this.app.delete('/tuits/:tid', this.deleteTuit);
//    }

   /**
    * Return all tuits.
    * @param req Get request to return all posted tuits.
    * @param res Response element to capture all tuits.
    * @returns List of tuits as JSON.
    */
    follow = (req: Request, res: Response) =>
       this.followsDao.follow(req.params.uid, req.params.fuid)
           .then(follows => res.json(follows));

    /**
     * Return a tuit based on Id.
     * @param req GET request based on Id.
     * @param res Response object to capture the returned Id.
     * @returns The concerned tuit.
     */
     unfollow = (req: Request, res: Response) =>
       this.followsDao.unfollow(req.params.uid, req.params.fuid)
           .then(tuit => res.send(tuit));
    /**
     * Return a tuit based on Id.
     * @param req GET request based on Id.
     * @param res Response object to capture the returned Id.
     * @returns The concerned tuit.
     */
     findFollowingList = (req: Request, res: Response) =>
       this.followsDao.findFollowingList(req.params.uid)
           .then(tuits => res.json(tuits));
    /**
     * Create a new tuit.
     * @param req POST request to create new tuit.
     * @param res Response object to capture the new tuit.
     * @returns The tuit.
     */
     findFollowedBy = (req: Request, res: Response) =>
       this.followsDao.findFollowedBy(req.params.uid)
           .then(tuit => res.json(tuit));
        /**
     * Create a new tuit.
     * @param req POST request to create new tuit.
     * @param res Response object to capture the new tuit.
     * @returns The tuit.
     */
      followTopic = (req: Request, res: Response) =>
         this.followsDao.followTopic(req.params.uid, req.params.topicid)
             .then(follow => res.json(follow));
          /**
     * Create a new tuit.
     * @param req POST request to create new tuit.
     * @param res Response object to capture the new tuit.
     * @returns The tuit.
     */
      findUsersFollowingSameTopic = (req: Request, res: Response) =>
     this.followsDao.findUsersFollowingSameTopic(req.params.topicid)
         .then(follow => res.json(follow));
}
