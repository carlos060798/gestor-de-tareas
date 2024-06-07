import { useForm } from 'react-hook-form';
import ErrorMensaje from '../../Error.mensaje';
import {NoteFormData} from '../../../types/index'
import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../../api/noteAp';
import { toast } from 'react-toastify';


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
    return ( <>
        
        <h4 className="font-semibold text-2xl">Crear Nota</h4>
        <form className="form-horizontal    " onSubmit={handleSubmit(handleForm)}>
        <div className="flex flex-col gap-5">
            
                <label
                    className="font-normal text-2xl"
                    htmlFor="content"
                >Nombre de la tarea</label>
                <input
                    id="content"
                    type="text"
                    placeholder="Nombre de la tarea"
                    className="w-full p-3  border-gray-300 border"
                    {...register("content", {
                        required: "la nota no puede estar vacia",
                    })}
                />
                {errors.content && (
                    <ErrorMensaje>{errors.content.message}</ErrorMensaje>
                )}
            </div>
            <div className="mt-4 flex justify-end">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Crear Nota
                </button>
            </div>
         </form>
    </> );
}

export default CreateNotes;