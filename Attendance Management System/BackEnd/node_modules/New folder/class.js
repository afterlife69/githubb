import mongoose from "mongoose";
const Classs = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    cid:{
        type:String,
        required:true
    },
    teachers:{
        type:String
    },
    students:{
        type:Array,
        required:true
    },
    avail:{
        type:Boolean,
        required:true
    }
})
export default mongoose.model('class',Classs);