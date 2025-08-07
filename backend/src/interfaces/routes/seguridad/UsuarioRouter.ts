import { Router } from 'express'
import UsuarioRepositorio from '../../../infrastructure/repositories/seguridad/UsuarioRepositorio'
import UsuarioUseCase from '../../../application/use-cases/seguridad/UsuarioUseCase'
import UsuarioController from '../../controllers/seguridad/UsuarioController'

const UsuarioRouter = Router()

const usuarioRepositorio = new UsuarioRepositorio()
const usuarioUseCase = new UsuarioUseCase(usuarioRepositorio)
const usuarioController = new UsuarioController(usuarioUseCase)

UsuarioRouter.get('/usuarios', usuarioController.obtenerUsuarios)

export default UsuarioRouter
