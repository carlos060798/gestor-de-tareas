import { isAxiosError,AxiosError} from "axios";
import api from "../lib/axios";
import { Project, task, TaskFormData } from "../types";

type TaskApi = {
  FormData: TaskFormData;
  projectid: Project["_id"];
  taskid: task["_id"];
  status: task["status"];
};

export async function createTask({
  FormData,
  projectid,
}: Pick<TaskApi, "FormData" | "projectid">) {
  try {
    console.log(FormData);
    const { data } = await api.post<string>(
      `projects/${projectid}/tasks`,

      FormData
    );
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    if (isAxiosError(err) && err.response) {
      throw new Error(err.response?.data.error);
    }
  }
}

export async function getTaskById({
  projectid,
  taskid,
}: Pick<TaskApi, "projectid" | "taskid">) {
  try {
    const url = `projects/${projectid}/tasks/${taskid}`;
    const { data } = await api.get<TaskFormData>(url);
    return data;
  } catch (err) {
    console.error(err);
    if (isAxiosError(err) && err.response) {
      throw new Error(err.response?.data.error);
    }
  }
}

export async function updateTask({
  FormData,
  projectid,
  taskid,
}: Pick<TaskApi, "FormData" | "projectid" | "taskid">) {
  try {
    const url = `projects/${projectid}/tasks/${taskid}`;
    const { data } = await api.put<string>(url, FormData);
    return data;
  } catch (error) {
    const err = error as AxiosError
    console.log(err.response?.data)
    throw new Error(err.response?.data?.message || 'Error en la validacion del token');
    
    }
  }


export async function deleteTask({
  projectid,
  taskid,
}: Pick<TaskApi, "projectid" | "taskid">) {
  try {
    const url = `projects/${projectid}/tasks/${taskid}`;
    const data = await api.delete<string>(url);

    return data;
  } catch (err) {
    console.error(err);
    if (isAxiosError(err) && err.response) {
      throw new Error(err.response?.data.error);
    }
  }
}



export async function changeStatus({
  status,
  projectid,
  taskid,
}: Pick<TaskApi, "status" | "projectid" | "taskid" >) {
  try {
    const url = `projects/${projectid}/tasks/${taskid}/status`;
    const { data } = await api.post<string>(url, { status });
    return data;
  } catch (err) {
    console.error(err);
    if (isAxiosError(err) && err.response) {
      throw new Error(err.response?.data.error);
    }
  }
}