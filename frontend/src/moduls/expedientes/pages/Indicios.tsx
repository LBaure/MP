import { Link, useLocation } from "react-router-dom";
import type { IListadoExpedientes } from "../../../interfaces/expedientes/IExpedientes";
import FieldInput from "../../../components/field-input";
import { Folder, MoreHorizontal, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import Button from "../../../components/Button";
import type { ITableHeader } from "../../../interfaces/ITableHeader";
import type { IIndicio, IListadoIndicios } from "../../../interfaces/expedientes/IIndicio";
import { IndicioServicio } from "../servicios/IndicioServicio";
import { Tooltip } from "../../../components/Tooltip";
import FormIndicio from "../components/FormIndicio";
import Swal from "sweetalert2";

const http = new IndicioServicio();

const headers: ITableHeader[] = [
  { key: "descripcion", label: "Descripción", sortable: true },
  { key: "color", label: "Color", sortable: true },
  { key: "tamaño", label: "Tamaño", sortable: true },
  { key: "peso", label: "Peso", sortable: true },
  { key: "ubicacion", label: "Ubicación", sortable: true },
  { key: "tecnicoRegistra", label: "Técnico Registra", sortable: true },
  { key: "fechaCreacion", label: "Fecha Creación", sortable: true },
  { key: "actions", label: "Acciones", align: "center" },
];
const Indicios = () => {
  const [buscarTermino, setBuscarTermino] = useState("");
  const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);
  const [listadoIndicios, setListadoIndicios] = useState<IListadoIndicios[]>([]);
  const [cantidadIndicios, setCantidadIndicios] = useState<number>(0);
  const [itemModificar, setItemModificar] = useState<IIndicio | null>(null);
  const tablaVacia = {
    message: "Registro de Indicios",
    description: "No se encontraron indicios con los criterios de búsqueda especificados.",
  };
    const [isOpenForm, setIsOpenForm] = useState(false);
  
  const location = useLocation();
  console.log(location.state);
  const item: IListadoExpedientes = location.state?.expediente;

  console.log("Item", item);

  const getStatusBadge = (status: string) => {
    const baseClasses =
      "flex flex-col items-center p-3 rounded-xl min-w-[100px] ";

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

  useEffect(() => {
  if (item.codigoEstado === "A") {
    setDeshabilitarBoton(true);
  }

  const fetchData = async () => {
    const indicios = await http.obtenerIndicios(item.idExpediente ?? 0);
    setListadoIndicios(indicios ?? []);
  };
  fetchData();

  }, [item]);

  const filtrarListadoIndicios = useMemo(() => {
    // Copiar los items para no mutar el array original
    const filtered = listadoIndicios.filter((item) => {
      const matchesSearchTerm = Object.values(item).some((value) => {
        return String(value)
          .toLowerCase()
          .includes(buscarTermino.toLowerCase());
      });
      return matchesSearchTerm;
    });
    setCantidadIndicios(filtered.length);

    return filtered;
  }, [listadoIndicios, buscarTermino]);
  
  const abrirFormulario = useCallback((item?: IListadoIndicios) => {
      if (item) {
        const expediente: IIndicio = {
          idIndicio: item.idIndicio,
          idExpediente: item.idExpediente,
          descripcion: item.descripcion,
          color: item.color,
          tamanio: item.tamanio,
          peso: item.peso,
          ubicacion: item.ubicacion
        };
        setItemModificar(expediente);
      } else {
        setItemModificar(null);
      }
      setIsOpenForm(true);
    }, []);

 const cerrarFormulario = useCallback(() => {
    setIsOpenForm(false);
  }, []);

  const eliminarIndicio = useCallback((item: IListadoIndicios) => {
    const { idIndicio, idExpediente } = item;
    if (!idIndicio) return;

    Swal.fire({
      icon: "warning",
      html: `¿Esta seguro de eliminar el indicio con la descripción <strong>${item.descripcion}</strong>?`,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        http.eliminarIndicio(idIndicio, idExpediente).then((response) => {
          console.log(response);
          if (response) {
            setListadoIndicios(response)
          }
        });
      }
    });

   
  }, []);

  return (
    <section className="p-4 md:p-6">
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              to={"../registro"}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-400 dark:hover:text-white"
            >
              Expedientes
            </Link>
          </li>

          <li>
            <div className="flex items-center gap-2">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <h1 className="inline-flex items-center text-sm font-medium pointer-events-none text-gray-500 dark:text-gray-400 dark:hover:text-white">
                Expediente No. {item.idExpediente}
              </h1>
            </div>
          </li>
        </ol>
      </nav>

      <article className="my-6 bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 dark:bg-dark-primary dark:border-gray-700">
        <div className="flex flex-row justify-between items-center mb-4">
          <div className="flex flex-col">
            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Indicios del Expediente No. {item.idExpediente}
            </h2>
            <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Lugar de los hechos:
                </span>{" "}
                {item.lugarHechos}
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Tipo de delito:
                </span>{" "}
                {item.tipoDelito}
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Observaciones:
                </span>{" "}
                {item.observaciones}
              </li>
            </ul>
          </div>
          <div>
            <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
              <div className={getStatusBadge(item.codigoEstado)}>
                <Folder className="h-6 w-6 mb-1" />
                <span className="text-sm font-medium">{item.nombreEstado}</span>
                <span className="text-xl">{cantidadIndicios}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex-1 w-full md:max-w-xl">
            <FieldInput
              id="name"
              type="text"
              icon={<Search className="w-4 h-4" />}
              placeholder="Buscar indicio ..."
              value={buscarTermino}
              onChange={(e) => setBuscarTermino(e.target.value)}
              name="name"
            />
          </div>
          <button
            className="fixed bottom-4 right-4 h-14 w-14 bg-slate-700 text-white  rounded-full flex items-center justify-center text-lg shadow-lg z-50 md:hidden"
            onClick={() => {}}
          >
            <Plus className="h-6 w-6" />
          </button>
          <Button
            className="hidden sm:inline-flex"
            textColor="text-slate-100"
            bgColor={deshabilitarBoton ? "bg-primary/50" : "bg-primary"}
            hover={deshabilitarBoton ? "bg-primary/50" : "hover:bg-primary/95"}
            onClick={() => abrirFormulario()}
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
            {filtrarListadoIndicios.length === 0 ? (
              <tr className="dark:bg-sf-dark-primary-strepped">
                <td colSpan={headers.length} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <MoreHorizontal className="h-12 w-12 text-gray-400 dark:text-gray-100" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-slate-200">
                      {tablaVacia?.message || "No data available"}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-slate-300">
                      {tablaVacia?.description ||
                        "There are no items to display at this time."}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filtrarListadoIndicios.map((indicio: IListadoIndicios) => (
                <tr
                  key={indicio.idIndicio}
                  className="hover:bg-gray-50 transition-colors duration-150 dark:bg-dark-primary dark:hover:bg-slate-800"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                    {indicio.descripcion}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                    {indicio.color}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                    {indicio.tamanio}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                    {indicio.peso}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                    {indicio.ubicacion}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                    {indicio.tecnicoRegistra}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-900 dark:text-slate-300">
                    {indicio.fechaCreacion}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-300">
                    <div className="flex items-center gap-0.5">
                      <Tooltip tooltipText="Modificar indicio">
                        <Button
                          textColor="text-slate-900"
                          hover="hover:bg-slate-900/10"
                          onClick={() => abrirFormulario(indicio)}
                          className="p-3"
                        >
                          <Pencil className="h-5 w-5" />
                        </Button>
                      </Tooltip>
                      <Tooltip tooltipText="Modificar indicio">
                        <Button
                          textColor="text-slate-900"
                          hover="hover:bg-slate-900/10"
                          onClick={() => eliminarIndicio(indicio)}
                          className="p-3"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isOpenForm && (
        <Suspense>
          <FormIndicio
            isOpen={isOpenForm}
            onClose={cerrarFormulario}
            item={itemModificar}
            actualizarListado={setListadoIndicios}
            idExpediente={item.idExpediente ?? 0}
          />
        </Suspense>
      )}
    </section>
  );
};

export default Indicios;
