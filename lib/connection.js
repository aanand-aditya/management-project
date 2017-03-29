import mongoose from "mongoose";
export default function connect(cb){
  mongoose.connect('mongodb://localhost:54782/user', cb);
}
