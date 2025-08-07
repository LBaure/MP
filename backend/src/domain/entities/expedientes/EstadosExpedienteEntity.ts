export default class EstadosExpedienteEntity {
  public idEstado!: number
  public nombreEstado!: string
  public descripcion!: string
  public codigo!: string
  constructor (data: {
    idEstado: number;
    nombreEstado: string;
    descripcion: string;
    codigo: string;
  }) {
    Object.assign(this, data)
  }
}
