
/**
 * @file Implements mongoose model to CRUD
 * documents in the following collection
 */
 import mongoose from "mongoose";
 import FollowingTopicSchema from "./FollowingTopicSchema";
 
 /**
  * Model based on user schema.
  */
 const FollowingTopicModel = mongoose.model('FollowingTopicModel', FollowingTopicSchema);
 export default FollowingTopicModel;