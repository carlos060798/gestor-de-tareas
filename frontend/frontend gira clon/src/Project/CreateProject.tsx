
import  {useForm} from 'react-hook-form'
import ProjectForm from  '../components/project/FormProject'
import { ProjectFormData} from '../types'
import { createProject } from '../api/projectApi'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
 function CreateProject({ closeModal }: { closeModal: () => void }) {
    
    const intialValues: ProjectFormData = {
      projectName: '',
      clientName: '',
      description: '',
    };
  
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: intialValues });
    const mutation = useMutation({
      mutationFn: createProject,
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: () => {
        toast.success('Proyecto creado con éxito');
        closeModal();
      },
    });
  
    const handleForm = async (data: ProjectFormData) => {
      await mutation.mutateAsync(data);
    };
  
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="max-w-screen-lg w-full bg-white rounded-lg shadow-lg p-8 relative">
          <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-500">¡Empecemos un nuevo proyecto!</h2>
            <p className="text-lg text-gray-600">Completa el formulario para comenzar</p>
          </div>
          <form className="mx-auto lg:w-6/12 md:w-8/12 sm:w-10/12" onSubmit={handleSubmit(handleForm)} noValidate>
            <ProjectForm register={register} errors={errors} />
            <div className="mt-4 flex justify-end">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Crear Proyecto
              </button>
            </div>
          </form>
          
        </div>
      </div>
    );
  }

    export default CreateProject;
