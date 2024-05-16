import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../api/projectApi";
import { EditFormProject } from "../components/project/EditProject";


export default function EditProject({ projectId, closeModal }: { projectId: string, closeModal: () => void }) {
    const projectid = projectId;
   
  const { data, isLoading,error } = useQuery({
        queryKey: ['editproject', projectid],
        
        queryFn: ()=> getProjectById(projectid),
        retry: false
   });

    if (isLoading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;
     
    if (data)  return <EditFormProject data={data} closeModal={closeModal}  projectid={projectid}  />

 
      
    }
