/**
 * @file Implements mongoose model to CRUD
 * documents in the topics collection
 */
 import mongoose from "mongoose";
 import TopicSchema from "./TopicSchema";
 
 /**
  * Model based on topic schema.
  */
 const TopicModel = mongoose.model('TopicModel', TopicSchema);
 export default TopicModel;