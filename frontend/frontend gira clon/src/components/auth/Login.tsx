import { useForm } from "react-hook-form";
import ErrorMensaje from "../Error.mensaje";
import { AuthFormData} from "../../types";
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { login } from "../../api/user";
import { toast } from "react-toastify";
import { LockClosedIcon } from "@heroicons/react/24/outline";

export default function LoginView() {
  const initialValues:AuthFormData = {
    email: '',
    password: '',
  };
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });
 const navigate = useNavigate();

   const {mutate} = useMutation({

    mutationFn: login,
   
    onError: (error) => {
      toast.error(error.message)


    },
    onSuccess: () => {
      toast.success('Bienvenido a la plataforma'),
      navigate('/dasbord')},
  
  })
  const handleLogin = (formData: AuthFormData) => { 
    mutate(formData);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="flex justify-center mb-8">
          <LockClosedIcon className="h-12 w-12 text-blue-500" />
        </div>
        <h2 className="text-center text-xl font-bold text-gray-900 mb-4">
          Inicia sesión para continuar
        </h2>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Introduce tu correo electrónico
            </label>
            <div className="mt-1">
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                {...register("email", {
                  required: "El Email es obligatorio",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail no válido",
                  },
                })}
              />
            </div>
            {errors.email && (
              <ErrorMensaje >{errors.email.message}</ErrorMensaje >
            )}
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="text-sm">
                <Link to="/auth/Newpasswordemail" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-1">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                {...register("password", {
                  required: "El Password es obligatorio",
                })}
              />
            </div>
            {errors.password && (
              <ErrorMensaje >{errors.password.message}</ErrorMensaje >
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continuar
            </button>
          </div>

         
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          ¿No puedes iniciar sesión?{' '}
          <Link to="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
            Crear una cuenta
          </Link>
        </p>
      </div>
    </div>)
 
}