import { TaskFormData, task } from '../../types';
import { useForm } from 'react-hook-form';
import TareaForm from './TareaForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '../../api/tareasApi';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

type EditTaskModal={
   
    task: task,
    editcloseModal: ()=>void
}

function EditTak({task,editcloseModal}:EditTaskModal) {
    const  params= useParams();
    const  projectid= params.projectid || "";

    const  {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TaskFormData>({
        defaultValues: {
            name: task.name,
            description: task.description
        }
    });
      const queryClient= useQueryClient();
    const {mutate} = useMutation({
        mutationFn: updateTask,
        onError: (error) => {
            toast.error(error.message)
            editcloseModal();     
            
            
        },
        onSuccess: () => {
            toast.success('Tarea actualizada correctamente') 
            editcloseModal();          
            queryClient.invalidateQueries({queryKey:["project", projectid]})
            
        }
       
    })

    const handleForm = (formData: TaskFormData) => {
        console.log(formData);
        mutate({
            projectid,
            taskid: task._id,
            FormData: formData  
        })
    };


    return ( <>
           <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 relative"> 
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={editcloseModal}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center mb-6"> 
          <h2 className="text-2xl font-bold text-blue-500">¡Edita tu tarea!</h2>
          <p className="text-base text-gray-600">Completa el formulario para comenzar</p> 
        </div>
        <form className="mx-auto lg:max-w-4xl md:max-w-xl sm:max-w-lg" onSubmit={handleSubmit(handleForm)} noValidate>
      <div className="mx-4 md:mx-8">
        <TareaForm register={register} errors={errors} />
      </div>
      <div className="mt-4 flex justify-end">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Editar Tarea
        </button>
      </div>
    </form>
      </div>
    </div>
  
    </> );
}

export default EditTak;