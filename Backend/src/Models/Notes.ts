import   {   Schema , Document, Types  }   from   'mongoose' ;
import mongoose from 'mongoose';
    
export interface INote extends Document {
    content: string;
    createdby: Types.ObjectId;
    task: Types.ObjectId;
}

const NoteSchema: Schema = new Schema({
    content: { type: String, required: true },
    createdby: { type: Types.ObjectId, ref: 'User' },
    task: { type: Types.ObjectId, ref: 'Task' }
},

    { timestamps: true });  
    


const Note = mongoose.model<INote>('Note', NoteSchema);

export default Note;
     