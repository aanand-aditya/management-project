import mongoose from 'mongoose';
import {connect} from "../../lib/connection"
let Schema = mongoose.Schema;

var studentSchema = Schema({
  name: String,
  dob: String,
  address:{
  	street: String,
  	city: String,
  	state: String,
  	pin: Number
  },
  subjects: [Schema.Types.ObjectId]
});

export default mongoose.model("Student",studentSchema);
