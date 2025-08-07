import React, { Suspense, useCallback, useEffect, useState } from 'react'
import FieldInput from '../../../components/field-input';
import { FolderTree, Pencil, Plus, Search } from "lucide-react";
import Button from '../../../components/Button';
import type { ITableHeader } from '../../../interfaces/ITableHeader';
import FormExpediente from '../components/FormExpediente';
import { ExpedienteServicio } from '../servicios/ExpedienteServicio';
import type { IExpediente, IListadoExpedientes } from '../../../interfaces/expedientes/IExpedientes';
import { Tooltip } from '../../../components/Tooltip';
import { Link } from 'react-router-dom';
const http = new ExpedienteServicio();

const headers: ITableHeader[] = [
  { key: "lugarHechos", label: "Lugar de hechos", sortable: true },
  { key: "tipoDelito", label: "Tipo de delito", sortable: true },
  { key: "tecnicoRegistra", label: "Técnico Registrado", sortable: true },
  { key: "fechaCreacion", label: "Fecha de creación", sortable: true },
  { key: "fechaUltimaActualizacion", label: "Última Actualización", sortable: true },
  { key: "usuarioUltimaActualizacion", label: "Usuario reviso", sortable: true },
  { key: "observaciones", label: "Observaciones", sortable: true },
  { key: "cantidadIndicios", label: "Indicios", sortable: true },
  { key: "estado", label: "Estado", sortable: true },
  { key: "actions", label: "Acciones", align: "center" },
];

const Expedientes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
    const [listadoExpedientes, setListadoExpedientes] = useState<IListadoExpedientes[]>([]);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [itemModificar, setItemModificar] = useState<any | null>(null);

  // Se utiliza los useCallback para optimizar renders
  const abrirModal = useCallback((item?: IListadoExpedientes) => {
    if (item) {
      const expediente: IExpediente = {
        idExpediente: item.idExpediente,
        lugarHechos: item.lugarHechos,
        tipoDelito: item.tipoDelito,
        observaciones: item.observaciones,
      };
      setItemModificar(expediente);
    } else {
      setItemModificar(null);
    }
    setIsOpenForm(true);
  }, []);

  useEffect(() => {
      const fetchData = async () => {
        const expedientes = await http.obtenerExpedientes();
        setListadoExpedientes(expedientes);
      };
      fetchData();
    }, []);
    
  const cerrarModal = useCallback(() => {
    setIsOpenForm(false);
  }, []);

  const getStatusBadge = (status: string) => {
    const baseClasses =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

    switch (status) {
      case "A":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "R":
        return `${baseClasses} bg-red-100 text-red-800`;
      case "P":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <section>
      <header>
        <div className="w-full">
          <h1 className="uppercase md:normal-case text-xl md:text-3xl font-semibold text-gray-900 md:mb-2 dark:text-slate-100">
            <span className="hidden md:inline-flex">Registro de&nbsp;</span>
            Expedientes
          </h1>
          <span className="text-gray-600 dark:text-slate-300 text-sm md:text-base">
            Registro de datos generales del expediente
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
            onClick={() => abrirModal()}
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
                  className="font-semibold text-gray-600  tracking-wider dark:text-slate-200 px-6 py-4 border-b border-gray-200 dark:border-gray-700 dark:border-t"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listadoExpedientes.map((expediente) => (
              <tr
                key={expediente.idExpediente}
                className="hover:bg-gray-50 transition-colors duration-150 dark:bg-dark-primary dark:hover:bg-slate-800"
              >
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                  {expediente.lugarHechos}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                  {expediente.tipoDelito}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                  {expediente.tecnicoRegistra}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                  {expediente.fechaCreacion}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                  {expediente.fechaUltimaActualizacion}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                  {expediente.usuarioUltimaActualizacion}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                  {expediente.observaciones}
                </td>
                <td>
                  <Link
                    to={"indicios/" + expediente.idExpediente}
                    // to={"permissions?role=" + item.roleId}
                    state={{ expediente }}
                    className="text-primary"
                  >
                    <span className="relative inline-flex justify-center items-center">
                      <FolderTree className="h-6 w-6" />
                      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs text-white bg-primary border-2 border-white rounded-full -top-2 -end-4 dark:border-gray-900">
                        {expediente.cantidadIndicios}
                      </div>
                    </span>
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                  <span className={getStatusBadge(expediente.codigoEstado)}>
                    {expediente.nombreEstado}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                  <div className="flex items-center gap-0.5">
                    <Tooltip tooltipText="Modificar expediente">
                      <Button
                        textColor="text-slate-900"
                        hover="hover:bg-slate-900/10"
                        onClick={() => abrirModal(expediente)}
                        className="p-3"
                      >
                        <Pencil className="h-5 w-5" />
                      </Button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpenForm && (
        <Suspense>
          <FormExpediente
            isOpen={isOpenForm}
            onClose={cerrarModal}
            item={itemModificar}
            actualizarListado={setListadoExpedientes}
          />
        </Suspense>
      )}
    </section>
  );
}


export default Expedientes