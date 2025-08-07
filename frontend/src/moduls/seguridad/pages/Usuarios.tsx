import React, { useEffect, useState } from 'react'
import FieldInput from '../../../components/field-input';
import { Plus, Search, Trash, UserPen } from 'lucide-react';
import Button from '../../../components/Button';
import type { ITableHeader } from '../../../interfaces/ITableHeader';
import { UsuarioServicio } from '../servicios/UsuarioServicio';
import type { IUsuario } from '../../../interfaces/seguridad/IUsuario';
import { Tooltip } from '../../../components/Tooltip';

const http = new UsuarioServicio()

const headers: ITableHeader[] = [
  { key: "Nombre", label: "Nombres", sortable: true },
  { key: "Apellido", label: "Apellidos", sortable: true },
  { key: "NombreUsuario", label: "Usuario", sortable: true },
  { key: "CorreoElectronico", label: "Correo Electrónico", sortable: true },
  { key: "NumeroTelefono", label: "Telefono", sortable: true },
  { key: "FechaCreacion", label: "Fecha Creación", sortable: true },
  { key: "FechaActualizacion", label: "Fecha Actualización", sortable: true },
  {key: "Estado", label: "Estado", sortable: true },
  { key: "actions", label: "Acciones", align: "center" },
];

const Usuarios: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [listadoUsuarios, setListadoUsuarios] = useState<IUsuario[]>([]);

  const abrirModal = (item?: IUsuario) => {
    console.log("Abrir modal para nuevo expediente", item);
  }

  useEffect(() => {
    const fetchData = async () => {
      const users = await http.obtenerUsuarios();
      console.log("Usuarios obtenidos:", users);
      setListadoUsuarios(users);
    };
    fetchData();
  }, []);
  return (
    <section>
      <header>
        <div className="w-full">
          <h1 className="uppercase md:normal-case text-xl md:text-3xl font-semibold text-gray-900 md:mb-2 dark:text-slate-100">
            <span className="hidden md:inline-flex">Registro de&nbsp;</span>
            Usuarios
          </h1>
          <span className="text-gray-600 dark:text-slate-300 text-sm md:text-base">
            Registro de los usuarios registrados en el sistema.
          </span>
        </div>
      </header>
      <article className="my-6 bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 dark:bg-dark-primary dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="w-full md:max-w-xl">
            <FieldInput
              id="name"
              type="text"
              icon={<Search className="w-4 h-4" />}
              placeholder="Buscar registros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              name="name"
            />
          </div>
          <button
            className="fixed bottom-4 right-4 h-14 w-14 bg-slate-700 text-white  rounded-full flex items-center justify-center text-lg shadow-lg z-50 md:hidden"
            onClick={() => abrirModal()}
          >
            <Plus className="h-6 w-6" />
          </button>
          <Button
            className="hidden sm:inline-flex"
            textColor="text-slate-100"
            bgColor="bg-primary"
            hover="hover:bg-primary/95"
            onClick={abrirModal}
          >
            <Plus className="h-4 w-4" />
            Nuevo
          </Button>
        </div>
      </article>
      <div className="relative overflow-x-auto sm:rounded-lg dark:bg-dark-primary-body">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="bg-[#f3f6f9] dark:bg-dark-primary">
            <tr>
              {headers.map((header) => (
                <th
                  key={header.key}
                  className="text-xs font-semibold text-gray-600  tracking-wider dark:text-slate-200 px-6 py-4 border-b border-gray-200 dark:border-gray-700 dark:border-t"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listadoUsuarios.map((usuario) => (
              <tr
                key={usuario.idUsuario}
                className="hover:bg-gray-50 transition-colors duration-150 dark:bg-dark-primary dark:hover:bg-slate-800"
              >
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                  {usuario.nombre}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                  {usuario.apellido}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                  {usuario.nombreUsuario}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                  {usuario.correoElectronico}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                  {usuario.numeroTelefono}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                  {usuario.fechaCreacion}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                  {usuario.fechaActualizacion}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                  {usuario.estado}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                  <div className="flex items-center gap-0.5">
                    <Tooltip tooltipText="Reiniciar contraseña">
                      <Button
                        textColor="text-slate-900"
                        hover="hover:bg-slate-900/10"
                        onClick={() => {}}
                        className="p-3"
                      >
                        <Trash className="h-5 w-5" />
                      </Button>
                    </Tooltip>
                    <Tooltip tooltipText="Modificar usuario">
                      <Button
                        textColor="text-slate-900"
                        hover="hover:bg-slate-900/10"
                        onClick={() => abrirModal(usuario)}
                        className="p-3"
                      >
                        <UserPen className="h-5 w-5" />
                      </Button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}


export default Usuarios