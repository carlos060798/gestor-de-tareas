import  {request, Request, Response} from 'express';
import Project from '../Models/Project';
import Task from '../Models/Task';



export  class  TaskController{

  static async createTask(req: Request, res: Response){
    const{projecid}=req.params
    
    const project = await Project.findById(projecid)
    console.log(project);
   if(!project){
      return res.status(404).json({message: 'Proyecto no encontrado'});
   }


    try {
    
      const task = new Task(req.body);
    console.log(task);
      console.log(project);
      task.project = project._id;
      await task.save();
      return res.status(201).json(task);
      
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  }

}