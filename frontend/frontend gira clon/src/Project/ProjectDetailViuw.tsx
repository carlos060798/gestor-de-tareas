import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../api/projectApi";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import AddTaskModal from "../components/tareas/CrearTarea";
import TaskList from "../components/tareas/Task";
import EditDatatask from "../components/tareas/ModalEditTask";
import TaskModalDetails from "../components/tareas/ModalEditTask";
import Loader from "../pages/loading";
import isManager from "../utils/policies";
import useAuth from "../hook/useAuth";
import { PlusCircleIcon, UsersIcon } from "@heroicons/react/24/outline";

export default function ProjectDetailViuw() {
  const params = useParams();
  const { data: user } = useAuth();

  const projectid = params.projectid || "";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["project", projectid],
    queryFn: () => getProjectById(projectid),
    retry: false,
  });
  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;
  if (data && user)
    return (
      <>
        <div className="flex items-center justify-between mb-8">
          <div className="md:w-2/3">
            <h3 className="text-3xl font-bold text-blue-600">
              Titulo: <span>{data.projectName}</span>
            </h3>
            <p className="text-lg text-gray-600">
              Descripción: {data.description}
            </p>
          </div>
          {isManager(data.manager, user._id) && (
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300"
                onClick={openModal}
              >
                <PlusCircleIcon className="h-6 w-6 mr-2" />
                Tarea
              </button>
              <Link
                to={`/project/${projectid}/team`}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300"
              >
                <UsersIcon className="h-6 w-6 mr-2" />
                Equipo
              </Link>
            </div>
          )}

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded shadow-lg w-96">
                <AddTaskModal closeModal={closeModal} />
              </div>
            </div>
          )}
        </div>

        <TaskList tasks={data.tasks} manager={data.manager} user={user._id} />

        <EditDatatask />
        <TaskModalDetails />
      </>
    );
}
