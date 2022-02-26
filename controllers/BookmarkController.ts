/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
 import {Express, Request, Response} from "express";
 import BookmarkDao from "../daos/BookmarkDao";
 import BookmarkControllerI from "../interfaces/BookmarkControllerI";
 
 /**
  * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>POST /api/users/:uid/bookmarks/:tid creates a bookmark of a tuit for a user
  *     </li>
  *     <li>GET /api/users/:uid/bookmark to retrieve all tuits bookmarked by a user 
  *     </li>
  *     <li>POST /api/users/:uid/bookmarks/:tid/:fid saves a bookmark under a specific folder
  *     </li>
  *     <li>PUT /api/users/:uid/bookmarks/:tid/:fid moves a saved bookmark to another folder
  *     </li>
  *     <li>DELETE /api/users/:uid/unbookmarks/:tid deletes a bookmark
  *     no londer likes a tuit</li>
  * </ul>
  * @property {BookmarkDao} BookmarkDao Singleton DAO implementing likes CRUD operations
  * @property {BookmarkController} BookmarkController Singleton controller implementing
  * RESTful Web service API
  */
 export default class BookmarkController implements BookmarkControllerI {
     private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
     private static bookmarkController: BookmarkController | null = null;
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return BookmarkController
      */
     public static getInstance = (app: Express): BookmarkController => {
         if(BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
             app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
             app.delete("/api/users/:uid/unbookmarks/:tid", BookmarkController.bookmarkController.userUnbookmarksTuit);
             app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.userViewsListOfBookmarkedTuits);
             app.post("/api/users/:uid/bookmarks/:tid/folder", BookmarkController.bookmarkController.userBookmarksTuitUnderFolder);
             app.put("/api/bookmarks/:bid/move", BookmarkController.bookmarkController.userMovesBookmarkToAnotherFolder);
         }
         return BookmarkController.bookmarkController;
     }
 
     private constructor() {}
 
     /**
      * Bookmarks a tuit for a user
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user who bookmarked the tuit and 
      * tid representing the bookmarked tuit
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the bookmark objects
      */
      userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
             .then(bookmark => res.json(bookmark));
 
     /**
      * Removes a tuit from the bookmark list
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user who bookmarked the tuit and 
      * tid representing the bookmarked tuit
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the tuit objects that were liked
      */
      userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
             .then(bookmark => res.send(bookmark));
 
     /**
      * Retrieves list of all tuits bookmarked by a user
      * @param {Request} req Represents request from client, including the
      * path parameter uid representing the user that bookmarked the tuits
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new likes that was inserted in the
      * database
      */
      userViewsListOfBookmarkedTuits = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userViewsListOfBookmarkedTuits(req.params.uid)
             .then(bookmark => res.json(bookmark));
 
     /**
      * Creates a bookmark under a folder
      * @param {Request} req Represents request from client, including the
      * body containing bookmark information
      * @param {Response} res Represents response to client, including status
      * on whether deleting the like was successful or not
      */
      userBookmarksTuitUnderFolder = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuitUnderFolder(req.body)
             .then(bookmark => res.json(bookmark));

    /**
     * Moves a bookmark to another folder
      * @param {Request} req Represents request from client, including the
      * path parameter bid representing the bookmarked tuit and the body
      * containing the new location for the bookmark
      * @param {Response} res Represents response to client, including status
      * on whether deleting the like was successful or not
      */
       userMovesBookmarkToAnotherFolder = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userMovesBookmarkToAnotherFolder(req.params.bid, req.body)
           .then(bookmark => res.json(bookmark));
 };