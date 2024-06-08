import React, { Fragment, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { changeStatus } from '../../api/tareasApi';
import { getUserById } from '../../api/user'; 
import statusTranslate from '../../localh/es';
import { task, TaskStatus } from '../../types/index';
import NoteViuws from '../notas/notesPanel';


interface DataValues {
  task: task;
  closeTaskModal: () => void;
}

interface User {
  _id: string;
  name: string;
  email: string;
}
export default function TaskModalDetails({ task, closeTaskModal }: DataValues) {
 
  const projectid = task.project;
  const taskid = task._id;
  const queryClient = useQueryClient();
  const [users, setUsers] = useState<{ [key: string]: User }>({});

  const { mutate } = useMutation({
    mutationFn: changeStatus,
    onError: () => {
      toast.error('Error al actualizar el estado de la tarea');
    },
    onSuccess: () => {
      toast.success('Estado de la tarea actualizado correctamente');
      closeTaskModal();
      queryClient.invalidateQueries({ queryKey: ['project', projectid] });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as TaskStatus;
    const data = {
      taskid: task._id,
      projectid: task.project,
      status,
    };

    mutate(data);
   
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const userIds = task.changeUserBy.map((change) => change.user);
      const userPromises = userIds.map((id) => getUserById(id));
      const usersArray = await Promise.all(userPromises);
      const usersMap = usersArray.reduce((acc, user) => {
        if (user) acc[user._id] = user;
        return acc;
      }, {} as { [key: string]: User });
      setUsers(usersMap);
    };

    fetchUsers();
  }, [task.changeUserBy]);

  const formattedCreationDate = new Date(task.createdAt).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedModificationDate = new Date(task.updatedAt).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }); 

 

  const renderChangeHistory = () => {
    if (!task.changeUserBy || task.changeUserBy.length === 0) {
      return <p className="text-gray-500">No hay historial de cambios</p>;
    }
    return (
      <ul className="text-gray-500 space-y-2">
        {task.changeUserBy.map((change) => {
          const user = users[change.user];
          return (
            <li key={change._id} className="border-b border-gray-200 py-2">
              <p>
                <span className="font-semibold">Usuario:</span> {user ? user.name : 'Desconocido'}
                , <span className="font-semibold">Estado:</span> {statusTranslate[change.status] ?? change.status}
              </p>
            </li>
          );
        })}
      </ul>
    );
  };

 
  return (
    <Fragment>
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-4 md:p-8">
      <div className="w-full max-w-xl max-h-[90vh] bg-white rounded-lg shadow-lg p-6 md:p-8 relative overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
          onClick={closeTaskModal}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-2">Detalles de la tarea</h2>
          <p className="text-lg text-gray-600">Aquí puedes ver los detalles de la tarea seleccionada</p>
        </div>
        <div className="flex flex-col space-y-6">
          <div>
            <h3 className="text-xl font-bold">Título de la Tarea:</h3>
            <p className="text-gray-500">{task.name}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Descripción:</h3>
            <p className="text-gray-500">{task.description}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Estado:</h3>
            <select
              className="w-full bg-gray-100 rounded-lg p-2 mt-1"
              defaultValue={task.status}
              onChange={handleChange}
            >
              {Object.entries(statusTranslate).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3 className="text-xl font-bold">Fecha de Creación:</h3>
            <p className="text-gray-500">{formattedCreationDate}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Fecha de Modificación:</h3>
            <p className="text-gray-500">{formattedModificationDate}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Historial de Cambios:</h3>
            {renderChangeHistory()}
          </div>
         
          <div>
            <h3 className="text-3xl font-bold text-blue-600 mb-2 text-center">Notas de la tarea</h3>
            <NoteViuws projectid={projectid} taskid={taskid} />
          </div>
        </div>
      </div>
    </div>
  </Fragment>
  )
}





