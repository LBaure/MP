import {
  ChevronDown,
  Download,
  File,
  FileChartColumn,
  Folder,
  Search,
} from "lucide-react";
import Card from "../../../components/card";
import FieldInput from "../../../components/field-input";
import { useEffect, useState } from "react";
import { ExpedienteServicio } from "../servicios/ExpedienteServicio";
import type { IEstadoExpediente } from "../../../interfaces/expedientes/IEstadoExpediente";
import type { IListadoExpedientes } from "../../../interfaces/expedientes/IExpedientes";
import ModalIndicios from "../components/ModalIndicios";
import { Tooltip } from "../../../components/Tooltip";
import Button from "../../../components/Button";
import xlsx from "json-as-xlsx";
import type { ITableHeader } from "../../../interfaces/ITableHeader";

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
  { key: "nombreEstado", label: "Estado", sortable: true },
];


const Dashboard: React.FC = () => {
  const [buscarTermino, setBuscarTermino] = useState("");
  const [filterFolder, setFilterFolder] = useState<string>("0"); // '0' para "Todos"
  const [listaEstados, setListaEstados] = useState<IEstadoExpediente[]>([]);
  const [listadoExpedientes, setListadoExpedientes] = useState<
    IListadoExpedientes[]
  >([]);
  const [totalExpedientesPendientes, setTotalExpedientesPendientes] = useState(0);
  const [totalExpedientesRechazados, setTotalExpedientesRechazados] = useState(0);
  const [totalExpedientesAprobados, setTotalExpedientesAprobados] = useState(0);
  const [totalExpedientes, setTotalExpedientes] = useState(0);
  const [abrirModalIndicios, setAbrirModalIndicios] = useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState<IListadoExpedientes>({} as IListadoExpedientes);
  

  const cardList = [
    {
      title: "Expedientes pendientes",
      icon: <File className="h-5 w-5 text-slate-500 dark:text-slate-200" />,
      count: totalExpedientesPendientes,
      bg: "bg-slate-200",
      darkBg: "bg-gray-700",
    },
    {
      title: "Expedientes Rechazados",
      icon: <FileChartColumn className="h-5 w-5 text-success" />,
      count: totalExpedientesRechazados,
      bg: "bg-success/20",
    },
    {
      title: "Expedientes Aprobados",
      icon: <File className="h-5 w-5 text-slate-500 dark:text-slate-200" />,
      count: totalExpedientesAprobados,
      bg: "bg-slate-200",
      darkBg: "bg-gray-700",
    },
    {
      title: "Total de Expedientes",
      icon: <File className="h-5 w-5 text-slate-500 dark:text-slate-200" />,
      count: totalExpedientes,
      bg: "bg-slate-200",
      darkBg: "bg-gray-700",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const [estados, expedientes] = await Promise.all([
        http.obtenerEstadosExpedientes(),
        http.obtenerExpedientes(),
      ]);
      setListaEstados(estados);
      setListadoExpedientes(expedientes);
    };
    fetchData();
  }, []);

  // Agrupar por estadoId, garantizando que todos los estados estén representados
  const agruparExpedientesPorEstado = (
    expedientes: IListadoExpedientes[],
    estados: IEstadoExpediente[]
  ) => {
    const agrupados: {
      [idEstado: number]: {
        nombreEstado: string;
        expedientes: IListadoExpedientes[];
      };
    } = {};

    // Inicializar cada estado aunque no tenga expedientes
    estados.forEach((estado) => {
      agrupados[estado.idEstado] = {
        nombreEstado: estado.nombreEstado,
        expedientes: [],
      };
    });

    // Agregar expedientes al grupo correspondiente
    expedientes.forEach((exp) => {
      const grupo = agrupados[exp.idEstado];
      if (grupo) {
        grupo.expedientes.push(exp);
      }
    });

    return agrupados;
  };

  const expedientesAgrupados = agruparExpedientesPorEstado(
    listadoExpedientes,
    listaEstados
  );

  useEffect(() => {
    const filtered = listadoExpedientes.filter((exp) => {
      const matchTermino =
        exp.tipoDelito.toLowerCase().includes(buscarTermino.toLowerCase()) ||
        exp.lugarHechos.toLowerCase().includes(buscarTermino.toLowerCase());

      const matchEstado =
        filterFolder === "0" || String(exp.idEstado) === filterFolder;

      return matchTermino && matchEstado;
    });

    const pendientes = filtered.filter((exp) => exp.codigoEstado === "P");
    const rechazados = filtered.filter((exp) => exp.codigoEstado === "R");
    const aprobados = filtered.filter((exp) => exp.codigoEstado === "A");

    setTotalExpedientes(filtered.length);
    setTotalExpedientesPendientes(pendientes.length);
    setTotalExpedientesRechazados(rechazados.length);
    setTotalExpedientesAprobados(aprobados.length);

  }, [listadoExpedientes, buscarTermino, filterFolder]);


  
  const abrirModalIndiciosExpediente = (item: IListadoExpedientes) => {
    console.log("Abrir modal de indicios de expediente", item);
    setItemSeleccionado(item);
    setAbrirModalIndicios(true);
  };
