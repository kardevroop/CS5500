import mongoose, {Schema} from "mongoose";
import UserSchema from "../mongoose/UserSchema";

/**
 * Schema for a tuit.
 */
const TuitSchema = new mongoose.Schema({
   tuit: {type: String, required: true},
   postedOn: {type: Date, default: Date.now},
   postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
   stats: {
      replies: {type: Number, default: 0},
      retuits: {type: Number, default: 0},
      likes: {type: Number, default: 0},
      dislikes: {type: Number, default: 0}
    }
  
}, {collection: 'tuits'});
export default TuitSchema;