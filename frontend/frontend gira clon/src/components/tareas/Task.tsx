
import { task } from "../../types/index";
import {TaskCard} from "../tareas/taskCard";
import {TableCellsIcon} from '@heroicons/react/24/outline';

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

    return (
       <> 
       <h4 className="text-4xl font-bold text-blue-600 text-center">
  <div className="flex items-center justify-center">
    <TableCellsIcon className="h-15 w-12 text-blue-600" />
  </div>
</h4>

<div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
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
