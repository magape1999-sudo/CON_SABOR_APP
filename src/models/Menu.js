import mongoose from "mongoose"

const MenuSchema = new mongoose.Schema({

name:{
type:String,
required:true
},

price:{
type:Number,
required:true
},

description:{
type:String
},

createdAt:{
type:Date,
default:Date.now
}

})

export default mongoose.model("Menu",MenuSchema)