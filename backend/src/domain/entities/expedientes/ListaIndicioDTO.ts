export default class ListaIndicioDTO {
  public idIndicio?: number
  public idExpediente!: number
  public descripcion!: string
  public color?: string
  public tamanio?: string
  public peso?: string
  public ubicacion!: string
  public tecnicoRegistra!: string
  public fechaCreacion!: string
  public fechaUltimaActualizacion?: string
  public usuarioUltimaActualizacion?: string
  constructor (data: {
    idIndicio?: number;
    idExpediente: number;
    descripcion: string;
    color?: string;
    tamanio?: string;
    peso?: string;
    ubicacion: string;
    tecnicoRegistra: string;
    fechaCreacion: string;
    fechaUltimaActualizacion?: string;
    usuarioUltimaActualizacion?: string;
  }) {
    Object.assign(this, data)
  }
}
