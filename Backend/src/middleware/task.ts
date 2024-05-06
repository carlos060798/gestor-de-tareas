

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
