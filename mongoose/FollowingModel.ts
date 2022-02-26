
/**
 * @file Implements mongoose model to CRUD
 * documents in the following collection
 */
import mongoose from "mongoose";
import FollowingSchema from "./FollowingSchema";

/**
 * Model based on following schema.
 */
const FollowingModel = mongoose.model('FollowingModel', FollowingSchema);
export default FollowingModel;