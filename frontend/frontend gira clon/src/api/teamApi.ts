import { isAxiosError } from "axios";
import api from "../lib/axios";
import { TeamMemberForm } from "../types/index";


export const findMemberByemail = async ({
    projectid,
    formData,
}: {
    projectid: string;
    formData: TeamMemberForm;

}) => {
    try {
        const response = await api.post(`/projects/${projectid}/team/find`, formData )
        console.log( response.data)
        return response.data
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.message)
        }
        throw new Error('Error al crear el miembro del equipo')
    }
}



export const addTeamMember = async (
    {id, projectid}: {
        id: string;
        projectid: string;
    }
) => {
    try {
        const response = await api.post(`/projects/${projectid}/team`, {id} )
        console.log( response.data)
        return response.data
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.message)
        }
        throw new Error('Error al crear el miembro del equipo')
    }
}

export const getTeamMembers = async (
    {projectid}: {
        projectid: string;
    }
) => {
    try {
        const response = await api.get(`/projects/${projectid}/team`)
        console.log( response.data)
        return response.data
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.message)
        }
        throw new Error('Error al obtener los miembros del equipo')
    }
}

export const removeTeamMember = async (datadelete) => {
    console.log(datadelete)
    const {id, projectid} = datadelete


    try {
        const response = await api.delete(`/projects/${projectid}/team/${id}`)
        console.log( response.data)
        return response.data
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.message)
        }
        throw new Error('Error al eliminar el miembro del equipo')
    }
}
