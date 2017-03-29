import mongoose from 'mongoose';
import {connect} from "../../lib/connection"

var facultySchema = mongoose.Schema({
  name: String,
  subject: []
});

export default mongoose.model("Faculty",facultySchema);
