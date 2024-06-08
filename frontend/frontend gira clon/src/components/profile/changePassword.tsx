
import { useForm } from "react-hook-form"
import ErrorMessage from "../Error.mensaje"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import {changePassword } from "../../api/user"
import { LockClosedIcon } from '@heroicons/react/20/solid';



export default function ChangePasswordUser() {
  const initialValues = {
    current_password: '',
    password: '',
    password_confirmation: ''
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: initialValues })

  const password = watch('password'); 

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onError: (error) => {
      console.log(error);
      toast.error('Error al cambiar la contraseña');
    },
    onSuccess: () => {
      toast.success('contraseña actualizada correctamente');
       
    },
  })

  const handleChangePassword = (formData) => { 

    mutate(formData)
  }

  return (
    
    
    <div className="mx-auto max-w-3xl">
      <h3 className="text-5xl font-black flex items-center justify-center">
                <LockClosedIcon className="h-11 w-11 text-blue-600 mr-2" />
            </h3>
    <form
        onSubmit={handleSubmit(handleChangePassword)}
        className="mt-14 space-y-5 bg-white shadow-lg p-10 rounded-lg max-w-md mx-auto"
        noValidate
    >
        <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="current_password">Password Actual</label>
            <input
                id="current_password"
                type="password"
                placeholder="Password Actual"
                className="w-full p-3 border border-gray-200"
                {...register("current_password", { required: "El password actual es obligatorio" })}
            />
            {errors.current_password && <ErrorMessage>{errors.current_password.message}</ErrorMessage>}
        </div>

        <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="password">Nuevo Password</label>
            <input
                id="password"
                type="password"
                placeholder="Nuevo Password"
                className="w-full p-3 border border-gray-200"
                {...register("password", {
                    required: "El Nuevo Password es obligatorio",
                    minLength: { value: 8, message: 'El Password debe ser mínimo de 8 caracteres' }
                })}
            />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="password_confirmation">Repetir Password</label>
            <input
                id="password_confirmation"
                type="password"
                placeholder="Repetir Password"
                className="w-full p-3 border border-gray-200"
                {...register("password_confirmation", {
                    required: "Este campo es obligatorio",
                    validate: value => value === password || 'Las contraseñas no coinciden'
                })}
            />
            {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
        </div>

        <input
            type="submit"
            value='Cambiar Password'
            className="bg-blue-400 w-full p-3 text-white uppercase font-bold hover:bg-blue-700 cursor-pointer transition-colors"
        />
    </form>
</div>
    
  )
}