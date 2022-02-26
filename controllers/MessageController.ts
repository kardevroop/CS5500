/**
 * @file Controller RESTful Web service API for messages resource
 */
 import {Express, Request, Response} from "express";
 import MessageDao from "../daos/MessageDao";
 import MessageControllerI from "../interfaces/MessageControllerI";
 
 /**
  * @class MessageController Implements RESTful Web service API for messages resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>POST /api/users/messages/send to send a message between users
  *     </li>
  *     <li>GET /api/users/:uid/messages/sent to retrieve all messages sent by a user
  *     </li>
  *     <li>GET /api/users/:uid/messages/received to retrieve all messages received by a user
  *     </li>
  *     <li>GET /api/users/:uid/messages/receivedFrom/:fromUid to retrieve all messages received 
  *     by a user from another user
  *     </li>
  *      <li>DELETE /api/users/messages/delete/:mid to delete a message
  *     </li>
  *     <li>PUT /api/users/messages/edit/:mid to edit a message
  *     </li>
  * </ul>
  * @property {MessageDao} MessageDao Singleton DAO implementing likes CRUD operations
  * @property {MessageController} MessageController Singleton controller implementing
  * RESTful Web service API
  */
 export default class MessageController implements MessageControllerI {
     private static messageDao: MessageDao = MessageDao.getInstance();
     private static messageController: MessageController | null = null;
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return TuitController
      */
     public static getInstance = (app: Express): MessageController => {
         if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
             app.post("/api/users/messages/send", MessageController.messageController.sendMessage);
             app.get("/api/users/:uid/messages/sent", MessageController.messageController.viewAllSentMessages);
             app.get("/api/users/:uid/messages/received", MessageController.messageController.viewAllReceivedMesssages);
             app.get("/api/users/:uid/messages/received/:fromUid", MessageController.messageController.viewAllMessageFromSingleUser);
             app.delete("/api/users/messages/delete/:mid/", MessageController.messageController.deleteMessage);
             app.put("/api/users/messages/edit/:mid", MessageController.messageController.editMessage);
         }
         return MessageController.messageController;
     }
 
     private constructor() {}
 
     /**
      * Creates a message between two users
      * @param {Request} req Represents request from client, including the body
      * of the message object containing sender and receiver details
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the message objects
      */
      sendMessage = (req: Request, res: Response) =>
     MessageController.messageDao.sendMessage(req.body)
             .then(msg => res.send(msg));
 
     /**
      * Retrieves all messages sent by a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user 
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the messages objects
      */
      viewAllSentMessages = (req: Request, res: Response) =>
     MessageController.messageDao.viewAllSentMessages(req.params.uid)
             .then(likes => res.json(likes));
 
     /**
      * Retrieves all messages received by a user from the database
      * @param {Request} req Represents request from client, including the
      * path parameters uid the user 
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the messages objects
      */
      viewAllReceivedMesssages = (req: Request, res: Response) =>
     MessageController.messageDao.viewAllReceivedMesssages(req.params.uid)
             .then(likes => res.json(likes));

        /**
         * Retrieves all messages received by a user from a  certain user from the database
        * @param {Request} req Represents request from client, including the
        * path parameters uid and fromUid representing the user who received messages
        * and the user who sent the messages respectively.
        * @param {Response} res Represents response to client, including the body formatted as
        * JSON arrays containing the messages objects
        */
        viewAllMessageFromSingleUser = (req: Request, res: Response) =>
          MessageController.messageDao.viewAllMessageFromSingleUser(req.params.uid, req.params.fromUid)
                  .then(status => res.json(status));

         /**
      * @param {Request} req Represents request from client, including the
      * path parameter mid representing the message to be deleted
      * @param {Response} res Represents response to client, including status
      * on whether deleting the message was successful or not
      */
    deleteMessage = (req: Request, res: Response) =>
          MessageController.messageDao.deleteMessage(req.params.mid)
                  .then(status => res.send(status));

             /**
      * @param {Request} req Represents request from client, including the
      * path parameters mid representing the message to be edited and the body
      * of the new message
      * @param {Response} res Represents response to client, including status
      * on whether editing the message was successful or not
      */
    editMessage = (req: Request, res: Response) =>
      MessageController.messageDao.editMessage(req.params.mid, req.body)
              .then(status => res.json(status));
 };