export enum EstadoSolicitudHttp {
  OK = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO'
  // Añadir otros estados según lo necesites
}

export default class ResponseEntity {
  status: string
  message: string
  result: object | Array<object> | null
  title?: string | null
  icon?: string | null

  constructor (status?: EstadoSolicitudHttp) {
    this.status = ''
    this.icon = ''
    this.message = ''
    this.title = ''
    this.result = null

    if (status) {
      this.status = status.toString()
      this.status = status.toString()
    }
  }
}
