import { isAxiosError } from "axios";
import api from "../lib/axios";
import { NoteFormData } from '../types/index';


type NoteApi = {
    formdata: NoteFormData
    projectId: string
    taskId: string
    noteId?: string
    

}


export const createNote = async ({formdata, projectId, taskId}: NoteApi) => {
    try {
        const {data} = await api.post(`/projects/${projectId}/tasks/${taskId}/notes`, formdata)
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            return error.response?.data
        }
    }


}
export const getNotes = async (projectId: string, taskId: string) => {
    try {
        const {data} = await api.get(`/projects/${projectId}/tasks/${taskId}/notes`)
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            return error.response?.data
        }
    }
}
export const deleteNote= async ({projectId,taskId,noteId}: NoteApi) => {
    console.log({projectId,taskId,noteId})
    try {
        const {data} = await api.delete(`/projects/${projectId}/tasks/${taskId}/notes/${noteId}`)
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            return error.response?.data
        }
    }
}

export const updateNote = async ({formdata, projectId, taskId}: NoteApi) => {
    try {
        const {data} = await api.put(`/projects/${projectId}/tasks/${taskId}/notes`, formdata)
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            return error.response?.data
        }
    }
}
