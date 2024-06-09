import { useState } from "react";
import {  getProjects } from "../api/projectApi";
import CreateProject from "../Project/CreateProject";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import EditProject from "../Project/EditProjectView";
import { Project } from "../types/index";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "./loading";
import useAuth from "../hook/useAuth";
import DeleteProjectModal from "../components/tareas/deletePassword";

export default function DashboardMain() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [isdelteOpen, setisdelteOpen] = useState(false);
  const [projectId, setprojectId] = useState("");
  const { data: user, isLoading: isAuth } = useAuth();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
   
  const openDeleteModal = (id: string) =>{ 
    setprojectId(id);
    setisdelteOpen(true) }
  const closeDeleteModal = () => setisdelteOpen(false);

  const openEditModal = (id: string) => {
    setprojectId(id);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => setIsEditModalOpen(false);

  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });


  

  if (isLoading && isAuth) return <Loader/>;

  if (data  && user)  




    return (
      <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-600 leading-tight">
            ¡Bienvenido a tus Proyectos!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Administra y crea nuevos proyectos desde aquí.
          </p>
        </div>
        <button
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
          onClick={openModal}
        >
          Crear Proyecto
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    
        {data?.length ? (
     <table className="min-w-full divide-y divide-gray-300 mt-4 mx-auto">
     <thead className="bg-teal-50">
       <tr className="bg-teal-100">
         <th className="px-4 py-2 text-sm font-medium  text-teal-700 uppercase tracking-wider text-center">
           Nombre del proyecto
         </th>
         <th className="px-4 py-2 text-sm font-medium text-teal-700 uppercase tracking-wider text-center">
           Cliente
         </th>
         <th className="px-4 py-2 text-sm font-medium text-teal-700 uppercase tracking-wider text-center">
           Rol del usuario
         </th>
         <th className="px-4 py-2 text-sm font-medium text-teal-700 uppercase tracking-wider text-center">
           Acciones
         </th>
       </tr>
     </thead>
     <tbody className="bg-white divide-y divide-gray-200">
       {data?.map((project: Project) => (
         <tr key={project._id} className="hover:bg-teal-50">
           <td className="px-4 py-2 text-sm text-center text-teal-900">{project.projectName}</td>
           <td className="px-4 py-2 text-sm text-center text-teal-900">{project.clientName}</td>
           <td className="px-4 py-2 text-sm text-center text-teal-900">
             {project.manager === user?._id ? "Manager" : "Colaborador"}
           </td>
           <td className="px-4 py-2 text-sm text-center">
             <div className="flex justify-center space-x-2">
               <Link
                 to={`/detailt/${project._id}`}
                 className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-3 rounded flex items-center"
               >
                 <EyeIcon className="h-4 w-4 mr-1" aria-hidden="true" />
               </Link>
               {project.manager === user?._id && (
                 <>
                   <button
                     className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded flex items-center"
                     onClick={() => {
                       openEditModal(project._id);
                     }}
                   >
                     <PencilIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                   </button>
                   <button
                     className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded flex items-center"
                     onClick={() => {
                        openDeleteModal(project._id);
                       
                     }}
                   >
                     <TrashIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                   </button>
                 </>
               )}
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

        {/* Modal para eliminar proyecto */}

        {isdelteOpen && (
         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
         <div className="bg-white p-8 rounded shadow-lg w-96">
           <DeleteProjectModal projectId={projectId} closeModal={closeDeleteModal} />
         </div>
        </div>
         
        )}
      </div>
    );
}
