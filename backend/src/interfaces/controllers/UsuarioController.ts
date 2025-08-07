import { Request, Response } from 'express'
import { ObtenerUsuariosUseCase } from '../../application/use-cases/usuario/ObtenerUsuariosUseCase'
import { RegistrarUsuarioUseCase } from '../../application/use-cases/usuario/RegistrarUsuarioUseCase'
import UsuarioEntity from '../../domain/entities/UsuarioEntity'

export class UsuarioController {
  private readonly obtenerUsuariosUseCase: ObtenerUsuariosUseCase
  private readonly registrarUsuarioUseCase: RegistrarUsuarioUseCase

  constructor (
    obtenerUsuariosUseCase: ObtenerUsuariosUseCase,
    registrarUsuarioUseCase: RegistrarUsuarioUseCase
  ) {
    this.obtenerUsuariosUseCase = obtenerUsuariosUseCase
    this.registrarUsuarioUseCase = registrarUsuarioUseCase
  }

  ObtenerUsuarios = async (_req: Request, res: Response) => {
    const users = await this.obtenerUsuariosUseCase.executeAsync()
    res.json(users)
  }

  GuardarUsuario = async (request: Request, response: Response) => {
    const data: UsuarioEntity = request.body
    const usuario = await this.registrarUsuarioUseCase.executeAsync(data)
    response.json(usuario)
  }
}
