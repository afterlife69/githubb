import mongoose from "mongoose";
const Teacher = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tid:{
        type:String,
        required:true
    },
    classs:{
        type:String,
        required:true
    },
    avail:{
        type:Boolean,
        required:true
    }
})
export default mongoose.model('teacher',Teacher);