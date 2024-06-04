
import { Request, Response } from 'express';
import User  from '../Models/User';
import Project from '../Models/Project';
export class TeamMember{

    static async findMember(req: Request, res: Response){
        const {email}=req.body
        try{
            const user= await User.findOne({email}).select('id email name')
            if(!user){
                res.status(404).json({message: "usuario no encontrado"})
            }

            res.status(200).json(user)
        } catch(error){
            res.status(500).json({message: "error al buscar el usuario"})

        }
    }

    static async addTeamMember(req: Request, res: Response) {
        try {
            const { id } = req.body;
            const { projectid } = req.params;
    
            // Busca el usuario por ID
            const user = await User.findById(id).select('id');
           
            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
    
            // Busca el proyecto por ID
            const project = await Project.findById(projectid);
            if (!project) {
                return res.status(404).json({ message: "Proyecto no encontrado" });
            }
    
            // Valida que el usuario no esté ya en el equipo
            if (project.team.some(team => team.toString() === user.id.toString())) {
                return res.status(400).json({ message: "Usuario ya es miembro del proyecto" });
            }
    
            // Añade el usuario al equipo
            project.team.push(user.id);
            await project.save();
            return res.status(200).json({ message: "Usuario agregado al proyecto" });
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al agregar el usuario al proyecto" });
        }
    }
    static async getTeamMembers(req: Request, res: Response) {
        const { projectid } = req.params;
      
        try {
          const project = await Project.findById(projectid).populate({
            path: 'team',
            select: 'id email name'
          });
      
          if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
          }
      
          res.json(project.team);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error al obtener los miembros del equipo' });
        }
      }

      static async deleteTeamMember(req: Request, res: Response) {
        
        const { projectid,id } = req.params;
    
        try {
            const project = await Project.findById(projectid);
            
            if (!project) {
                return res.status(404).json({ message: "Proyecto no encontrado" });
            }
    
            project.team = project.team.filter(member => member && member.toString() !== id.toString());
    
            await project.save();
            res.status(200).json({ message: "Usuario eliminado del proyecto" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al eliminar el usuario del proyecto" });
        }
    }
}