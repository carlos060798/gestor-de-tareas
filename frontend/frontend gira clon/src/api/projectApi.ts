import { isAxiosError } from "axios";
import api from "../lib/axios";
import { ProjectFormData } from "../types";

export async function createProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post("/projects", formData);
    return data
  } catch (err) {
    if(isAxiosError(err) && err.response){
      throw new Error(err.response?.data.error)
    }
  }
}
