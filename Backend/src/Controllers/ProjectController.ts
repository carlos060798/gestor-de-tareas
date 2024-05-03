import { Request, Response } from 'express';
import Project from '../Models/Project';
export  class ProjectController{
 

   
    static createProject= async (req: Request, res: Response)=>{
        const project= new Project (req.body);
        try {
        await project.save();
        res.json({ status:200 ,
            msg: 'Project saved successfully',
            project: project }); 
        } catch (error) {
            res.json({ status:400 ,
                msg: 'Error saving project',
                error: error }); 
        }
    }
    static getProject= async (req: Request, res: Response)=>{
        
        res.json({ status:200 ,
            msg: 'Project saved successfully',
             });      
    }


    static updateProject= async (req: Request, res: Response)=>{
        res.send("Update Project");
    }

    static deleteProject= async (req: Request, res: Response)=>{
        res.send("Delete Project");
    }
}