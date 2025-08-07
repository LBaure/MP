import { UserLoginEntity } from '../../../domain/entities/Auth/UserLoginEntity'
import ResponseEntity, { EstadoSolicitudHttp } from '../../../domain/entities/ResponseEntity'
import ILoginRepository from '../../../domain/repositories/Auth/ILoginRepository'

export class LoginUseCase {
  private readonly iLoginRepository: ILoginRepository
  constructor (loginRepository: ILoginRepository) {
    this.iLoginRepository = loginRepository
  }

  async executeAsync (data: UserLoginEntity) {
    try {
      const isValid = await this.iLoginRepository.validateUser(data)
      if (isValid) {
        const userProfile = await this.iLoginRepository.getUserProfile(data)
        const response = new ResponseEntity(EstadoSolicitudHttp.OK)
        response.message = 'Usuario validado'
        response.result = userProfile
        return response
      } else {
        throw new Error('Usuario o contraseña incorrectos')
      }
    } catch (error:unknown) {
      if (error instanceof Error) {
        const response = new ResponseEntity(EstadoSolicitudHttp.ERROR)
        response.message = error.message
        return response
      } else {
        const response = new ResponseEntity(EstadoSolicitudHttp.ERROR)
        response.message = 'Error desconocido'
        return response
      }
    }
  }
}
