import { Request, Response } from 'express';
import { INote } from '../Models/Notes';
import Note from '../Models/Notes';
import { Types } from 'mongoose';

type NoteParams = { noteid: Types.ObjectId};
export class noteControllers {
    static  createNote = async (req: Request<
        {},{},INote
        >, res: Response) => {

        try {
           
            const { content } = req.body;
            const note = new Note();
            note.content = content;
            note. createdby= req.user._id;
            note.task = req.task._id 
            req.task.notes.push(note._id);
           
          await Promise.all([req.task.save(),note.save()]);

            res.status(201).json("Nota creada correctamente")
        } catch (error) {
            res.status(500).json({ message: "Error creando la nota" });
        }
        }

    static getNotes = async (req: Request, res: Response) => {
        try {
         /*  const notes = await Note.find({ task: req.task._id }).populate("createdby", "name"); */
         const notes = await Note.find({ task: req.task._id }).populate("createdby", "name _id");
         res.status(200).json(notes);
        } catch (error) {
            res.status(500).json({ message: "Error obteniendo las notas" });
        }
        
    }

    static getNoteById = async (req: Request, res: Response) => {
        try {
            const note = await Note.findById(req.params.noteid);
            res.status(200).json(note);
        } catch (error) {
            res.status(500).json({ message: "Error obteniendo la nota" });
        }
    }

    static deleteNote = async (req: Request<NoteParams>, res: Response) => {
        try {
            const {noteid} = req.params; 
            const note = await Note.findById(noteid);
            if (!note) {
                return res.status(404).json({ message: "Nota no encontrada" });
            }

            if (note.createdby.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: "No tienes permiso para eliminar esta nota" });
            }
             
            req.task.notes = req.task.notes.filter((note) => note.toString() !== noteid.toString());

            await Promise.all([req.task.save(), note.deleteOne()]);
            res.status(200).json({ message: "Nota eliminada correctamente" });
        } catch (error) {
            res.status(500).json({ message: "Error eliminando la nota" });
        }
} 
}