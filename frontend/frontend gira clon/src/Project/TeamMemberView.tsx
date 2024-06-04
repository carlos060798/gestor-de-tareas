import CreatenewMember from "../components/team/createTeam";
import { useState } from "react";
import {  useParams } from "react-router-dom";
import {getTeamMembers} from "../api/teamApi";
import { useMutation, useQuery, useQueryClient, QueryClient } from '@tanstack/react-query';
import Loader from "../pages/loading";
import { removeTeamMember } from "../api/teamApi";
import { TrashIcon } from '@heroicons/react/20/solid'
import  { toast } from "react-toastify";

export default function TeamViuw() {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const params = useParams();
   const  projectid = params.projectid || "";
   const openModal = () => setIsModalOpen(true);
   const closeModal = () => setIsModalOpen(false); 
   const {data , isLoading, isError} = useQuery({
      queryKey: ['team', projectid],
      queryFn:  () => getTeamMembers({projectid}),
      retry:false
   })
   const queryClient = useQueryClient();
   const {mutate} = useMutation({
    mutationFn: removeTeamMember,
    onError: (error) => {
      toast.error(error.message)
    },onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({queryKey:['team', projectid]})
    }
  });
  
    if(isLoading) return <Loader />
    if(isError) return <p className="text-red-500 text-center">
      No hay  miembros en el equipo
    </p>
  
  
  
  
  return(
      <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Gestión de Equipo</h1>
      <div className="flex space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
         onClick={openModal}
        >
          agregar miembro
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300">
          Regresar a la Página Anterior
        </button>
      </div>
      
      <div className="overflow-x-auto">
      <table className="w-full mt-8 border-collapse border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-3 px-4 text-left">Nombre</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((member) => (
            <tr key={member._id} className="border-b border-gray-300">
              <td className="py-3 px-4">{member.name}</td>
              <td className="py-3 px-4">{member.email}</td>
              <td className="py-3 px-4">
                <button
                  onClick={()=>mutate({id:member._id, projectid}) }
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                   <TrashIcon className="h-5 w-5 mr-2" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

{isModalOpen && (
   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
     <div className="bg-white p-8 rounded shadow-lg w-96">
       <CreatenewMember closeModal={closeModal} projectid={projectid} />
     </div>
   </div>
 )}
</div> 
   )
}