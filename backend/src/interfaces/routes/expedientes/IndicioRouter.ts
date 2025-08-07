import { Router } from 'express'
import IndicioUseCase from '../../../application/use-cases/expedientes/IndicioUseCase'
import IndicioRepositorio from '../../../infrastructure/repositories/expedientes/IndicioRepositorio'
import IndicioController from '../../controllers/expediente/IndicioController'

const indicioRouter = Router()

const indicioRepositorio = new IndicioRepositorio()
const indicioUseCase = new IndicioUseCase(indicioRepositorio)
const indicioController = new IndicioController(indicioUseCase)

indicioRouter.get('/:idExpediente', indicioController.obtenerIndicio)
indicioRouter.post('/', indicioController.registrarIndicio)
indicioRouter.put('/:idIndicio', indicioController.actualizarIndicio)
indicioRouter.delete(
  '/:idIndicio/:idExpediente',
  indicioController.eliminarIndicio
)
// indicioRouter.put('/:idExpediente', indicioController.actualizarExpediente)

export default indicioRouter
