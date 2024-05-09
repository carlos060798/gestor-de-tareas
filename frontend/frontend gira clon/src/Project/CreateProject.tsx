import { Link,useNavigate } from 'react-router-dom'
import  {useForm} from 'react-hook-form'
import ProjectForm from  '../components/project/FormProject'
import { ProjectFormData} from '../types'
import { createProject } from '../api/projectApi'
import { toast } from 'react-toastify'

export  default  function  CreateProject()  {
    const navigate = useNavigate()

    const intialValues: ProjectFormData={
        projectName: '',
        clientName: '',
        description: '',


    }
     const {register,handleSubmit,formState:{errors}} = useForm({defaultValues: intialValues })


    const handleForm = async (data:ProjectFormData) => {
       await createProject(data)
     navigate('/')
        toast.success('Proyecto creado con éxito')
    }
    return (
     
        
 
    <div className="max-w-screen-lg mx-auto">
   <div className="text-center mb-8">
    <h2 className="text-3xl font-bold text-blue-500">¡Empecemos un nuevo proyecto!</h2>
    <p className="text-lg text-gray-600">Completa el formulario para comenzar</p>
  </div>
  <form 
      className="mx-auto lg:w-6/12 md:w-8/12 sm:w-10/12 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit(handleForm)}
      noValidate
  >
      <ProjectForm 
          register={register}
          errors={errors}
      />
      <button 
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
      >
          Crear Proyecto
      </button>
      <div className="text-center mt-4">
    <Link to="/" className="text-blue-500 hover:underline">Volver</Link>
  </div>
  </form>
 
</div>


    )
}