
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
    
      <CreateNotes projectid={projectid}  taskid={taskid}/> 
      <ListNotes projectid={projectid}  taskid={taskid}/>
     
      
    </> );
}

export default NoteViuws;