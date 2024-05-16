import { useLocation,useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "../../api/tareasApi";
import EditTak from "./EditTask";
import { task } from '../../types/index';

function EditDatatask() {

    const  params = useParams();
    const location = useLocation();
    const queryParams= new URLSearchParams(location.search);
    const  taskid= queryParams.get("Edittaskid") || "";
    const projectid = params.projectid || "";
     
     
    

    const { data, isLoading} = useQuery({
        queryKey: ["task", taskid],
        queryFn: () => getTaskById({
            projectid,
            taskid 
        }),
        enabled: !!taskid, //  compatibility
    }); 

    console.log(data);

    if (isLoading) return <p>Cargando...</p>;

    if (data) return <EditTak 
    data={data as task}  taskid={taskid}
    />;


}

export default EditDatatask;