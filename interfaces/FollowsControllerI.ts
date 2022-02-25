import {Request, Response} from "express";

export default interface FollowsControllerI {
    follow (req: Request, res: Response): void;
    unfollow (req: Request, res: Response): void;
    findFollowingList (req: Request, res: Response): void;
    findFollowedBy (req: Request, res: Response): void;
};