import { Router } from 'express'
import ExpedienteRepositorio from '../../../infrastructure/repositories/expedientes/ExpedienteRepositorio'
import ExpedienteUseCase from '../../../application/use-cases/expedientes/ExpedienteUseCase'
import ExpedienteController from '../../controllers/expediente/ExpedienteController'
import indicioRouter from './IndicioRouter'

const expedienteRouter = Router()

const expedienteRepositorio = new ExpedienteRepositorio()
const expedienteUseCase = new ExpedienteUseCase(expedienteRepositorio)
const expedienteController = new ExpedienteController(expedienteUseCase)

expedienteRouter.get('/', expedienteController.obtenerExpedientes)
expedienteRouter.post('/', expedienteController.crearExpediente)
expedienteRouter.get('/estadosExpediente', expedienteController.obtenerEstadosExpedientes)
expedienteRouter.put('/:idExpediente', expedienteController.actualizarExpediente)
expedienteRouter.post('/actualizarMotivo', expedienteController.actualizarMotivo)
expedienteRouter.use('/indicios', indicioRouter)

export default expedienteRouter
