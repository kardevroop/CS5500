import mongoose from "mongoose";
/**
 * Model for Location.
 */
const LocationSchema = new mongoose.Schema({

   /**
    * Latitutde of the location coordinate.
    */
   latitude: Number,

   /**
    * Longitude of the location coordinate.
    */
   longitude: Number
}, {collection: 'location'});
export default LocationSchema;