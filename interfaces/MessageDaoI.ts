import Message from "../models/Message";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface LikeDaoI {
    sendMessage (message: Message): Promise<any>;
    viewAllSentMessages (uid: string): Promise<Message[]>;
    viewAllReceivedMesssages (uid: string): Promise<Message[]>;
    viewAllMessageFromSingleUser(uid: string, fromUid: string): Promise<Message[]>
    deleteMessage (mid: string): Promise<any>;
    editMessage (mid: string, message: Message): Promise<any>
};