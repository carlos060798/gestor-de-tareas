import { useForm } from 'react-hook-form';
import {NoteFormData} from '../../../types/index'
import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../../api/noteAp';
import { toast } from 'react-toastify';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
interface NoteViuwsProps {
    projectid: string;
    taskid: string;
  }
function CreateNotes(
    { projectid, taskid }: NoteViuwsProps
) {
    const initialValues = {
        content: '',
    }
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues
    }) 
    const queryClient = useQueryClient()
    const  {mutate,reset} = useMutation({
        
        mutationFn: createNote,
        onError: (err: any) => {
            console.log(err)
            toast.error("Error al crear la nota")
        },
        onSuccess: () => {
           
            toast.success("Nota creada correctamente")
            queryClient.invalidateQueries({queryKey:['notes', projectid, taskid]})
            
        }
    })


    
    const handleForm = (formdata:NoteFormData) => {
      
        mutate({
            formdata,
            projectId: projectid,
            taskId: taskid
        
        } )
        reset()
    }
    return ( 
        
        <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit(handleForm)}>
            <div className="mb-6">
                <label
                    className="block text-lg font-medium text-gray-700 mb-2"
                    htmlFor="content"
                >
                    Nombre de la tarea
                </label>
                <input
                    id="content"
                    type="text"
                    placeholder="Nombre de la tarea"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    {...register("content", {
                        required: "La nota no puede estar vacía",
                    })}
                />
                {errors.content && (
                    <p className="text-red-500 text-sm mt-2">{errors.content.message}</p>
                )}
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out"
                >
                 <PlusCircleIcon className="h-5 w-5" />
                </button>
            </div>
        </form>
    );
}

export default CreateNotes;