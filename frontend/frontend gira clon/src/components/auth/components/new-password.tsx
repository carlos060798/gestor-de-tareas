import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { newPassword } from "../../../api/user";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function NewPasswordForm() {
  const initialValues = {
    password: '',
    password_confirmation: '',
  };

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
  const navigate = useNavigate();
  const params = useParams();
  const token = params.token || "";

  const { mutate } = useMutation({
    mutationFn: newPassword,
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: () => {
      toast.success('Contraseña cambiada exitosamente');
      reset();
      navigate(`/auth/login`);
    }
  });

  const handleNewPassword = (formData) => {
    const { password } = formData; // Solo enviamos el campo 'password' al backend
    mutate({ token, password });
  };

  const password = watch('password');

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex flex-col justify-center items-center p-5">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Establecer Nueva Contraseña</h1>
        <form onSubmit={handleSubmit(handleNewPassword)} className="space-y-6" noValidate>
          <div className="flex flex-col gap-4">
            <label className="font-medium text-lg">Nueva Contraseña</label>
            <input
              type="password"
              placeholder="Nueva Contraseña"
              className="w-full p-3 border border-gray-300 rounded"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres"
                }
              })}
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <label className="font-medium text-lg">Confirmar Contraseña</label>
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              className="w-full p-3 border border-gray-300 rounded"
              {...register("password_confirmation", {
                required: "La confirmación de la contraseña es obligatoria",
                validate: value => value === password || "Las contraseñas no coinciden"
              })}
            />
            {errors.password_confirmation && (
              <p className="text-red-600 text-sm">{errors.password_confirmation.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-400 hover:bg-teal-500
             text-white font-bold py-3 rounded transition duration-200"
          >
            Establecer Contraseña
          </button>
        </form>
        <nav className="mt-8 flex justify-center">
          <Link to='/auth/Newpasswordemail' className="text-gray-600 hover:text-fuchsia-400 transition duration-200">
            Solicitar un nuevo código
          </Link>
        </nav>
      </div>
    </div>
  );
}




/*import { useForm } from "react-hook-form";
import ErrorMensaje from "../../Error.mensaje";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { newPassword } from "../../../api/user";
import { toast } from "react-toastify";


export default function NewPasswordForm() {
  
    const initialValues = {
        password: '',
        password_confirmation: '',
    }
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
     const navigate= useNavigate();
    const params= useParams()
    const token= params.token || ""

    const {mutate} = useMutation({
        mutationFn: newPassword,
        onError: (error) => {
            toast.error(error.response.data.message)
        },
        onSuccess: () => {
            toast.success('Token confirmado')
            reset()
            navigate(
                `/auth/login`
            )
        }
    })
    const handleNewPassword = (formData) => {
      
      mutate({token,formData})
    }

    const password = watch('password');

    return (
        <>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="space-y-8 p-10  bg-white mt-10"
                noValidate
            >

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "El Password es obligatorio",
                            minLength: {
                                value: 8,
                                message: 'El Password debe ser mínimo de 8 caracteres'
                            }
                        })}
                    />
                    {errors.password && (
                        < ErrorMensaje>{errors.password.message}</ ErrorMensaje>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Repetir Password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password_confirmation", {
                            required: "Repetir Password es obligatorio",
                            validate: value => value === password || 'Los Passwords no son iguales'
                        })}
                    />

                    {errors.password_confirmation && (
                        < ErrorMensaje>{errors.password_confirmation.message}</ ErrorMensaje>
                    )}
                </div>

                <input
                    type="submit"
                    value='Establecer Password'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    )
}
*/