import ExpedienteEntity from '../../../domain/entities/expedientes/ExpedienteEntity'
import MotivoExpedienteEntity from '../../../domain/entities/expedientes/MotivoExpedienteEntity'
import ResponseEntity, { EstadoSolicitudHttp } from '../../../domain/entities/ResponseEntity'
import IExpedienteRepositorio from '../../../domain/repositories/expedientes/IExpedienteRepositorio'
import handleError from '../../../utils/handleError'

export default class UsuarioUseCase {
  private readonly _IExpedienteRepositorio: IExpedienteRepositorio
  constructor (expedienteRepositorio: IExpedienteRepositorio) {
    this._IExpedienteRepositorio = expedienteRepositorio
  }

  async obtenerExpedientes () {
    try {
      const usuarios = await this._IExpedienteRepositorio.obtenerExpedientes()
      const response = new ResponseEntity(EstadoSolicitudHttp.OK)
      response.message = 'Datos obtenidos exitosamente'
      response.result = usuarios
      return response
    } catch (error) {
      return handleError(error)
    }
  }

  async obtenerEstadosExpedientes () {
    try {
      const usuarios =
        await this._IExpedienteRepositorio.obtenerEstadosExpedientes()
      const response = new ResponseEntity(EstadoSolicitudHttp.OK)
      response.message = 'Datos obtenidos exitosamente'
      response.result = usuarios
      return response
    } catch (error) {
      return handleError(error)
    }
  }

  async crearExpediente (expediente: ExpedienteEntity) {
    try {
      let response = new ResponseEntity()
      const result = await this._IExpedienteRepositorio.crearExpediente(
        expediente
      )

      if (result === true) {
        const expedientes =
          await this._IExpedienteRepositorio.obtenerExpedientes()
        response = new ResponseEntity(EstadoSolicitudHttp.OK)
        response.message = 'Datos guardados exitosamente'
        response.result = expedientes
      } else {
        response = new ResponseEntity(EstadoSolicitudHttp.ERROR)
        response.message = 'No se pudo guardar los datos, intente nuevamente'
      }
      return response
    } catch (error) {
      return handleError(error)
    }
  }

  async actualizarExpediente (expediente: ExpedienteEntity, idExpediente: number) {
    try {
      let response = new ResponseEntity()

      const result = await this._IExpedienteRepositorio.actualizarExpediente(
        expediente,
        idExpediente
      )

      if (result === true) {
        const expedientes = await this._IExpedienteRepositorio.obtenerExpedientes()
        response = new ResponseEntity(EstadoSolicitudHttp.OK)
        response.message = 'Datos guardados exitosamente'
        response.result = expedientes
      } else {
        response = new ResponseEntity(EstadoSolicitudHttp.ERROR)
        response.message = 'No se pudo guardar los datos, intente nuevamente'
      }
      return response
    } catch (error) {
      return handleError(error)
    }
  }

  async actualizarMotivo (motivo: MotivoExpedienteEntity) {
    try {
      let response = new ResponseEntity()
      const result = await this._IExpedienteRepositorio.actualizarMotivo(motivo)

      if (result === true) {
        const expedientes = await this._IExpedienteRepositorio.obtenerExpedientes()
        response = new ResponseEntity(EstadoSolicitudHttp.OK)
        response.message = 'Datos guardados exitosamente'
        response.result = expedientes
      } else {
        response = new ResponseEntity(EstadoSolicitudHttp.ERROR)
        response.message = 'No se pudo guardar los datos, intente nuevamente'
      }
      return response
    } catch (error) {
      return handleError(error)
    }
  }
}
