import mongoose, {Schema} from "mongoose";
import UserSchema from "../mongoose/UserSchema";

/**
 * Schema for a tuit.
 */
const TuitSchema = new mongoose.Schema({
   tuit: {type: String, required: true},
   postedOn: {type: Date, default: Date.now},
   postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: 'tuits'});
export default TuitSchema;