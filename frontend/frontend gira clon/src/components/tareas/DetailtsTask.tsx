import { task ,TaskStatus} from "../../types/index";
import { Fragment } from 'react';
import statusTranslate from '../../localh/es';
import { useMutation, useQueryClient} from "@tanstack/react-query";
import { changeStatus } from "../../api/tareasApi";
import { toast } from "react-toastify";


interface  dataValues {
    task: task;
    closeTaskModal: () => void;
}
export default function TaskModalDetails({ task, closeTaskModal }: dataValues) {
    const projectid = task.project;
   
   
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: changeStatus
        ,
     
        onError: () => {
            toast.error('Error al actualizar el estado de la tarea');   
        },

        onSuccess: () => {
            toast.success('Estado de la tarea actualizado correctamente');
            closeTaskModal();
            queryClient.invalidateQueries({queryKey:["project", projectid]})
        }

    }) 

    const handleChange= (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status= e.target.value as TaskStatus;
        const data= { 
            taskid: task._id,
            projectid: task.project,
            status
         };

        mutate(data);
        console.log(status)
    }
  
            const formattedCreationDate = new Date(task.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            const formattedModificationDate = new Date(task.updatedAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        
            return (
            <Fragment>
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 relative">
                <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={closeTaskModal}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-blue-500">Detalles de la tarea</h2>
                        <p className="text-base text-gray-600">
                            Aquí puedes ver los detalles de la tarea seleccionada
                        </p>
                    </div>
                    <div className="mx-4 md:mx-8">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold">Título de la Tarea:</h3>
                        
                        </div>
                        <p className="text-gray-500">{task.name}</p>
                        <div className="flex justify-between items-center mt-4">
                            <h3 className="text-lg font-bold">Descripción:</h3>
                        </div>
                        <p className="text-gray-500">{task.description}</p>
                        <div className="flex justify-between items-center mt-4">
                            <h3 className="text-lg font-bold">Estado:</h3>
                        </div>
                        <select className="w-full bg-gray-100 rounded-lg p-2" 
                        defaultValue={task.status}
                        onChange={handleChange}
                        >
                        {
                            Object.entries(statusTranslate ).map(([key, value])=> (
                                <option key={key} value={key}>{value}</option>
                            ))
                        }
                        </select>
                        <div className="flex justify-between items-center mt-4">
                            <h3 className="text-lg font-bold">Fecha de Creación:</h3>
                        </div>
                        <p className="text-gray-500">{formattedCreationDate}</p>
                        <div className="flex justify-between items-center mt-4">
                            <h3 className="text-lg font-bold">Fecha de Modificación:</h3>
                        </div>
                        <p className="text-gray-500">{formattedModificationDate}</p>
                    </div>
                </div>
            </div>
            </Fragment>
            );
        }
       
