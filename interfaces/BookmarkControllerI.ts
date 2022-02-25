import {Request, Response} from "express";

export default interface BookmarkControllerI {
    userBookmarksTuit (req: Request, res: Response): void;
    userUnbookmarksTuit (req: Request, res: Response): void;
    userViewsListOfBookmarkedTuits (req: Request, res: Response): void;
    userBookmarksTuitUnderFolder (req: Request, res: Response): void;
    userMovesBookmarkToAnotherFolder(req: Request, res: Response): void;
};