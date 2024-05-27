import api from "../lib/axios";
import {RegisterFormData, AuthFormData} from '../types/index'
import { AxiosError} from 'axios';


export const createAcount = async (data: RegisterFormData) => {
  try {
    const response = await api.post("auth/acount-create", data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err.response?.data;
  }
};

export const login = async (data: AuthFormData) => {
  try {
    const response = await api.post("/auth/login", data);
    
    return response.data;
  } catch (error) {
    const err = error as AxiosError
    console.log(err.response?.data)
    throw new Error(err.response?.data?.message || 'Error de autenticación');
  }
};


export const confirmAcount = async (token: string) => {
  console.log(token)
  try {
    const response = await api.post("auth/confirm-token",  {token});
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error)
  }
};


export const requestEmailcode = async (email: string) => {
  try {
    const response = await api.post("/auth/new-token", email);
    return response.data;
  } catch (error) {
    return console.error(error)
  }
};