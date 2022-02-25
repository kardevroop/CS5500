import mongoose, {Schema} from "mongoose";

/**
 * Schema for a user foolowing another user
 */
const FollowingSchema = new mongoose.Schema({
   profile: {type: Schema.Types.ObjectId, ref: "UserModel"},
   following: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: 'following'});
export default FollowingSchema;