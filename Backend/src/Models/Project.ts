import mongoose, {
  Document,
  Schema,
  PopulatedDoc,
  Types,
  ObjectId,
} from "mongoose";
import { ITask } from "./Task";

//  Schema for Project
export interface IProject extends Document {
  projectName: string;
  clientName: string;
  description: string;
  tasks: PopulatedDoc<ITask & Document>[];
}

const ProjectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
    trim: true,
  },
  clientName: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  tasks: [{ type: Types.ObjectId, ref: "Task" }],
},{
    timestamps: true
});

const Project = mongoose.model<IProject>("Project", ProjectSchema);
export default Project;
