export interface IExpediente {
  idExpediente?: number | null;
  lugarHechos: string;
  tipoDelito: string;
  observaciones?: string;
}


export interface IListadoExpedientes extends IExpediente {
  estadoExpediente: number;
  idEstado: number;
  codigoEstado: string;
  nombreEstado: string;
  tecnicoRegistra: string;
  fechaCreacion: string;
  fechaUltimaActualizacion?: string;
  usuarioUltimaActualizacion?: string;
  cantidadIndicios: number;
}

