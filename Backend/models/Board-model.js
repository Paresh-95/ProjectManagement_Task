const mongoose = require("mongoose");


const BoardSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    members:[{
        type:String,
    }],
    tasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task"
    }]
},{
    timestamps:true
})

module.exports = mongoose.model("Board",BoardSchema);