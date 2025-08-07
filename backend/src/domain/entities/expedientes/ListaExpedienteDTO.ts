export default class ListaExpedienteDTO {
  public idExpediente?: string
  public lugarHechos!: string
  public tipoDelito!: string
  public tecnicoRegistra!: string
  public fechaCreacion!: string
  public fechaUltimaActualizacion!: string
  public usuarioUltimaActualizacion!: string
  public idEstado!: number
  public codigoEstado!: string
  public nombreEstado!: string
  public observaciones?: string
  public cantidadIndicios?: number
  constructor (data: {
    idExpediente?: string;
    lugarHechos: string;
    tipoDelito: string;
    tecnicoRegistra: string;
    fechaCreacion: string;
    fechaUltimaActualizacion: string;
    usuarioUltimaActualizacion: string;
    idEstado: number;
    codigoEstado: string;
    nombreEstado: string;
    observaciones?: string;
    cantidadIndicios?: number;
  }) {
    Object.assign(this, data)
  }
}
