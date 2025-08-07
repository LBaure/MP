import EstadosExpedienteEntity from '../../entities/expedientes/EstadosExpedienteEntity'
import ExpedienteEntity from '../../entities/expedientes/ExpedienteEntity'
import ListaExpedienteDTO from '../../entities/expedientes/ListaExpedienteDTO'
import MotivoExpedienteEntity from '../../entities/expedientes/MotivoExpedienteEntity'

export default interface IExpedienteRepositorio {
  obtenerExpedientes(): Promise<ListaExpedienteDTO[]>;
  obtenerEstadosExpedientes(): Promise<EstadosExpedienteEntity[]>;
  crearExpediente(expediente: ExpedienteEntity): Promise<boolean>;
  actualizarExpediente(
    expediente: ExpedienteEntity,
    idExpediente: number
  ): Promise<boolean>;

  actualizarMotivo(motivo: MotivoExpedienteEntity): Promise<boolean>;
}
