export interface IIndicio {
  idIndicio?: number | null;
  idExpediente: number;
  descripcion: string;
  color: string;
  tamanio: number;
  peso: number;
  ubicacion: string;
}


export interface IListadoIndicios extends IIndicio {
  tecnicoRegistra: string;
  fechaCreacion: string;
  fechaUltimaActualizacion?: string;
  usuarioUltimaActualizacion?: string;
}
