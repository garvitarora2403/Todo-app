const mongoose=require("mongoose")

const todoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        enum:["low","medium","high"],
        default:"medium"
    },
    completed:{
        type:String,
        enum:["yes","no"],
        default:"no"
    }
},{timestamps:true})

const Todo=mongoose.model('todo',todoSchema)

module.exports=Todo;
