import { task } from "../../types/index";

import { TableCellsIcon } from '@heroicons/react/24/outline';

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import DropTask from "./components/drowgTask";
import { TaskCard } from "./taskCard";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeStatus } from "../../api/tareasApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

type groupTask = {
    [key: string]: task[]
}

const initialTaskGroup: groupTask = {
    PENDING: [],
    ON_HOLD: [],
    INPROGRESS: [],
    UNDER_REVIEW: [],
    COMPLETED: []
}

const traduccionTask: { [key: string]: string } = {
    PENDING: 'Pendientes',
    ON_HOLD: 'En Espera',
    INPROGRESS: 'En Progreso',
    UNDER_REVIEW: 'En Revisión',
    COMPLETED: 'Completadas'
}

interface TaskListProps {
    tasks: task[]
    manager: string
    user: string
}

export default function TaskList({ tasks, manager, user }: TaskListProps) {
    const params = useParams();
    const projectid = params.projectid  || "";
    
    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task];
        return { ...acc, [task.status]: currentGroup };
    }, initialTaskGroup);

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'PENDING':
                return '#EF4444'; // Rojo
            case 'ON_HOLD':
                return '#F59E0B'; // Amarillo
            case 'INPROGRESS':
                return '#3B82F6'; // Azul
            case 'UNDER_REVIEW':
                return '#8B5CF6'; // Púrpura
            case 'COMPLETED':
                return '#10B981'; // Verde
            default:
                return '#6B7280'; // Gris oscuro como color por defecto
        }
    };

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: changeStatus,
        onError: () => {
          toast.error('Error al actualizar el estado de la tarea');
        },
        onSuccess: () => {
          toast.success('Estado de la tarea actualizado correctamente');
          
          queryClient.invalidateQueries({ queryKey: ['project', projectid] });
        },
      });
    
    const handleDragEnd = (event: DragEndEvent) => {
        const {over,active}= event
        if(over && over.id ){
            const data = {
                taskid: active.id.toString(),
                projectid: projectid,
                status: over.id  as task['status']
            }
            mutate(data) 

            queryClient.setQueryData(['project', projectid],(prevData)=>{
            const updatedData = prevData.tasks.map((task)=>{
                if(task._id === active.id){
                    return {...task,status:over.id as task['status']}
                }
                return task
            })
        
            return {...prevData,tasks:updatedData}
        })
          
        }
       
    };

    return (
        <>
            <h4 className="text-4xl font-bold text-blue-600 text-center">
                <div className="flex items-center justify-center">
                    <TableCellsIcon className="h-15 w-12 text-blue-600" />
                </div>
            </h4>

          
                <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                <DndContext onDragEnd={handleDragEnd}>
                    {Object.entries(groupedTasks).map(([status, tasks]) => (
                        <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                            <div className="flex items-center justify-center mb-3">
                                <div
                                    className="w-4 h-4 rounded-full mr-2"
                                    style={{ backgroundColor: getStatusColor(status) }}
                                />
                                <h3
                                    className={
                                        'text-2xl font-bold ' +
                                        (tasks.length === 0 ? 'text-gray-500' : 'text-gray-900')
                                    }
                                >{traduccionTask[status]}</h3>
                            </div>
                            <hr className='border-t-2 border-gray-200' />
                            <DropTask status={status} />
                            <ul className='mt-5 space-y-5'>
                                {tasks.length === 0 ? (
                                    <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                                ) : (
                                    tasks.map(task => <TaskCard key={task._id} task={task} manager={manager} user={user} />)
                                )}
                            </ul>
                        </div>
                    ))}
                </DndContext>
                </div>
           
        </>
    );
}












/*import { task } from "../../types/index";
import {TaskCard} from "../tareas/taskCard";
import {TableCellsIcon} from '@heroicons/react/24/outline';
import DropTask from "./components/drowgTask";
import { DndContext,DragEndEvent } from "@dnd-kit/core";


type groupTask = {
    [key: string]: task[]


}


const initialTaskGroup : groupTask ={
    PENDING: [],
    ON_HOLD: [],
    INPROGRESS: [],
    UNDER_REVIEW: [],
    COMPLETED: []

}

const traduccionTask :{[key:string]:string}= { //   create a dictionary to translate the status of the task
    PENDING: 'Pendientes',
    ON_HOLD: 'En Espera',
    INPROGRESS: 'En Progreso',
    UNDER_REVIEW: 'En Revisión',
    COMPLETED: 'Completadas'
}

interface TaskListProps {
    tasks: task[]
    manager: string
    user: string
}
export default function TaskList({tasks,manager,user}: TaskListProps){
    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialTaskGroup);

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'PENDING':
                return '#EF4444'; // Rojo
            case 'ON_HOLD':
                return '#F59E0B'; // Amarillo
            case 'INPROGRESS':
                return '#3B82F6'; // Azul
            case 'UNDER_REVIEW':
                return '#8B5CF6'; // Púrpura
            case 'COMPLETED':
                return '#10B981'; // Verde
            default:
                return '#6B7280'; // Gris oscuro como color por defecto
        }
    };
 const   handleDraged = (event:DragEndEvent)=>{
        console.log(event)

        const {active,over}=event
        if(!active || !over){
            return
        }

 }
    return (
       <> 
       <h4 className="text-4xl font-bold text-blue-600 text-center">
  <div className="flex items-center justify-center">
    <TableCellsIcon className="h-15 w-12 text-blue-600" />
  </div>
</h4>

<div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
    <DndContext onDragEnd={handleDraged}/>
    {Object.entries(groupedTasks).map(([status, tasks]) => (
        <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
            <div className="flex items-center justify-center mb-3">
                <div
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: getStatusColor(status) }}
                />
                <h3
                    className={
                        'text-2xl font-bold ' +
                        (tasks.length === 0 ? 'text-gray-500' : 'text-gray-900')
                    }
                >{traduccionTask[status]}</h3>
            </div>
            <hr className='border-t-2 border-gray-200' />
            <DropTask status={status}/>
            <ul className='mt-5 space-y-5'>
                {tasks.length === 0 ? (
                    <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                ) : (
                    tasks.map(task => <TaskCard key={task._id} task={task}  manager={manager} user={user}/>)
                )}
            </ul>
        </div>
    ))}
</div>
       </>
    );
}
*/