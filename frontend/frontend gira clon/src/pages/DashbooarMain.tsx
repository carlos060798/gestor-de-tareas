7/*
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'


import { useQuery } from '@tanstack/react-query';
import  {Link}  from  'react-router-dom';
import {getProjects} from '../api/projectApi';

export  default  function  DashbooarMain()  {
    const {data,
        isLoading,
        
    }=useQuery({
        queryKey: ['projects'],
        queryFn: getProjects
    });
   console.log(data);
    if(isLoading) return <p>Cargando...</p>



    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Mis Proyectos</h1>
            <p  className="text-sm text-gray-600">Bienvenido a tu dashboard</p>
            <nav className='flex justify-end'>
                <Link  className="bg-blue-800 p-2 text-white" to="/proyecto/nuevo">Crear Proyecto</Link>
            </nav>    
            { data.length ? (
         <table className="table-auto w-full mt-4"> 
            <thead>
                <tr>
                    <th className="px-4 py-2">Nombre del proyecto</th>
                    <th className="px-4 py-2">Cliente</th>
                    <th className="px-4 py-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map((project:any)=>(
                    <tr key={project.id}>
                        <td className="border px-4 py-2">{project.projectName}</td>
                        <td className="border px-4 py-2">{project.clientName}</td>
                        <td className="border px-4 py-2">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="px-1 py-1 ">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to={`/proyecto/${project.id}`}
                                                        className={`${
                                                            active ? 'bg-gray-100' : ''
                                                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                    >
                                                        Ver
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to={`/proyecto/editar/${project.id}`}
                                                        className={`${
                                                            active ? 'bg-gray-100' : ''
                                                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                    >
                                                        Editar
                                                    </Link>
                                                )}
    
): (<p className='text-center'>No hay proyectos</p>)}
        </div>
    )
}
*/

import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getProjects } from '../api/projectApi';

export default function DashboardMain() {
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  });

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Mis Proyectos</h1>
      <p className="text-sm text-gray-600">Bienvenido a tu dashboard</p>
      <nav className="flex justify-end">
        <Link className="bg-blue-800 p-2 text-white" to="/proyecto/nuevo">
          Crear Proyecto
        </Link>
      </nav>
      {data.length ? (
        <table className="min-w-full divide-y divide-gray-200 mt-4">
  <thead className="bg-gray-50">
  <tr className="bg-gray-100">
  <th className="px-4 py-2 text-lg font-medium text-gray-600 uppercase tracking-wider text-center">Nombre del proyecto</th>
  <th className="px-4 py-2 text-lg font-medium text-gray-600 uppercase tracking-wider text-center">Cliente</th>
  <th className="px-4 py-2 text-lg font-medium text-gray-600 uppercase tracking-wider text-center">Acciones</th>
</tr>
</thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {data.map((project: any) => (
      <tr key={project.id}>
        <td className="border px-4 py-2">{project.projectName}</td>
        <td className="border px-4 py-2">{project.clientName}</td>
        <td className="border px-4 py-2">
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
              <EyeIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded flex items-center">
              <PencilIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center">
              <TrashIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              
            </button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      ) : (
        <p className="text-center">No hay proyectos</p>
      )}
    </div>
  );
}