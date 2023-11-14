import mongoose from "mongoose";
const Student = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rollno:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    classs:{
        type:String,
        required:true
    },
    isPresent:{
        type:Boolean,
        required:true
    }
})
export default mongoose.model('student',Student);