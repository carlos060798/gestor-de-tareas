
import  {Link}  from  'react-router-dom';
export  default  function  DashbooarMain()  {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Mis Proyectos</h1>
            <p  className="text-sm text-gray-600">Bienvenido a tu dashboard</p>
            <nav className='flex justify-end'>
                <Link  className="bg-blue-800 p-2 text-white" to="/proyecto/nuevo">Crear Proyecto</Link>
            </nav>

        
        </div>
    )
}