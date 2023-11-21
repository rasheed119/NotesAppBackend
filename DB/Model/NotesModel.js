import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
    required: true,
  },
  user_id : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "user",
    required : true
  }
},{
  timestamps :true
});

export const NotesModel = mongoose.model("notes", NotesSchema);
