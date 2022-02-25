import mongoose from "mongoose";

/**
 * Schema for a topic
 */
const TopicSchema = new mongoose.Schema({
   topic: {type: String, required: true}
}, {collection: 'topics'});
export default TopicSchema;