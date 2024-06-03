
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ErrorMensaje from "../../Error.mensaje";
import { useMutation } from '@tanstack/react-query';
import { requestEmailcode } from '../../../api/user';
import { toast } from "react-toastify";

export function RequestEmail() {
    const initialValues = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const handleRequestCode = (formData) => {
        mutate(formData)
        reset()
    }

    const{mutate} = useMutation({
        
        mutationFn: requestEmailcode,
        onError: (error) => {
            toast.error(error.message)},
        onSuccess: () => {
            toast.success('Código enviado con éxito')
        }
    })
   return(
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg space-y-6">
      <h1 className="text-4xl font-black text-center text-blue-500">Solicitar Código de Confirmación</h1>
      <p className="text-lg font-light text-gray-700 text-center">
        Coloca tu e-mail para recibir{' '}
        <span className="text-blue-500 font-bold">un nuevo código</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRequestCode)}
        className="space-y-6"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <label className="font-medium text-lg text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('email', {
              required: 'El Email de registro es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'E-mail no válido',
              },
            })}
          />
          {errors.email && <ErrorMensaje>{errors.email.message}</ErrorMensaje>}
        </div>

        <input
          type="submit"
          value="Enviar Código"
          className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold text-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
        />
      </form>

      <nav className="flex flex-col space-y-4">
        <Link to="/auth/login" className="text-center text-gray-500 font-normal hover:underline">
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>
        <Link to="/auth/forgot-password" className="text-center text-gray-500 font-normal hover:underline">
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </div>
  </div>
   )
   /* return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 
        p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg space-y-6">
                <h1 className="text-4xl font-black text-center text-blue-500">Solicitar Código de Confirmación</h1>
                <p className="text-lg font-light text-gray-700 text-center">
                    Coloca tu e-mail para recibir {''}
                    <span className="text-blue-500 font-bold">un nuevo código</span>
                </p>

                <form
                    onSubmit={handleSubmit(handleRequestCode)}
                    className="space-y-6"
                    noValidate
                >
                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-lg text-gray-700" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email de Registro"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            {...register("email", {
                                required: "El Email de registro es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "E-mail no válido",
                                },
                            })}
                        />
                        {errors.email && (
                            <ErrorMensaje>{errors.email.message}</ErrorMensaje>
                        )}
                    </div>

                    <input
                        type="submit"
                        value='Enviar Código'
                        className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold text-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
                    />
                </form>

                <nav className="flex flex-col space-y-4">
                    <Link to='/auth/login' className="text-center text-gray-500 font-normal hover:underline">
                        ¿Ya tienes cuenta? Iniciar Sesión
                    </Link>
                    <Link to='/auth/forgot-password' className="text-center text-gray-500 font-normal hover:underline">
                        ¿Olvidaste tu contraseña? Reestablecer
                    </Link>
                </nav>
            </div>
        </div>
    ); */
  
}

