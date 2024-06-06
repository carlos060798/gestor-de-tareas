import { TeamMemberForm } from "../../types";
import ErrorMensaje from "../Error.mensaje";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { findMemberByemail } from "../../api/teamApi";
import TeamMemberId from "./components/memberTeam";

interface  propsTeam{
      closeModal: () => void;
      projectid: string;

 }
 export default function CreatenewMember({ closeModal, projectid }: propsTeam) {

   

   const initialValues: TeamMemberForm = {
      email: ''
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

  const mutation = useMutation({
   mutationFn:findMemberByemail
  })

  const handleSearchUser = async (formData:TeamMemberForm) => {
   const data={
      projectid,
      formData,
      
   }
   mutation.mutate(data)
   console.log(mutation)
  }
  const resetData=()=>{
    reset()
    mutation.reset()
}
return(
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl relative">
    <button
      onClick={closeModal}
      className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-4xl"
    >
      &times;
    </button>
    <h3 className="text-4xl font-bold mb-6 text-center text-blue-500">Nuevo Colaborador</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h4 className="text-2xl font-bold mb-4 text-blue-500 text-center">Buscar Usuario</h4>
        <form className="space-y-6" onSubmit={handleSubmit(handleSearchUser)} noValidate>
          <div className="flex flex-col gap-4">
            <label className="font-normal text-xl text-bold" htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder="E-mail del usuario a agregar"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              {...register("email", {
                required: "El Email es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
            {errors.email && <ErrorMensaje>{errors.email.message}</ErrorMensaje>}
          </div>
          <input
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 w-full p-4 text-white font-bold text-xl cursor-pointer rounded-lg"
            value="Buscar Usuario"
          />
        </form>
        {mutation.isPending && <p className="mt-4 text-gray-600">Buscando Usuario...</p>}
        {mutation.isError && <p className="mt-4 text-red-600">Error al buscar el usuario</p>}
      </div>

      <div>
        <h4 className="text-2xl font-bold mb-4 text-blue-500 text-center">Añadir Integrante</h4>
        {mutation.data ? (
          <TeamMemberId user={mutation.data} projectid={projectid} reset={resetData} />
        ) : (
          <p className="text-gray-600">Esperando resultados...</p>
        )}
      </div>
    </div>
  </div>
</div>
)
/*return(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl relative">
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-4xl"
        >
          &times;
        </button>
        <h3 className="text-4xl font-bold mb-6 text-center text-blue-500">Nuevo Colaborador</h3>

        <form className="space-y-6" onSubmit={handleSubmit(handleSearchUser)} noValidate>
          <div className="flex flex-col gap-4">
            <label className="font-normal text-xl text-bold" htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder="E-mail del usuario a agregar"
              className="w-full p-4 border border-gray-300 rounded-lg"
              {...register("email", {
                required: "El Email es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
            {errors.email && <ErrorMensaje>{errors.email.message}</ErrorMensaje>}
          </div>
          <input
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 w-full p-4 text-white font-bold text-xl cursor-pointer rounded-lg"
            value="Buscar Usuario"
          />
        </form>
        {mutation.isPending && <p className="mt-4 text-gray-600">Buscando Usuario...</p>}
        {mutation.isError && <p className="mt-4 text-red-600">Error al buscar el usuario</p>}
        {mutation.data && <TeamMemberId user={mutation.data} projectid={projectid} reset={resetData} />}
      </div>
    </div>
) */
 
}