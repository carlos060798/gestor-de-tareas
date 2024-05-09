import {z} from 'zod';

// para manehar el tipado personalizado de los datos que se reciben de la API

// Project  types

export const projectShema= z.object({   
_id: z.string(),
projectName : z.string(),
clientName : z.string(),
description: z.string(),
})

export const dashboardProjectShema= z.array(
    projectShema.pick({
        _id: true,
        projectName : true,
        clientName : true,
        description: true,
    })
    

)
export  type Project = z.infer<typeof projectShema>
export  type ProjectFormData= Pick<Project,'clientName' | 'projectName'| 'description' >


