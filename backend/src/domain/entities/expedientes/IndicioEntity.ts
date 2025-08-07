export default class IndicioEntity {
  public idIndicio?: number
  public idExpediente!: number
  public descripcion!: string
  public color?: string
  public tamanio?: string
  public peso?: string
  public ubicacion!: string
  constructor (data: {
    idIndicio?: number;
    idExpediente: number;
    descripcion: string;
    color?: string;
    tamanio?: string;
    peso?: string;
    ubicacion: string;
  }) {
    Object.assign(this, data)
  }
}
