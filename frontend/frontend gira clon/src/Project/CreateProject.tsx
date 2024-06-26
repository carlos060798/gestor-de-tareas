
import  {useForm} from 'react-hook-form'
import ProjectForm from  '../components/project/FormProject'
import { ProjectFormData} from '../types'
import { createProject } from '../api/projectApi'
import { toast } from 'react-toastify'
import { useMutation,useQueryClient} from '@tanstack/react-query'
 function CreateProject({ closeModal }: { closeModal: () => void }) {
    
    const intialValues: ProjectFormData = {
      projectName: '',
      clientName: '',
      description: '',
    };
  
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: intialValues });
    const  QueryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: createProject,
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: () => {
        toast.success('Proyecto creado con éxito');
        QueryClient.invalidateQueries({queryKey: ['projects']});
        closeModal();
      },
    });
  
    const handleForm = async (data: ProjectFormData) => {
      await mutation.mutateAsync(data);
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
  <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 relative"> {/* Cambiado max-w-md por max-w-lg y ajustado el padding a p-6 */}
    <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={closeModal}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <div className="text-center mb-6"> {/* Ajustado el margen inferior */}
      <h2 className="text-2xl font-bold text-blue-500">¡Empecemos un nuevo proyecto!</h2> {/* Cambiado text-3xl por text-2xl */}
      <p className="text-base text-gray-600">Completa el formulario para comenzar</p> {/* Cambiado text-lg por text-base */}
    </div>
    <form className="mx-auto lg:max-w-4xl md:max-w-xl sm:max-w-lg" onSubmit={handleSubmit(handleForm)} noValidate>
  <div className="mx-4 md:mx-8">
    <ProjectForm register={register} errors={errors} />
  </div>
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
