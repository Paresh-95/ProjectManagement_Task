const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    priority:{
        type:String,
        required:true,
        enum:['Low','Moderate','High']
    },
    dueDate:{
        type:Date
    },
    status:{
        type:String,
        enum:['Backlog','To-Do','In-Progress','Done'],
        default:'To-Do'
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    assignedTo:[{
        type:String,
    }],
    checklist:[{
        item:{
            type:String,
            required:true,
        },
        completed:{
            type:Boolean,
            default:false,
        }
    }],
    isShared:{
        type:Boolean,
        default:false
    } 

    
},{
    timestamps:true
})

module.exports = mongoose.model('Task',TaskSchema);