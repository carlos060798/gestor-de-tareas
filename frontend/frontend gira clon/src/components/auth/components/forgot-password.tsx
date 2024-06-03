import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ErrorMensaje from "../../Error.mensaje";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../../api/user";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
  const initialValues= {
    email: ''
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
 
    const { mutate } = useMutation( {
        mutationFn: forgotPassword,
        onError: (error) => {
         toast.error(error.response.data.message)
        },
        onSuccess: () => {
        toast.success('Se ha enviado un correo con las instrucciones para restablecer tu contraseña')
        reset()
        }
    })
  const handleForgotPassword = (formData) => {
    mutate(formData)
  }

  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg space-y-6">
      <h1 className="text-3xl font-black text-center text-blue-500">Recuperar Contraseña</h1>
      <p className="text-lg font-light text-gray-700 text-center">
        Coloca tu e-mail para recibir{' '}
        <span className="text-blue-600 font-bold">instrucciones</span>
      </p>

      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-6"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <label
            className="font-medium text-lg text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            {...register('email', {
              required: 'El Email de registro es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'E-mail no válido',
              },
            })}
          />
          {errors.email && (
            <ErrorMensaje>{errors.email.message}</ErrorMensaje>
          )}
        </div>

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/login"
          className="text-center text-blue-600 font-normal hover:underline"
        >
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>

        <Link
          to="/auth/register"
          className="text-center text-blue-600 font-normal hover:underline"
        >
          ¿No tienes cuenta? Crea una
        </Link>
      </nav>
    </div>
  </div>
  )
 
}