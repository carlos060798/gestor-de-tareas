
import { useForm } from "react-hook-form";
import ErrorMensaje from '../Error.mensaje';
import { deleteProject } from "../../api/projectApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmDelete } from "../../api/user";
import { toast } from "react-toastify";

interface DeleteProjectModalProps {
    closeModal: () => void;
    projectId: string;
}

export default function DeleteProjectModal(
    { closeModal, projectId}  : DeleteProjectModalProps
){
    const initialValues = {
        password: ''
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })  
    
  const deleteProjectpass= useMutation({
    mutationFn: confirmDelete,
    onError: (error) => {
      toast.error(error.message)
    },
   


    
  });
  const QueryClient = useQueryClient();

  const removeProject= useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: () => {
        toast.success("Proyecto eliminado con exito");
        QueryClient.invalidateQueries( {queryKey: ["projects"]})
        closeModal();
        
      },
     
    
 } )

    const handleForm = async (formData) => {
        await deleteProjectpass.mutateAsync(formData);
        await removeProject.mutateAsync(projectId);
      
      
    }


    return (
       
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="bg-white p-8 rounded-lg shadow-xl w-96 relative">
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            onClick={closeModal}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex flex-col gap-5">
            <h3 className="text-2xl font-bold text-blue-600">Eliminar Tarea</h3>
            <p className="text-lg text-gray-700">¿Estás seguro de eliminar la tarea?</p>
            <form className="mt-10 space-y-5" onSubmit={handleSubmit(handleForm)} noValidate>
              <div className="flex flex-col gap-3">
                <label className="font-normal text-xl" htmlFor="password">contraseña</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password Inicio de Sesión"
                  className="w-full p-3 border-gray-300 border rounded"
                  {...register("password", {
                    required: "El password es obligatorio",
                  })}
                />
                {errors.password && (
                  <span className="text-red-500">{errors.password.message}</span>
                )}
              </div>
              <input
                type="submit"
                className="bg-red-600 hover:bg-red-700 w-full p-3 text-white font-black text-sx cursor-pointer rounded"
                value='Eliminar '
              />
            </form>
          </div>
        </div>
      </div>
            
    );
}