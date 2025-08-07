import IndicioEntity from '../../../domain/entities/expedientes/IndicioEntity'
import ResponseEntity, { EstadoSolicitudHttp } from '../../../domain/entities/ResponseEntity'
import IIndicioRepositorio from '../../../domain/repositories/expedientes/IIndicioRepositorio'
import handleError from '../../../utils/handleError'

export default class UsuarioUseCase {
  private readonly _IIndicioRepositorio: IIndicioRepositorio
  constructor (indicioRepositorio: IIndicioRepositorio) {
    this._IIndicioRepositorio = indicioRepositorio
  }

  async obtenerIndicios (idExpediente: number) {
    try {
      const usuarios = await this._IIndicioRepositorio.obtenerIndicios(
        idExpediente
      )
      const response = new ResponseEntity(EstadoSolicitudHttp.OK)
      response.message = 'Datos obtenidos exitosamente'
      response.result = usuarios
      return response
    } catch (error) {
      return handleError(error)
    }
  }

  async registrarIndicio (expediente: IndicioEntity) {
    try {
      let response = new ResponseEntity()
      const result = await this._IIndicioRepositorio.registrarIndicio(
        expediente
      )

      if (result === true) {
        const expedientes = await this._IIndicioRepositorio.obtenerIndicios(
          expediente.idExpediente
        )
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

  async actualizarIndicio (indicio: IndicioEntity) {
    try {
      let response = new ResponseEntity()
      const result = await this._IIndicioRepositorio.actualizarIndicio(indicio)

      if (result === true) {
        const expedientes = await this._IIndicioRepositorio.obtenerIndicios(
          indicio.idExpediente
        )
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

  async eliminarIndicio (idIndicio: number, idExpediente: number) {
    try {
      let response = new ResponseEntity()
      const result = await this._IIndicioRepositorio.eliminarIndicio(idIndicio, idExpediente)

      if (result === true) {
        const expedientes = await this._IIndicioRepositorio.obtenerIndicios(
          idExpediente
        )
        response = new ResponseEntity(EstadoSolicitudHttp.OK)
        response.message = 'Indicio eliminado exitosamente'
        response.result = expedientes
      } else {
        response = new ResponseEntity(EstadoSolicitudHttp.ERROR)
        response.message = 'No se pudo eliminar los datos, intente nuevamente'
      }
      return response
    } catch (error) {
      return handleError(error)
    }
  }
}
