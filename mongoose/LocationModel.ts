/**
 * @file Implements mongoose model to CRUD
 * documents in the location collection
 */

import mongoose from "mongoose";
import LocationSchema from "./LocationSchema";

/**
 * Location model based on the defined schema.
 */
const LocationModel = mongoose.model('LocationModel', LocationSchema);
export default LocationModel;