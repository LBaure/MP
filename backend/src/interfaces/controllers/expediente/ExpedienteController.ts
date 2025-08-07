import { Request, Response } from 'express'
import ExpedienteUseCase from '../../../application/use-cases/expedientes/ExpedienteUseCase'
import ExpedienteEntity from '../../../domain/entities/expedientes/ExpedienteEntity'
import MotivoExpedienteEntity from '../../../domain/entities/expedientes/MotivoExpedienteEntity'

export default class ExpedienteController {
  private readonly _ExpedienteUseCase: ExpedienteUseCase
  constructor (expedienteUseCase: ExpedienteUseCase) {
    this._ExpedienteUseCase = expedienteUseCase
  }

  obtenerExpedientes = async (_req: Request, res: Response) => {
    const result = await this._ExpedienteUseCase.obtenerExpedientes()
    res.json(result)
  }

  obtenerEstadosExpedientes = async (_req: Request, res: Response) => {
    const result = await this._ExpedienteUseCase.obtenerEstadosExpedientes()
    res.json(result)
  }

  crearExpediente = async (req: Request, res: Response) => {
    const data: ExpedienteEntity = req.body
    const result = await this._ExpedienteUseCase.crearExpediente(data)
    res.json(result)
  }

  actualizarExpediente = async (req: Request, res: Response) => {
    const { idExpediente } = req.params
    const data: ExpedienteEntity = req.body
    const result = await this._ExpedienteUseCase.actualizarExpediente(
      data,
      Number(idExpediente)
    )
    res.json(result)
  }

  actualizarMotivo = async (req: Request, res: Response) => {
    const data: MotivoExpedienteEntity = req.body
    const result = await this._ExpedienteUseCase.actualizarMotivo(data)
    res.json(result)
  }
}
