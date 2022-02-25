import {Request, Response} from "express";

export default interface MessageControllerI {
    sendMessage (req: Request, res: Response): void;
    viewAllSentMessages (req: Request, res: Response): void;
    viewAllReceivedMesssages (req: Request, res: Response): void;
    viewAllMessageFromSingleUser(req: Request, res: Response): void;
    deleteMessage (req: Request, res: Response): void;
    editMessage (req: Request, res: Response): void;
};