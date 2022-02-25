import mongoose, {Schema} from "mongoose";
import Message from "../models/Message";
import User from "../models/User";

const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String, default: ""},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now}
}, {collection: "messages"});
export default MessageSchema;