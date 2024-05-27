import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../Error.mensaje";
import { RegisterFormData } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { createAcount } from "../../api/user";
import { toast } from "react-toastify";

function Register() {
  const initialValues: RegisterFormData = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({ defaultValues: initialValues });

  const password = watch("password");

  const {mutate, isLoading} = useMutation({
    mutationFn: createAcount,
    onError: (error) => {
        toast.error('Usuario no creado')
        console.log(error)
    },
    onSuccess: () => {
      toast.success('Usuario creado correctamente')
      reset()
    },
  
  
  })

  const handleRegister = (formData: RegisterFormData) => {
    mutate(formData)
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-green-100">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Crear Cuenta
        </h1>
        <p className="text-lg font-medium text-gray-700 mb-8">
          Llena el formulario para{" "}
          <span className="text-blue-600 font-bold">crear tu cuenta</span>
        </p>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="w-full max-w-lg space-y-6 p-8 bg-white shadow-xl rounded-lg"
          noValidate
        >
          <div className="flex flex-col space-y-2">
            <label className="font-bold text-lg text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Email de Registro"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("email", {
                required: "El Email de registro es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-bold text-lg text-gray-700">Nombre</label>
            <input
              type="text"
              placeholder="Nombre de Registro"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("name", {
                required: "El Nombre de usuario es obligatorio",
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-bold text-lg text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Password de Registro"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("password", {
                required: "El Password es obligatorio",
                minLength: {
                  value: 8,
                  message: "El Password debe ser mínimo de 8 caracteres",
                },
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-bold text-lg text-gray-700">
              Repetir Password
            </label>
            <input
              id="password_confirmation"
              type="password"
              placeholder="Repite Password de Registro"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("password_confirmation", {
                required: "Repetir Password es obligatorio",
                validate: (value) =>
                  value === password || "Los Passwords no son iguales",
              })}
            />
            {errors.password_confirmation && (
              <ErrorMessage>
                {errors.password_confirmation.message}
              </ErrorMessage>
            )}
          </div>

          <button
            type="submit"
           
            className="w-full py-3 text-white font-bold text-lg bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Registrarme
          </button>
        </form>

        <p className="text-gray-700 mt-6">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/auth/login"
            className="font-bold text-blue-600 hover:text-blue-500"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </>
  );
}

export default Register;
