
import { useState } from 'react';
import { getProjects } from '../api/projectApi';
import CreateProject from '../Project/CreateProject';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { useQuery } from '@tanstack/react-query';
import EditProject from '../Project/EditProjectView';
import  {Project} from '../types/index'



export default function DashboardMain() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado para el modal de edición
  const [projectId, setprojectId] = useState('');


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEditModal = (id:string) => {
     setprojectId(id);
    setIsEditModalOpen(true);}
  const closeEditModal = () => setIsEditModalOpen(false);


  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects 
   
  });

  if (isLoading) return <p>Cargando...</p>;
  console.log(projectId)

  return (
    <div>
     <div className="flex items-center justify-between mb-8">
  <div>
    <h1 className="text-3xl font-bold text-gray-900">¡Bienvenido a tus Proyectos!</h1>
    <p className="text-lg text-gray-600">Administra y crea nuevos proyectos desde aquí.</p>
  </div>
  <button className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300" onClick={openModal}>
    Crear Proyecto
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M7 4h6a1 1 0 010 2H7a1 1 0 010-2zm0 6h6a1 1 0 010 2H7a1 1 0 010-2zm0 6h6a1 1 0 010 2H7a1 1 0 010-2z" clipRule="evenodd" />
    </svg>
  </button>
</div>
      {data?.length ? (
        <table className="min-w-full divide-y divide-gray-200 mt-4">
          <thead className="bg-gray-50">
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-lg font-medium text-gray-600 uppercase tracking-wider text-center">Nombre del proyecto</th>
              <th className="px-4 py-2 text-lg font-medium text-gray-600 uppercase tracking-wider text-center">Cliente</th>
              <th className="px-4 py-2 text-lg font-medium text-gray-600 uppercase tracking-wider text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.map((project:Project) => (
              <tr key={project._id}>
                <td className="border px-4 py-2">{project.projectName}</td>
                <td className="border px-4 py-2">{project.clientName}</td>
                <td className="border px-4 py-2">
                  <div className="flex justify-center space-x-4">
                    <button              
                  
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                      <EyeIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                    </button>
                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded flex items-center" onClick={() => {
                      
                      openEditModal(project._id);
                    
                    
                    }}>
                      <PencilIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center">
                      <TrashIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No hay proyectos</p>
      )}

      {/* Modal para crear proyecto */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-96">
           
            <CreateProject closeModal={closeModal} />
          </div>
        </div>
      )} 
         {/* Modal para editar proyecto */}
         {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-96">
          <EditProject projectId={projectId} closeModal={closeEditModal} />
          </div>
        </div>
      )}
    </div>
  );
}