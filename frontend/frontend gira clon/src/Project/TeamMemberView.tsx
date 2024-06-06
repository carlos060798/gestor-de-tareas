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
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded shadow-lg w-96">
          <CreatenewMember closeModal={closeModal} projectid={projectid} />
        </div>
      </div>
    )}
  </div>
  );
  
 /* return(


 
    <div className="overflow-x-auto">
      <table className="w-full max-w-3xl mx-auto mt-8 border-collapse border border-gray-300 rounded-lg">
        
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
                  onClick={() => mutate({ id: member._id, projectid })}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                >
                  <TrashIcon className="h-5 w-5 mr-2" />
                 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> 
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
   )*/
}

