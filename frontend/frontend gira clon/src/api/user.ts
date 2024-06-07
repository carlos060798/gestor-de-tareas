import api from "../lib/axios";
import {RegisterFormData, AuthFormData, User} from '../types/index'
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
    console.log(response.data)
    localStorage.setItem('token', response.data)
    
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


export const forgotPassword = async (email: string) => {
  console.log(email)
  try {
    const response = await api.post("/auth/emailpassword", email);
    console.log('response', response.data)
    return response.data;
  } catch (error) {
    const err = error as AxiosError
    console.log(err.response?.data)
    throw new Error(err.response?.data?.message || 'Error de autenticación');
  }
};


export  const  tokennewPassword = (token: string) => {
  console.log(token)
  try {
    const response = api.post("/auth/confirm-token-password", {token});
    console.log(response)
    return response;
  } catch (error) {
    const err = error as AxiosError
    console.log(err.response?.data)
    throw new Error(err.response?.data?.message || 'Error en la validacion del token');
  }
}

export const newPassword = async (dataform) => {
  console.log(dataform)
  const {password, token} = dataform;
  try {
    const response = await api.post(`/auth/change-password/${token}`, {password});
    return response.data;
  } catch (error) {
    const err = error as AxiosError
    console.log(err.response?.data)
    throw new Error(err.response?.data?.message || 'Error en la validacion del token');
  }
}

export const getUser = async () => {
  try {
    const response = await api.get<User>("/auth/user");
    return response.data;
  } catch (error) {
    console.error(error)
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await api.get<User>(`/auth/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export  const updateUser = async (data: User) => {
  try {
    const response = await api.put("/auth/profile", data);
    return response.data;
  } catch (error) {
    console.error(error)
  }
} 


export const changePassword = async (data) => {
  try {
    const response = await api.put("/auth/update-password", data);
    return response.data;
  } catch (error) {
    console.error(error)
  }
}
