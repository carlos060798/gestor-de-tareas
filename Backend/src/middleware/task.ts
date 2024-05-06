

import type { Request, Response, NextFunction } from "express";
import Task, { ITask } from "../Models/Task";

// esta funcion permite reescribir el type de forma global

declare global {
  namespace Express {
    interface Request {
      task: ITask;
    }
  }
}

export async function ValidateTaskExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { taskid } = req.params;

    const task = await Task.findById(taskid);

    if (!task) {
      return res.status(404).json({ message: "tarea no encontrada" });
    }
    req.task = task;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export async function taskBelongsToProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.task.project.toString() !== req.project.id.toString())
      return res.status(401).json({ message: "Accion no valida" });
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}