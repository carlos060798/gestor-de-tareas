import type { Request, Response, NextFunction } from "express";
import Project, { IProject } from "../Models/Project";

// esta funcion permite reescribir el type de forma global

declare global {
  namespace Express {
    interface Request {
      project: IProject;
    }
  }
}

export async function ValidateProjectExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { projecid } = req.params;

    const project = await Project.findById(projecid);

    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }
    req.project = project;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
