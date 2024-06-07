import { useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { deleteNote, getNotes } from '../../../api/noteAp';
import  useAuth  from '../../../hook/useAuth';
import { toast } from 'react-toastify';

interface NoteViuwsProps {
    projectid: string;
    taskid: string;
}
function ListNotes(   { projectid, taskid }: NoteViuwsProps) {
 const{data:user,isLoading}= useAuth()  
    console.log(user)
 

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
     
 

 
    return ( 
        <>
        <h1>Notas</h1>
        <button>Crear Nota</button>
        <div>
            <h2>lista de notas</h2>
            <ul>
                {data?.map((note: any) => (
                    <li key={note._id}>
                        <p>{note.content}</p>
                        <p>{note.createdby.name}</p>
                        <p>{note.createdAt}</p>
                      {user?._id === note.createdby._id && (    
                        <button onClick={
                            () => handleDeleteNote(note._id)
                        }>Eliminar</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    </>
 );
}

export default ListNotes ;