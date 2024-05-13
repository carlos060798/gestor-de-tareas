import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Project, TaskFormData } from "../types";

type  TaskApi={
    FormData: TaskFormData,
    projectid: Project['_id'],
}

export async function createTask({ FormData,projectid
} : Pick<TaskApi,'FormData' | 'projectid'>)  {
  try {
    console.log(FormData)
    const { data } = await api.post<string>( 
        `projects/${projectid}/tasks`

    , FormData);
    console.log(data);
    return data
  } catch (err) {
    console.error(err   )
    if(isAxiosError(err) && err.response){
      throw new Error(err.response?.data.error)
    }
  }
}