const downloadFile = () => {
  const columns = headers
    .filter((header) => header.key !== "actions")
    .map((header) => ({
      value: header.key,
      label: header.label,
    }));

  const contenido = listadoExpedientes.map((device) => {
    const convertedDevice = Object.fromEntries(
      Object.entries(device).map(([key, value]) => [key, String(value ?? "")])
    );
    return convertedDevice;
  });

  const data = [
    {
      sheet: "Expedientes",
      columns: columns,
      content: contenido,
    },
  ];

  const settings = {
    fileName: `Expedientes_${new Date().toISOString()}`,
    extraLength: 3,
  };
  xlsx(data, settings);
};


  return (
    <section>
      <header className="mb-6">
        <div className="w-full">
          <h1 className="uppercase md:normal-case text-xl md:text-3xl font-semibold text-gray-900 md:mb-2 dark:text-slate-100">
            Panel de Expedientes
          </h1>
        </div>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {cardList.map((card, index) => (
          <Card key={index} {...card}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-slate-800 dark:text-slate-100">
                  {card.count}
                </h1>
                <p className="text-slate-500 dark:text-slate-300 ">
                  {card.title}
                </p>
              </div>
              <div
                className={`flex items-center justify-center p-2 mb-4 rounded-sm ${card.bg} dark:${card.darkBg}`}
              >
                {card.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <article className="my-6 bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 dark:bg-dark-primary dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="w-full md:max-w-lg">
            <FieldInput
              id="name"
              type="text"
              icon={<Search className="w-4 h-4" />}
              placeholder="Buscar registros..."
              value={buscarTermino}
              onChange={(e) => setBuscarTermino(e.target.value)}
              name="name"
            />
          </div>

          <div className="flex gap-2">
            <Tooltip
              tooltipText="Descargar"
              direction="top"
              bgColor="slate-400"
            >
              <Button
                textColor="text-success"
                bgColor="bg-success/20"
                hover="hover:bg-success hover:text-white"
                onClick={downloadFile}
              >
                <Download className="h-4 w-4" />
              </Button>
            </Tooltip>

            <div className="relative">
              <Folder className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filterFolder}
                onChange={(e) => setFilterFolder(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none transition-colors appearance-none bg-white dark:bg-dark-primary-body dark:text-slate-300 w-full"
              >
                <option value={"0"}>Todos los Estados</option>
                {listaEstados.map((estado) => (
                  <option key={estado.idEstado} value={estado.idEstado}>
                    {estado.nombreEstado}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
      </article>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {listaEstados.map((estado) => {
          const grupo = expedientesAgrupados[estado.idEstado];
          const listaFiltrada = grupo?.expedientes.filter((exp) => {
            const matchTermino =
              exp.tipoDelito
                .toLowerCase()
                .includes(buscarTermino.toLowerCase()) ||
              exp.lugarHechos
                .toLowerCase()
                .includes(buscarTermino.toLowerCase());

            const matchEstado =
              filterFolder === "0" || String(exp.idEstado) === filterFolder;

            return matchTermino && matchEstado;
          });

          return (
            <div
              key={estado.idEstado}
              className="bg-gray-100 rounded-lg shadow p-4"
            >
              <h2 className="text-xl font-semibold mb-4 text-center">
                {estado.nombreEstado}
              </h2>

              {listaFiltrada && listaFiltrada.length > 0 ? (
                <div className="space-y-3">
                  {listaFiltrada.map((exp) => (
                    <div
                      key={exp.idExpediente}
                      className="bg-white p-3 rounded shadow hover:bg-gray-50 transition cursor-pointer"
                      onClick={() => abrirModalIndiciosExpediente(exp)}
                    >
                      <h2>Expediente No. {exp.idExpediente}</h2>
                      <h3 className="font-bold">{exp.tipoDelito}</h3>
                      <p className="text-sm text-gray-600">{exp.lugarHechos}</p>
                      <p className="text-xs text-gray-400">
                        Creado por: {exp.tecnicoRegistra}
                      </p>
                      <p className="text-xs text-gray-400">
                        Fecha Creación: {exp.fechaCreacion}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 text-sm">
                  No hay expedientes
                </p>
              )}
            </div>
          );
        })}
      </div>
      <ModalIndicios
        isOpen={abrirModalIndicios}
        onClose={() => setAbrirModalIndicios(false)}
        item={itemSeleccionado}
        actualizarListaExpedientes={setListadoExpedientes}
      />
    </section>
  );
};

export default Dashboard;
