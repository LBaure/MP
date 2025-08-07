import ResponseEntity, { EstadoSolicitudHttp } from '../../../domain/entities/ResponseEntity'
import IUsuarioRepositorio from '../../../domain/repositories/seguridad/IUsuarioRepositorio'
import handleError from '../../../utils/handleError'

export default class UsuarioUseCase {
  private readonly _IUsuarioRepositorio: IUsuarioRepositorio
  constructor (usuarioRepositorio: IUsuarioRepositorio) {
    this._IUsuarioRepositorio = usuarioRepositorio
  }

  async obtenerUsuarios () {
    try {
      const usuarios = await this._IUsuarioRepositorio.obetenerUsuarios()
      const response = new ResponseEntity(EstadoSolicitudHttp.OK)
      response.message = 'Datos obtenidos exitosamente'
      response.result = usuarios
      return response
    } catch (error) {
      return handleError(error)
    }
  }
}
