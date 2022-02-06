import mongoose from "mongoose";
const LocationSchema = new mongoose.Schema({
   latitude: Number,
   longitude: Number
}, {collection: 'location'});
export default LocationSchema;