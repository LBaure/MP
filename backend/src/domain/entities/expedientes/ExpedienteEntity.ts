export default class ExpedienteEntity {
  public idExpediente?: string
  public lugarHechos!: string
  public tipoDelito!: string
  public observaciones?: string
  constructor (data: {
    idExpediente?: string;
    lugarHechos: string;
    tipoDelito: string;
    observaciones?: string;
  }) {
    Object.assign(this, data)
  }
}
