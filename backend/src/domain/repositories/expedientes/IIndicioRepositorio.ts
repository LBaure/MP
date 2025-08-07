import IndicioEntity from '../../entities/expedientes/IndicioEntity'
import ListaIndicioDTO from '../../entities/expedientes/ListaIndicioDTO'

export default interface IIndicioRepositorio {
  obtenerIndicios(idExpediente: number): Promise<ListaIndicioDTO[]>;
  registrarIndicio(indicio: IndicioEntity): Promise<boolean>;
  actualizarIndicio(indicio: IndicioEntity): Promise<boolean>;
  eliminarIndicio(idIndicio: number, idExpediente: number): Promise<boolean>;
  // crearExpediente(expediente: ExpedienteEntity): Promise<boolean>;
  // actualizarExpediente(
  //   expediente: ExpedienteEntity,
  //   idExpediente: number
  // ): Promise<boolean>;
}
