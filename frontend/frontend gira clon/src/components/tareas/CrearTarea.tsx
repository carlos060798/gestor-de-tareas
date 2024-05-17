
import TareaForm from "./TareaForm"
import { useForm } from "react-hook-form"
import { TaskFormData } from "../../types/index"
import { useMutation,useQueryClient} from "@tanstack/react-query"
import { createTask } from "../../api/tareasApi"
import { toast } from "react-toastify"
import { useParams, useNavigate } from 'react-router-dom';

export default function  AddTaskModal({ closeModal }: { closeModal: () => void}){
  const params= useParams();
  const navigate= useNavigate();
  const projectid = params.projectid || ''

    const initialValues: TaskFormData = {
        name: '',
        description: '',
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues
    })
    const queryClient =useQueryClient()
    const {mutate }= useMutation({
      mutationFn: createTask,
      onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: () => {     
        queryClient.invalidateQueries({queryKey:['project', projectid]})
        navigate(location.pathname, {replace: true})

        toast.success('Tarea creada con éxito'),
        closeModal()
       
      },
    
    })
    
    
    const handleForm = (formData: TaskFormData) => {
      const data= {
       
        FormData: formData,
        projectid: projectid,
      }
      
      mutate(data)
    }


    return (
        <>
             <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
  <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 relative"> {/* Cambiado max-w-md por max-w-lg y ajustado el padding a p-6 */}
    <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={closeModal}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <div className="text-center mb-6"> {/* Ajustado el margen inferior */}
      <h2 className="text-2xl font-bold text-blue-500">¡crea tus tareas !</h2> {/* Cambiado text-3xl por text-2xl */}
      <p className="text-base text-gray-600">Completa el formulario para comenzar</p> {/* Cambiado text-lg por text-base */}
    </div>
    <form className="mx-auto lg:max-w-4xl md:max-w-xl sm:max-w-lg" onSubmit={handleSubmit(handleForm)} noValidate>
  <div className="mx-4 md:mx-8">
    < TareaForm errors={errors} register={register} />
  </div>
  <div className="mt-4 flex justify-end">
    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Crear Tarea
    </button>
  </div>
</form>
  </div>
</div>
     
        </>
    )
}
