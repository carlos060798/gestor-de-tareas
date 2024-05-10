               
{/*<ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
    {data.map((project) => (
      <li key={project._id} className="flex justify-between gap-x-6 px-5 py-10">
          <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto space-y-2">
                  <Link to={``}
                      className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                  >{project.projectName}</Link>
                  <p className="text-sm text-gray-400">
                      Cliente: {project.clientName}
                  </p>
                  <p className="text-sm text-gray-400">
                      {project.description}
                  </p>
              </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-6">
              <Menu as="div" className="relative flex-none">
                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                  </Menu.Button>
                  <Transition as={Fragment} enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      <Menu.Items
                          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                      >
                              <Menu.Item>
                                  <Link to={``}
                                      className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                  Ver Proyecto
                                  </Link>
                              </Menu.Item>
                              <Menu.Item>
                                  <Link to={``}
                                      className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                  Editar Proyecto
                                  </Link>
                              </Menu.Item>
                              <Menu.Item>
                                  <button 
                                      type='button' 
                                      className='block px-3 py-1 text-sm leading-6 text-red-500'
                                      onClick={() => {} }
                                  >
                                      Eliminar Proyecto
                                  </button>
                              </Menu.Item>
                      </Menu.Items>
                  </Transition>
              </Menu>
          </div>
      </li>
    </ul> */}



                  <table className="table-auto w-full mt-4">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Nombre del proyecto</th>
                        <th className="px-4 py-2">Cliente</th>
                        <th className="px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((project: any) => (
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
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>