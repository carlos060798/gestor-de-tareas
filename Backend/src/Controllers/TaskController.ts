import { Request, Response } from "express";
import Task from "../Models/Task";

export class TaskController {
  static async createTask(req: Request, res: Response) {
    try {
      const task = new Task(req.body);
      task.project = req.project._id;
      req.project.tasks.push(task.id);
      await Promise.allSettled([task.save(), req.project.save()]);
      return res.status(201).json(task);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getProjectTasks(req: Request, res: Response) {
    try {
      const tasks = await Task.find({ project: req.project._id }).populate(
        "project"
      );
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getTaskById(req: Request, res: Response) {
    const {taskid} = req.params
    try {
       const task = await Task.findById(taskid)
       if(!task) return res.status(404).json('Tareas no encontrada')
       if(task.project.toString() !== req.project.id) return res.status(401).json('tarea no pertenece al proyecto')
        return res.status(200).json(task)
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  

  
  }
  static async updateTask(req: Request, res: Response) {
    const { taskid } = req.params;
    try {
      if (req.task.project.toString() !== req.project.id)
        return res.status(401).json({ message: "Unauthorized" });
      req.task.name = req.body.name;
      req.task.description = req.body.description;
      await req.task.save();
      return res.status(200).json(" Task updated");
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async deleteTask(req: Request, res: Response) {
    const { taskid } = req.params;
    try {
      req.project.tasks = req.project.tasks.filter(
        (task) => task.toString() !== req.task.id.toString()
      );
      await Promise.allSettled([req.task.deleteOne(), req.project.save()]);

      return res.status(200).json({ message: "Task deleted" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async changeTaskStatus(req: Request, res: Response) {
    const { status } = req.body;
    try {
      req.task.status = status;
      await req.task.save();
      return res.status(200).json("Task status updated");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
