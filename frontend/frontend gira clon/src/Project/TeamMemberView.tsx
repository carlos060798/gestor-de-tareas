import CreatenewMember from "../components/team/createTeam";
import { useState } from "react";
import {  useParams, useNavigate} from "react-router-dom";
import {getTeamMembers} from "../api/teamApi";
import { useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import Loader from "../pages/loading";
import { removeTeamMember } from "../api/teamApi";
import { TrashIcon,ArrowLeftIcon,PlusIcon} from '@heroicons/react/20/solid'
import  { toast } from "react-toastify";




export default function TeamViuw() {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const navigate = useNavigate();

   const handleGoBack = () => {
     navigate(-1);
   };


  
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
  
  
  return (
    <div className="container mx-auto px-4 py-8">
      <button
      className="flex items-center space-x-2 text-black hover:text-blue-500 transition duration-300"
      onClick={handleGoBack}
    >
      <ArrowLeftIcon className="h-5 w-5" />
      <span>Regresar</span>
    </button>
      <div className="flex justify-between items-center mb-6">
    <h2 className="text-3xl font-bold text-blue-400">Gestión de Equipo</h2>
    <button
  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300"
  onClick={openModal}
>
  <span className="flex items-center">
    <PlusIcon className="h-5 w-5 mr-1" /> Añadir
  </span>
</button>
  </div>
    
    
    <div className="container mx-auto px-4 py-8">
  <h4 className="text-3xl font-bold mb-6  text-center text-blue-400">Miembros del Equipo</h4>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {data.map((member) => (
      <div key={member._id} className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-bold mb-2">{member.name}</h2>
        <p className="text-gray-500">{member.email}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => mutate({ id: member._id, projectid })}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline flex items-center"
          >
            <TrashIcon className="h-5 w-5 mr-2" />
           
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
  
{isModalOpen && (
  <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
    <div className="flex items-center justify-center min-h-screen">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
      <div className="bg-white rounded shadow-lg p-8 mx-auto z-50">
        <CreatenewMember closeModal={closeModal} projectid={projectid} />
      </div>
    </div>
  </div>
)}
  </div>
  );
  
 
}

