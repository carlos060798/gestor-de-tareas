
import CreateNotes from './componets/createNotes';
import ListNotes from './componets/listNotes';

interface NoteViuwsProps {
  projectid: string;
  taskid: string;
}
function NoteViuws(
  { projectid, taskid }: NoteViuwsProps
) {
    return ( <>
      Notas
      <ListNotes projectid={projectid}  taskid={taskid}/>
      <CreateNotes projectid={projectid}  taskid={taskid}/> 
      
    </> );
}

export default NoteViuws;