import mongoose, {Schema} from "mongoose";

/**
 * Schema for a user following a topic
 */
const FollowingTopicSchema = new mongoose.Schema({
   profile: {type: Schema.Types.ObjectId, ref: "UserModel"},
   following: {type: Schema.Types.ObjectId, ref: "TopicModel"},
}, {collection: 'followingTopics'});
export default FollowingTopicSchema;