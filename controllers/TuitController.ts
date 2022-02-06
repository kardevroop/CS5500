import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitControllerI";

export default class TuitController implements TuitControllerI {
   app: Express;
   tuitDao: TuitDao = TuitDao.getInstance();
   private static tuitController: TuitController | null = null

   public static getInstance(app: Express) {
       if (TuitController.tuitController === null) {
           this.tuitController = new TuitController();
            //this.app = app;
            app.get('/tuits', TuitController.tuitController.findAllTuits);
            app.get('/tuits/:tid', TuitController.tuitController.findTuitById);
            app.get('/users/:uid/tuits', TuitController.tuitController.findTuitsByUser);
            app.post('/tuits', TuitController.tuitController.createTuit);
            app.put('/tuits/:tid', TuitController.tuitController.updateTuit);
            app.delete('/tuits/:tid', TuitController.tuitController.deleteTuit);
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
   findAllTuits = (req: Request, res: Response) =>
       this.tuitDao.findAllTuits()
           .then(tuits => res.json(tuits));
   findTuitById = (req: Request, res: Response) =>
       this.tuitDao.findTuitById(req.params.tid)
           .then(tuit => res.json(tuit));
   findTuitsByUser = (req: Request, res: Response) =>
       this.tuitDao.findTuitsByUser(req.params.tid)
           .then(tuit => res.json(tuit));
   createTuit = (req: Request, res: Response) =>
       this.tuitDao.createTuit(req.body)
           .then(tuit => res.json(tuit));
   deleteTuit = (req: Request, res: Response) =>
       this.tuitDao.deleteTuit(req.params.tid)
           .then(status => res.json(status));
   updateTuit = (req: Request, res: Response) =>
       this.tuitDao.updateTuit(req.params.tid, req.body)
           .then(status => res.json(status));
}
