
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { TaskFormData, task } from '../../types';
import { useForm } from 'react-hook-form';
import TareaForm from './TareaForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '../../api/tareasApi';
import { toast } from 'react-toastify';

type EditTaskModal={
    data:task
    taskid: task['_id'],
}

function EditTak({data,taskid}:EditTaskModal) {
    const  navigate= useNavigate();
    const  params= useParams();
    const  projectid= params.projectid || "";

    const  {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TaskFormData>({
        defaultValues: {
            name: data.name,
            description: data.description
        }
    });
      const queryClient= useQueryClient();
    const {mutate} = useMutation({
        mutationFn: updateTask,
        onError: (error) => {
            console.error(error);
        },
        onSuccess: () => {
            toast.success('Tarea actualizada correctamente')           
            navigate(location.pathname, {replace: true})
            queryClient.invalidateQueries({queryKey:["project", projectid]})
            
        }
       
    })

    const handleForm = (formData: TaskFormData) => {
        console.log(formData);
        mutate({
            projectid,
            taskid,
            FormData: formData  
        })
    };


    return ( <>
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={
                () => navigate(
                    location.pathname, { replace: true}
                )
             }>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                <Dialog.Title
                                    as="h3"
                                    className="font-black text-4xl  my-5"
                                >
                                    Editar Tarea
                                </Dialog.Title>

                                <p className="text-xl font-bold">Realiza cambios a una tarea en {''}
                                    <span className="text-fuchsia-600">este formulario</span>
                                </p>

                                <form
                                    className="mt-10 space-y-3"
                                    onSubmit={handleSubmit(handleForm)}
                                    noValidate
                                >
                                   
                                   <TareaForm errors={errors} register={register} />

                    
                                    <input
                                        type="submit"
                                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                                        value='Guardar Tarea'
                                    />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
  
    </> );
}

export default EditTak;