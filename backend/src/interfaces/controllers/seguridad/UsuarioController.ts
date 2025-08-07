import { Request, Response } from 'express'
import UsuarioUseCase from '../../../application/use-cases/seguridad/UsuarioUseCase'

export default class UsuarioController {
  private readonly _UserUseCase: UsuarioUseCase
  constructor (userUseCase: UsuarioUseCase) {
    this._UserUseCase = userUseCase
  }

  obtenerUsuarios = async (_req: Request, res: Response) => {
    const result = await this._UserUseCase.obtenerUsuarios()
    res.json(result)
  }
}
