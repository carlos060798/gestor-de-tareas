import { task } from "../../types";
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from "../../api/tareasApi";
import { toast } from "react-toastify";
import { useState } from "react";
import EditDatatask from "./EditTask";
import TaskModalDetails from "./DetailtsTask";
import isManager from "../../utils/policies";



type TaskProps={
    task: task
    manager: string
    user: string
}



export function TaskCard({ task,manager,user}: TaskProps) {
    const  param= useParams()
    const projectid = param.projectid!



    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);



    const [istaskOpen, setIstaskOpen] = useState(false);
    const opentaskModal = () => setIstaskOpen(true);
    const closetaskModal = () => setIstaskOpen(false);




    const queryClient = useQueryClient()
    const {mutate} = useMutation(
        {
          mutationFn: deleteTask,
           onError: (err)=> {
                console.error(err)
                toast.error('Error al eliminar la tarea')
            },
            onSuccess: () => {
                toast.success('Tarea eliminada con exito')
                queryClient.invalidateQueries({queryKey:['project', projectid]})
            }

        }
    )

    return (

        <div className="bg-white rounded-lg shadow-lg p-4 flex justify-between items-center">
        <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{task.name}</h3>
            <p className="text-gray-600 mt-2">{task.description}</p>
            <p className="text-gray-600 mt-2">Estado: {task.status}</p>
        </div>
        <Menu as="div" className="relative flex-none">
            <Menu.Button className="p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">Opciones</span>
                <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                        <button
                            className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                            onClick={() => opentaskModal()}
                        >
                            Ver Tarea
                        </button>
                    </Menu.Item>
                    { isManager(manager,user)&& (<>
                    <Menu.Item>
                        <button
                            className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                            onClick={() => openEditModal()}
                        >
                            Editar Tarea
                        </button>
                    </Menu.Item>
                    <Menu.Item>
                        <button
                            className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                            onClick={() => mutate({projectid, taskid: task._id})}
                        >
                            Eliminar Tarea
                        </button>
                    </Menu.Item>
                    </>)}
                </Menu.Items>
            </Transition>
        </Menu>

        {isEditModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded shadow-lg w-96">
            <EditDatatask task={task} editcloseModal={closeEditModal} />
        </div>
    </div>
)}

{istaskOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded shadow-lg w-96">
        < TaskModalDetails task={task} closeTaskModal={closetaskModal} />
        </div>
         
    </div>
 
    )}
     
</div>)
}