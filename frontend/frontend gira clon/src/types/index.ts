import {z} from 'zod';

// para manehar el tipado personalizado de los datos que se reciben de la API

// User types

 const   authShema= z.object({

   
    name: z.string(),
    email: z.string(),
   password: z.string(),
   password_confirmation: z.string(),
 });

 type Auth=  z.infer<typeof authShema>
 export type AuthFormData= Pick<Auth, 'email' | 'password' >
 export type RegisterFormData= Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation' >
 
// *type user*

export const userShema= authShema.pick({
    name: true,
    email: true,
    
}).extend({
    _id: z.string(),
   
})
export type User= z.infer<typeof userShema>


// Project  types

export const projectShema= z.object({   
_id: z.string(),
projectName : z.string(),
clientName : z.string(),
description: z.string(),
manager: z.string(
  userShema.pick({_id: true})
),
})

export const dashboardProjectShema= z.array(
    projectShema.pick({
        _id: true,
        projectName : true,
        clientName : true,
        description: true,
        manager: true,
    })
    

)
export  type Project = z.infer<typeof projectShema>
export  type ProjectFormData= Pick<Project,'clientName' | 'projectName'| 'description' >


// Tareas  


export const TaskStatusShema= z.enum(['PENDING','ON_HOLD','INPROGRESS','UNDER_REVIEW','COMPLETED'])
export type TaskStatus= z.infer<typeof TaskStatusShema>

export const taskShema= z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: TaskStatusShema,
    createdAt: z.string(),
    updatedAt: z.string(),


})


export type  task = z.infer<typeof taskShema>
export  type TaskFormData= Pick<task,'name' | 'description' >  


// tipos de datos para el equipo

const  teamMemberShema = userShema.pick({
  name: true,
    email: true,
    _id: true,
})

export type TeamMember= z.infer<typeof teamMemberShema>

export type TeamMemberForm= Pick<TeamMember, 'email'>

