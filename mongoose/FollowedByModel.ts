
/**
 * @file Implements mongoose model to CRUD
 * documents in the followedBy collection
 */
import mongoose from "mongoose";
import FollowedBySchema from "./FollowedBySchema";

/**
 * Model based on followed By schema.
 */
const FollowedByModel = mongoose.model('FollowedByModel', FollowedBySchema);
export default FollowedByModel;