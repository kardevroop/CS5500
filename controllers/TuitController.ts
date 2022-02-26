import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitControllerI";

/**
 * @class TuitController Implements RESTful Web service API for tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/tuits to create a new tuit instance for
 *     a given user</li>
 *     <li>GET /api/tuits to retrieve all the tuit instances</li>
 *     <li>GET /api/tuits/:tid to retrieve a particular tuit instances</li>
 *     <li>GET /api/users/:uid/tuits to retrieve tuits for a given user </li>
 *     <li>PUT /api/tuits/:tid to modify an individual tuit instance </li>
 *     <li>DELETE /api/tuits/:tid to remove a particular tuit instance</li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing tuit CRUD operations
 * @property {TuitController} tuitController Singleton controller implementing
 * RESTful Web service API
 */
export default class TuitController implements TuitControllerI {
   app: Express;
   tuitDao: TuitDao = TuitDao.getInstance();
   private static tuitController: TuitController | null = null

   /**
    * Get a singleton instance of the controller.
    * @param app Instance of the express server.
    */
   public static getInstance(app: Express) {
       if (TuitController.tuitController === null) {
           this.tuitController = new TuitController();
            //this.app = app;
            app.get('/api/tuits', TuitController.tuitController.findAllTuits);
            app.get('/api/tuits/:tid', TuitController.tuitController.findTuitById);
            app.get('/api/users/:uid/tuits', TuitController.tuitController.findTuitsByUser);
            app.post('/api/tuits', TuitController.tuitController.createTuit);
            app.put('/api/tuits/:tid', TuitController.tuitController.updateTuit);
            app.delete('/api/tuits/:tid', TuitController.tuitController.deleteTuit);
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
    * @param {Request} req Get request to return all posted tuits.
    * @param {Response} res Response element to capture all tuits.
    * @returns List of tuits as JSON.
    */
   findAllTuits = (req: Request, res: Response) =>
       this.tuitDao.findAllTuits()
           .then(tuits => res.json(tuits));

    /**
     * Return a tuit based on Id.
     * @param {Request}req GET request based on Id.
     * @param {Response} res Response object to capture the returned Id.
     * @returns The concerned tuit.
     */
   findTuitById = (req: Request, res: Response) =>
       this.tuitDao.findTuitById(req.params.tid)
           .then(tuit => res.json(tuit));
    /**
     * Return a tuit based on Id.
     * @param {Request} req GET request based on Id.
     * @param {Response} res Response object to capture the returned Id.
     * @returns The concerned tuit.
     */
   findTuitsByUser = (req: Request, res: Response) =>
       this.tuitDao.findTuitsByUser(req.params.uid)
           .then(tuits => res.json(tuits));
    /**
     * Create a new tuit.
     * @param {Request} req POST request to create new tuit.
     * @param {Response} res Response object to capture the new tuit.
     * @returns The tuit.
     */
   createTuit = (req: Request, res: Response) =>
       this.tuitDao.createTuit(req.body)
           .then(tuit => res.json(tuit));
    /**
     * Delete a tuit based on Id.
     * @param {Request} req DELETE request based on Id.
     * @param {Response} res Response object to capture the returned JSON.
     * @returns 
     */
   deleteTuit = (req: Request, res: Response) =>
       this.tuitDao.deleteTuit(req.params.tid)
           .then(status => res.json(status));
    /**
     * Update a tuit based on Id.
     * @param {Request} req PUT request based on Id.
     * @param {Response} res Response object to capture the updated tuit.
     * @returns The concerned tuit.
     */
   updateTuit = (req: Request, res: Response) =>
       this.tuitDao.updateTuit(req.params.tid, req.body)
           .then(status => res.json(status));
}
