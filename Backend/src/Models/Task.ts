import mongoose, { Document, Schema,Types} from "mongoose";
import Project from "./Project";


// status  of the task

const taskStatus={
    PENDING: 'PENDING',
    ON_HOLD: 'ON_HOLD',
    IN_PROGRESS: 'INPROGRESS',
    UNDER_REVIEW: 'UNDER_REVIEW',

    COMPLETED: 'COMPLETED'

}  as const  


export  type TaskStatus = typeof taskStatus[keyof typeof taskStatus]


//  Schema for Project 
export interface ITask extends Document {
    name: string;
    description: string;
    project: Types.ObjectId
    status: TaskStatus
}


const TaskSchema = new Schema({
    name: {
        type: String, 
        required: true,
        trim: true
    },
    description: { type: String, 
        required: true},
     project:{
            type: Types.ObjectId,
            ref: 'Project',
            required: true

        },
 

    status: {
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING

    },
    
    

},
{
    timestamps: true
}

)


const Task= mongoose.model<ITask>('Task', TaskSchema);
export default Task