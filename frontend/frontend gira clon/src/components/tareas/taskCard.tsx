import { task } from "../../types";

type  TaskProms={
    task: task

}



export  function  TaskCard({task}: TaskProms) {
    return (
      <li className="bg-white shadow-md p-4 rounded-lg">
        <h3 className="text-lg font-bold">{task.name}</h3>
        <p className="text-gray-500">{task.description}</p>
        <p className="text-sm text-gray-400">Status: {task.status}</p>
        </li>
    );
}