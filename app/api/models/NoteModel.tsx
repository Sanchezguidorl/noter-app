import mongoose, { Schema } from "mongoose";



const NoteSchema= new Schema({
    title:{
        type:String, maxlength:80, minlength:5
    }, date:{
        type: Date, default: Date.now()
      }, content:String
})

const NoteModel= mongoose.model('Note', NoteSchema);

export default NoteModel;