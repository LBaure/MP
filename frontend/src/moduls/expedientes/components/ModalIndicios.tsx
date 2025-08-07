import { Folder } from "lucide-react";
import Button from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import type { IListadoExpedientes } from "../../../interfaces/expedientes/IExpedientes";
import type { ITableHeader } from "../../../interfaces/ITableHeader";
import type { IListadoIndicios } from "../../../interfaces/expedientes/IIndicio";
import {  useEffect, useState } from "react";
import { IndicioServicio } from "../servicios/IndicioServicio";
import Swal from "sweetalert2";
import { ExpedienteServicio } from "../servicios/ExpedienteServicio";
import type { IRevisionExpediente } from "../../../interfaces/expedientes/IRevisionExpediente";

const http = new IndicioServicio();
const httpExp  = new ExpedienteServicio();

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: IListadoExpedientes;  
  actualizarListaExpedientes: (list: IListadoExpedientes[]) => void;
}

const headers: ITableHeader[] = [
  { key: "descripcion", label: "Descripción", sortable: true },
  { key: "color", label: "Color", sortable: true },
  { key: "tamaño", label: "Tamaño", sortable: true },
  { key: "peso", label: "Peso", sortable: true },
  { key: "ubicacion", label: "Ubicación", sortable: true },
  { key: "tecnicoRegistra", label: "Técnico", sortable: true },
  { key: "fechaCreacion", label: "Creación", sortable: true },
];

const ModalIndicios: React.FC<AddModalProps> = ({
  isOpen,
  onClose,
  item,
  actualizarListaExpedientes,
}) => {
  const [listadoIndicios, setListadoIndicios] = useState<IListadoIndicios[]>(
    []
  );

  const handleClose = () => {
    onClose();
  };
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
    const fetchData = async () => {
      const indicios = await http.obtenerIndicios(item.idExpediente ?? 0);
      setListadoIndicios(indicios ?? []);
    };
    fetchData();
  }, [item]);

  const rechazarExpediente =  async () => {
    const { value: text } = await Swal.fire({
      title: "Rechazar Expediente",
      input: "textarea",
      inputLabel: "Motivo del rechazo",
      inputPlaceholder: "Falta de indicios...",
      inputAttributes: {
        "aria-label": "Falta de indicios",
      },
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      preConfirm: (inputText) => {
        if (!inputText) {
          Swal.showValidationMessage("El motivo del rechazo es obligatorio.");
        }
        return inputText;
      },
    });
    if (text) {
      if (!item.idExpediente) return;
      const datosEnviar: IRevisionExpediente = {
        idExpediente: item.idExpediente,
        codigoEstado: "R",
        motivoRechazo: text,
      };
      console.log("datosEnviar", datosEnviar);
      const result = await httpExp.rechazarExpediente(datosEnviar);
      if (result.length) {
        onClose();
        actualizarListaExpedientes(result);
      }
      console.log("resultado de la actualzicion", result);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Indicios" size="xl">
      <article className="my-6 bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 dark:bg-dark-primary dark:border-gray-700">
        <div className="flex flex-row justify-between items-center mb-4">
          <div className="flex flex-col">
            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Expediente No. {item.idExpediente}
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
                <span className="text-xl">{item.cantidadIndicios}</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div className="relative overflow-x-auto sm:rounded-lg dark:bg-dark-primary-body mb-6">
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
            {listadoIndicios.map((indicio: IListadoIndicios) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {item.codigoEstado === "P" && (
        <div className="sm:flex sm:flex-row-reverse py-4 gap-2">
          <Button
            type="submit"
            textColor="text-white"
            bgColor="bg-primary dark:bg-primary"
            hover="hover:bg-primary/90 dark:hover:bg-primary"
          >
            Aprobar
          </Button>

          <Button
            textColor="text-secondary"
            bgColor="border border-accent"
            hover="hover:bg-primary/10 dark:bg-transparent dark:hover:bg-secondary"
            onClick={rechazarExpediente}
          >
            Rechazar
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default ModalIndicios;
