import { Request, Response } from "express";
import Task from "../Models/Task";

export class TaskController {
  static async createTask(req: Request, res: Response) {
    try {
      const task = new Task(req.body);
      task.project = req.project._id;
      req.project.tasks.push(task.id);
      await Promise.allSettled([task.save() ,req.project.save()])
      return res.status(201).json(task);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getProjectTasks(req: Request, res: Response) {
    try {
      const tasks = await Task.find({ project: req.project._id }).populate("project");
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getTaskById(req: Request, res: Response) {
    const  { taskid } = req.params;

    try {
    const  { taskid } = req.params;
   const task = await Task.findById(taskid)
    if(!task) return res.status(404).json({message: "Task not found"})
    if(task.project.toString() !== req.project.id) return res.status(401).json({message: "Unauthorized"})
    return res.status(200).json(task)

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
