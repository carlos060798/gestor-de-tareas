import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../api/projectApi";
import { useParams } from "react-router-dom";
import { useState } from "react";
import AddTaskModal from "../components/tareas/CrearTarea";
import TaskList from "../components/tareas/Task";
import EditDatatask from "../components/tareas/ModalEditTask";

export default function ProjectDetailViuw() {
  const params = useParams();
  const projectid = params.projectid || "";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["project", projectid],
    queryFn: () => getProjectById(projectid),
    retry: false,
  });

  console.log(data);

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data)
    return (
      <>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {" "}
              {data.projectName}
            </h1>
            <p className="text-lg text-gray-600"> {data.description}</p>
          </div>
          <div>
            <button
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300"
              onClick={openModal}
            >
              Crear Tarea
            </button>
            {/* Modal para crear proyecto */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded shadow-lg w-96">
                  <AddTaskModal closeModal={closeModal} />
                </div>
              </div>
            )}
          </div>
        </div>

        <TaskList tasks={data.tasks} />
        
        <EditDatatask/>
        
      </>
    );
}
