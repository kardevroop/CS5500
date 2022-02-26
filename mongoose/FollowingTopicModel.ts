
/**
 * @file Implements mongoose model to CRUD
 * documents in the following topic collection
 */
 import mongoose from "mongoose";
 import FollowingTopicSchema from "./FollowingTopicSchema";
 
 /**
  * Model based on following topic schema.
  */
 const FollowingTopicModel = mongoose.model('FollowingTopicModel', FollowingTopicSchema);
 export default FollowingTopicModel;