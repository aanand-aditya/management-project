import mongoose from 'mongoose';
import {connect} from "../../lib/connection"

var subjectSchema = mongoose.Schema({
  sub_name: String
});

export default mongoose.model("Subject",subjectSchema);
