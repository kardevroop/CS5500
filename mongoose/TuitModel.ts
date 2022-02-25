
/**
 * @file Implements mongoose model to CRUD
 * documents in the tuits collection
 */
import mongoose from "mongoose";
import TuitSchema from "./TuitSchema";

/**
 * Model based on a tuit schema.
 */
const TuitModel = mongoose.model('TuitModel', TuitSchema);
export default TuitModel;