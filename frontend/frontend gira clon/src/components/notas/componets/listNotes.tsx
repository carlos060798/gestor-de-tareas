import { useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { deleteNote, getNotes } from '../../../api/noteAp';
import  useAuth  from '../../../hook/useAuth';
import { toast } from 'react-toastify';
import { TrashIcon } from '@heroicons/react/20/solid';


interface NoteViuwsProps {
    projectid: string;
    taskid: string;
}
function ListNotes(   { projectid, taskid }: NoteViuwsProps) {
 const{data:user}= useAuth()  
   
 

 const {data} = useQuery({
        queryKey: ['notes', projectid, taskid],
        queryFn:  () => getNotes(projectid, taskid),
        retry: false
    
 })
 
 const queryClient = useQueryClient()
    const {mutate} = useMutation(
        {
          mutationFn: deleteNote,
           onError: (err)=> {
                console.error(err)
                toast.error('Error al eliminar la tarea')
            },
            onSuccess: () => {
                toast.success('Tarea eliminada con exito')
                queryClient.invalidateQueries({ queryKey: ['notes', projectid, taskid],})
            }

        }
    )

    const handleDeleteNote = async (noteid: string) => {
        console.log({
            projectid,
            taskid,
            noteid
        }) 
        mutate({projectId: projectid, taskId: taskid, noteId: noteid})

        }
        function formatDate(date: string) {
            return new Date(date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
          }
       

 
    return ( 
        <div className="space-y-4"> 
   <h3 className="font-bold mx-3 mt-4">Lista de Notas</h3>

        {data?.map((note) => (
            <div className="bg-white rounded-lg shadow-md flex flex-col p-4 relative w-full" key={note._id}>
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-lg font-semibold">Descripción:</p>
                        <p className="text-gray-600 mb-2">{note.content}</p>
                        <p className="text-lg font-semibold">Propietario:</p>
                        <p className="text-gray-600 mb-2">{note.createdby.name}</p>
                        <p className="text-lg font-semibold">Fecha de creación:</p>
                        <p className="text-gray-600">{formatDate(note.createdAt)}</p>
                    </div>
                    {user?._id === note.createdby._id && (
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleDeleteNote(note._id)}
                        >
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    )}
                </div>
            </div>
        ))}
    </div>
);

}

export default ListNotes ;