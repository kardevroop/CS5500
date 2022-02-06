import mongoose from "mongoose";
import UserSchema from "../mongoose/UserSchema";
const TuitSchema = new mongoose.Schema({
   tuit: {type: String, required: true},
   postedOn: {type: Date, default: Date.now},
   postedBy: UserSchema
}, {collection: 'tuits'});
export default TuitSchema;