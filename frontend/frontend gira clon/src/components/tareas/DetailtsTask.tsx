import { task } from "../../types";
import { Fragment } from 'react';


interface  dataValues {
    task: task;
    closeTaskModal: () => void;
}
export default function TaskModalDetails({ task, closeTaskModal }: dataValues) {
    console.log(task);
  
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
                        <p className="text-gray-500">{task.status}</p>
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
       
