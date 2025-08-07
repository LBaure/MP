export default class MotivoExpedienteEntity {
  public idExpediente!: number
  public codigoEstado!: string
  public motivoRechazo!: string
  constructor (data: {
    idExpediente: number;
    codigoEstado: string;
    motivoRechazo: string;
  }) {
    Object.assign(this, data)
  }
}
