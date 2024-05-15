
import { task } from "../../types/index";
import {TaskCard} from "../tareas/taskCard";

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
export default function TaskList({tasks}: {tasks: task[]}) {
    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialTaskGroup);

    console.log(groupedTasks)
    return (
       <>
       
       <h2 className="text-5xl font-black my-10">Tareas</h2>

<div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
    {Object.entries(groupedTasks).map(([status, tasks]) => (
        <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
            <ul className='mt-5 space-y-5'>
                {tasks.length === 0 ? (
                    <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                ) : (
                    tasks.map(task => <TaskCard key={task._id} task={task} />)
                )}
            </ul>
        </div>
    ))}
</div>
       </>
    );
}



/*

import { task } from "../../types/index";
import { TaskCard } from "../tareas/taskCard";

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

export default function TaskList({ tasks }: { tasks: task[] }) {
    const groupedTasks = tasks.reduce((acc, task) => {
        // Check if the task status is valid
        if (!initialTaskGroup.hasOwnProperty(task.status)) {
            console.warn(`Task status "${task.status}" is not valid.`);
            return acc;
        }

        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup.push(task);

        return { ...acc, [task.status]: currentGroup };
    }, { ...initialTaskGroup });

    console.log("Grouped Tasks:", groupedTasks);

    return (
        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>
            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                            ) : (
                                tasks.map(task => <TaskCard key={task._id} task={task} />)
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}
*/