/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import FollowsDao from "../daos/FollowsDao";
import FollowsControllerI from "../interfaces/FollowsControllerI";

 /**
  * @class FollowsController Implements RESTful Web service API for follows resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>POST /api/users/:uid/follow/:fuid allows a user to follow another
  *     </li>
  *     <li>DELTE /api/users/:uid/unfollow/:fuid allows a user to not follow another anymore 
  *     </li>
  *     <li>GET /api/users/:uid/following returns all users one is following
  *     </li>
  *     <li>GET /api/users/:uid/followers returns all user following one
  *     </li>
  *     <li>POST /api/users/:uid/follow/topic/:topicid allows a user to follow a specific topic
  *     </li>
  *     <li>GET /api/topic/:topicid/following returns all user following the mentioned topic
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
    * Allows a user to follow another.
    * @param {Request} req POST request to allow a user to follow another.
    * @param {Reponse}res Response element to capture the response.
    * @returns Promise to the created relationship.
    */
    follow = (req: Request, res: Response) =>
       this.followsDao.follow(req.params.uid, req.params.fuid)
           .then(follows => res.json(follows));

    /**
     * Allows a user to unfollow another user.
     * @param {Request} req DELETE request based on user id and the followed user id.
     * @param {Response} res Response object to capture the delete status.
     * @returns Promise to The delete status.
     */
     unfollow = (req: Request, res: Response) =>
       this.followsDao.unfollow(req.params.uid, req.params.fuid)
           .then(tuit => res.send(tuit));
    /**
     * Return a list of users followed by a user based on Id.
     * @param {Request} req GET request based on Id.
     * @param {Response} res Response object to capture the list of users.
     * @returns Promise to a list of users.
     */
     findFollowingList = (req: Request, res: Response) =>
       this.followsDao.findFollowingList(req.params.uid)
           .then(tuits => res.json(tuits));
    /**
     * Return the list of users followinf this user based on Id.
     * @param {Request} req GET request to create new tuit.
     * @param {Reponse} res Response object to capture the list of userrs.
     * @returns Promise to The list of users.
     */
     findFollowedBy = (req: Request, res: Response) =>
       this.followsDao.findFollowedBy(req.params.uid)
           .then(tuit => res.json(tuit));
    /**
     * allow a user to follow a topic.
     * @param {Request} req POST request to create relationship.
     * @param {Response} res Response object to capture the new object.
     * @returns Promise to the created object.
     */
      followTopic = (req: Request, res: Response) =>
         this.followsDao.followTopic(req.params.uid, req.params.topicid)
             .then(follow => res.json(follow));

    /**
     * Allows a user to search for other users following the same topic.
     * @param {Request} req GET request to return the list users following the same topic.
     * @param {Response} res Response object to capture the list.
     * @returns Promise to the list of users.
     */
      findUsersFollowingSameTopic = (req: Request, res: Response) =>
     this.followsDao.findUsersFollowingSameTopic(req.params.topicid)
         .then(follow => res.json(follow));
}
