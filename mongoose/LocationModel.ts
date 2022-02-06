import mongoose from "mongoose";
import LocationSchema from "./LocationSchema";
const LocationModel = mongoose.model('LocationModel', LocationSchema);
export default LocationModel;