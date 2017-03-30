import mongoose from 'mongoose';
import {connect} from "../../lib/connection"

let subjectSchema = mongoose.Schema({
  sub_name: String
});

export default mongoose.model("Subject", subjectSchema);
