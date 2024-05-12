import { isAxiosError } from "axios";
import api from "../lib/axios";
import { ProjectFormData } from "../types";
import { dashboardProjectShema } from "../types";

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

export async function getProjects() {
  try {
    const { data } = await api.get("/projects");
    const  response=  dashboardProjectShema.safeParse(data);
    if(response.success){
      return response.data
      
    }
  
  } catch (err) {
    if(isAxiosError(err) && err.response){
      throw new Error(err.response?.data.error)
    }
  }

}
export  async function getProjectById(id:string) {
  try {
    const { data } = await api.get(`/projects/${id}`);
    console.log(data);
    return data
  } catch (err) {
    if(isAxiosError(err) && err.response){
      throw new Error(err.response?.data.error)
    }
  }



}



export  async function  Actualizar(
  {dataUpdate,projectid}: {dataUpdate:ProjectFormData,projectid:string} ) {
  try {
    const { data } = await api.put(`/projects/${projectid}`,dataUpdate);
    console.log(data);
    return data
  } catch (err) {
    if(isAxiosError(err) && err.response){
      throw new Error(err.response?.data.error)
    }
  }



}

export  async function  deleteProject(id:string) {
  try {
    const { data } = await api.delete(`/projects/${id}`);
    console.log(data);
    return data
  } catch (err) {
    if(isAxiosError(err) && err.response){
      throw new Error(err.response?.data.error)
    }
  }
}