/**
 * @file Implements mongoose model to CRUD
 * documents in the users collection
 */
 import mongoose from "mongoose";
 import TopicSchema from "./TopicSchema";
 
 /**
  * Model based on user schema.
  */
 const TopicModel = mongoose.model('TopicModel', TopicSchema);
 export default TopicModel;