import mongoose from 'mongoose';
import {connect} from "../../lib/connection"
let Schema = mongoose.Schema;

let studentSchema = Schema({
  name: {
  	type: String,
  	required: true
  },
  dob: String,
  address: {
  	street: String,
  	city: String,
  	state: String,
  	pin: Number
  },
  subjects: [Schema.Types.ObjectId]
 },
 {timestamps: true}

);

studentSchema.index({'name': 1, 'dob': 1}, {unique: true});

export default mongoose.model("Student", studentSchema);
