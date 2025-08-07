import { Request, Response } from 'express'
import IndicioUseCase from '../../../application/use-cases/expedientes/IndicioUseCase'
import IndicioEntity from '../../../domain/entities/expedientes/IndicioEntity'

export default class ExpedienteController {
  private readonly _IndicioUseCase: IndicioUseCase
  constructor (indicioUseCase: IndicioUseCase) {
    this._IndicioUseCase = indicioUseCase
  }

  obtenerIndicio = async (req: Request, res: Response) => {
    const { idExpediente } = req.params
    const result = await this._IndicioUseCase.obtenerIndicios(
      Number(idExpediente)
    )
    res.json(result)
  }

  registrarIndicio = async (req: Request, res: Response) => {
    const data: IndicioEntity = req.body
    const result = await this._IndicioUseCase.registrarIndicio(data)
    res.json(result)
  }

  actualizarIndicio = async (req: Request, res: Response) => {
    const data: IndicioEntity = req.body
    const result = await this._IndicioUseCase.actualizarIndicio(data)
    res.json(result)
  }

  eliminarIndicio = async (req: Request, res: Response) => {
    const { idIndicio, idExpediente } = req.params
    const result = await this._IndicioUseCase.eliminarIndicio(
      Number(idIndicio),
      Number(idExpediente)
    )
    res.json(result)
  }
}
