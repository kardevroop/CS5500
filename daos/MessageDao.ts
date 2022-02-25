import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/MessageModel";
import Message from "../models/Message";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Message
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    /**
     * Returns Singelton instance of the class
     * @returns an object instance
     */
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}

    /**
     * Retrieve all sent messages
     * @param uid The user id
     * @returns list of messages
     */
    viewAllSentMessages = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .populate("to")
            .exec();
    
    /**
     * Retrieve all received messages
     * @param uid The user id
     * @returns list of received messages
     */
    viewAllReceivedMesssages = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to: uid})
            .populate("from")
            .exec();

    /**
     * Return all messages received from a particular user
     * @param uid The receiver
     * @param fromUid The sender
     * @returns list of received messages from sender
     */
    viewAllMessageFromSingleUser = async (uid: string, fromUid: string): Promise<Message[]> =>
            MessageModel
                .find({to: uid, from: fromUid})
                .select("message")
                .exec();

    /**
     * Send a new message
     * @param message The message object
     * @returns Promise when the message is created
     */
    sendMessage = async (message: Message): Promise<any> =>
        MessageModel.create(message);


    /**
     * Delete a pre-existing message
     * @param mid The message Id
     * @returns promise containing the status of the delete operation
     */
    deleteMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});

    /**
     * Update the message text
     * @param mid The message id
     * @param message The new text
     * @returns the update status
     */
    editMessage = async (mid: string, message: Message): Promise<any> =>
        MessageModel.updateOne({_id: mid}, {$set: message});
}