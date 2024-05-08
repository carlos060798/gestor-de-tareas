import { Link } from 'react-router-dom'
import  {useForm} from 'react-hook-form'
import ProjectForm from  '../components/project/FormProject'
import { ProjectFormData} from '../types'
import { createProject } from '../api/projectApi'

export  default  function  CreateProject()  {

    const intialValues: ProjectFormData={
        projectName: '',
        clientName: '',
        description: '',


    }
     const {register,handleSubmit,formState:{errors}} = useForm({defaultValues: intialValues })


    const handleForm = (data:ProjectFormData) => {
        createProject(data)
    }
    return (
        <div>
        
         
            <p className="text-center text-2xl font-bold mb-4 text-blue-500">Crear un nuevo proyecto</p>
<form 
    className="mx-auto w-6/12 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
</form>


            <Link to="/">Volver</Link>
        </div>
    )
}