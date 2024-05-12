import { Request, Response } from 'express';
import Project from '../Models/Project';
export class ProjectController {

    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body);
      
        try {
            await project.save();
            res.json({
                status: 200,
                msg: ' Proyecto Creado Correctamente ',
                project: project
            });
        } catch (error) {
            res.json({
                status: 400,
                msg: 'Error saving project',
                error: error
            });
        }
    }
    static getProjects = async (req: Request, res: Response) => {

        try {
            const projects = await Project.find({});
            res.json(projects);
        } catch (error) {
            res.json({
                status: 400,
                msg: 'Error fetching projects',
                error: error
            });
        }

    }

    static getProjectById = async (req: Request, res: Response) => {
        try {
            const project = await Project.findById(req.params.id).populate('tasks');
            res.json({
                status: 200,
                msg: 'Project fetched successfully',
                project: project
            });
        } catch (error) {
            res.json({
                status: 400,
                msg: 'Error fetching project',
                error: error
            });
        }
    }


    static updateProject = async (req: Request, res: Response) => {
        try {
            const project = await Project.findById(req.params.id, );

            if(!project) {
                return res.json({
                    status: 400,
                    msg: 'Project not found'
                });
            }
            project.projectName = req.body.projectName;
            project.clientName = req.body.clientName;
            project.description = req.body.description;
        await project.save();
            res.json({
                status: 200,
                msg: 'Project updated successfully',
                project: project
            });
        } catch (error) {
            res.json({
                status: 400,
                msg: 'Error updating project',
                error: error
            });
        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        try {
            const project = await Project.findByIdAndDelete(req.params.id);
            res.json({
                status: 200,
                msg: 'Project deleted successfully',
            });
        } catch (error) {
            res.json({
                status: 400,
                msg: 'Error deleting project',
                error: error
            });
        }
    }
}