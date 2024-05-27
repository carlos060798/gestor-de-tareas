import { useForm } from "react-hook-form";
import ErrorMensaje from "../Error.mensaje";
import { AuthFormData} from "../../types";
import { Link } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { login } from "../../api/user";
import { toast } from "react-toastify";

export default function LoginView() {
  const initialValues:AuthFormData = {
    email: '',
    password: '',
  };
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });


   const {mutate} = useMutation({

    mutationFn: login,
   
    onError: (error) => {
      toast.error(error.message)

    },
    onSuccess: () => {
      toast.success('Bienvenido a la plataforma')},
  
  })
  const handleLogin = (formData: AuthFormData) => { 
    mutate(formData);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Acceso a la plataforma
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6"
        noValidate
      >
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email 
          </label>
          <div className="mt-2">
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
            <ErrorMensaje>{errors.email.message}</ErrorMensaje>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            />
          </div>
          {errors.password && (
            <ErrorMensaje>{errors.password.message}</ErrorMensaje>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Iniciar sesión
          </button>
        </div>
      </form>

      <p className="text-gray-500 mt-4 text-center">
        ¿No tienes una cuenta?{' '}
        <Link to="/auth/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
          Registrate
        </Link>
      </p>
    </div>
  );
}