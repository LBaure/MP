import sql from 'mssql'
import ExpedienteEntity from '../../../domain/entities/expedientes/ExpedienteEntity'
import IExpedienteRepositorio from '../../../domain/repositories/expedientes/IExpedienteRepositorio'
import Database from '../../config/Database'
import ListaExpedienteDTO from '../../../domain/entities/expedientes/ListaExpedienteDTO'
import EstadosExpedienteEntity from '../../../domain/entities/expedientes/EstadosExpedienteEntity'
import MotivoExpedienteEntity from '../../../domain/entities/expedientes/MotivoExpedienteEntity'

export default class ExpedienteRepositorio implements IExpedienteRepositorio {
  private db: Database

  constructor () {
    this.db = Database.getInstance()
  }

  async actualizarMotivo (motivo: MotivoExpedienteEntity): Promise<boolean> {
    try {
      const pool = await this.db.getPool()

      const resultado = await pool
        .request()
        .input('p_idExpediente', sql.Int, motivo.idExpediente)
        .input('p_codigoEstado', sql.NVarChar(100), motivo.codigoEstado)
        .input('p_motivoRechazo', sql.NVarChar(500), motivo.motivoRechazo)
        .input(
          'p_usuario',
          sql.NVarChar(40),
          '0d585756-0363-40a7-80c0-b82e6a21b3e2'
        )

        .execute('spr_actualizar_motivo_expediente')

      const resultadoProcesado = resultado.recordset
      console.log('Expediente creado exitosamente:', resultadoProcesado)
      if (resultadoProcesado.length === 0) {
        return false
      } else if (resultadoProcesado[0].estado === 'ok') {
        return true
      } else {
        throw new Error(resultadoProcesado[0].mensaje)
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async obtenerEstadosExpedientes (): Promise<EstadosExpedienteEntity[]> {
    const db = Database.getInstance()

    const stringSql = `
    SELECT 
      idEstado,
      nombreEstado,
      descripcion,
      codigo
    FROM ExpedientesEstados`
    const result = await db.query<EstadosExpedienteEntity>(stringSql)

    return result
  }

  async actualizarExpediente (
    expediente: ExpedienteEntity,
    idExpediente: number
  ): Promise<boolean> {
    try {
      const pool = await this.db.getPool()

      const resultado = await pool
        .request()
        .input('p_idExpediente', sql.Int, idExpediente)
        .input('p_lugarHechos', sql.NVarChar(255), expediente.lugarHechos)
        .input('p_tipoDelito', sql.NVarChar(100), expediente.tipoDelito)
        .input(
          'p_usuario',
          sql.NVarChar(40),
          '0d585756-0363-40a7-80c0-b82e6a21b3e2'
        )
        .input('p_observaciones', sql.NVarChar(500), expediente.observaciones) // Enviar como NULL
        .execute('spr_actualizar_expediente')

      const resultadoProcesado = resultado.recordset
      console.log('Expediente actualizado exitosamente:', resultadoProcesado)
      if (resultadoProcesado.length === 0) {
        return false
      } else if (resultadoProcesado[0].estado === 'ok') {
        return true
      } else {
        throw new Error(resultadoProcesado[0].mensaje)
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async crearExpediente (expediente: ExpedienteEntity): Promise<boolean> {
    try {
      const pool = await this.db.getPool()

      const resultado = await pool
        .request()
        .input('p_lugarHechos', sql.NVarChar(255), expediente.lugarHechos)
        .input('p_tipoDelito', sql.NVarChar(100), expediente.tipoDelito)
        .input(
          'p_tecnicoRegistra',
          sql.NVarChar(40),
          '0d585756-0363-40a7-80c0-b82e6a21b3e2'
        )
        .input('p_observaciones', sql.NVarChar(500), expediente.observaciones) // Enviar como NULL
        .execute('spr_crear_expediente')

      const resultadoProcesado = resultado.recordset
      console.log('Expediente creado exitosamente:', resultadoProcesado)
      if (resultadoProcesado.length === 0) {
        return false
      } else if (resultadoProcesado[0].estado === 'ok') {
        return true
      } else {
        throw new Error(resultadoProcesado[0].mensaje)
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async obtenerExpedientes (): Promise<ListaExpedienteDTO[]> {
    const db = Database.getInstance()

    const stringSql = `
    SELECT 
      e.idExpediente,
      e.lugarHechos,
      e.tipoDelito,
      u.nombre + ' ' + u.apellido AS  tecnicoRegistra,
      FORMAT(e.fechaCreacion, 'dd/MM/yyyy HH:mm:ss') AS fechaCreacion,
      FORMAT(e.fechaUltimaActualizacion, 'dd/MM/yyyy HH:mm:ss') AS fechaUltimaActualizacion,
      COALESCE(ua.nombre + ' ' + ua.apellido, '') AS usuarioUltimaActualizacion,
      e.idEstado,
      ee.codigo as codigoEstado,
      ee.nombreEstado,
      e.observaciones,
      (SELECT COUNT(*) FROM Indicios WHERE idExpediente = e.idExpediente) cantidadIndicios
    FROM Expedientes e
    INNER JOIN ExpedientesEstados ee
    ON ee.idEstado = e.idEstado
    INNER JOIN Usuarios u
    ON u.idUsuario = e.tecnicoRegistra
    LEFT JOIN Usuarios ua
    ON ua.idUsuario = e.usuarioUltimaActualizacion`
    const result = await db.query<ListaExpedienteDTO>(stringSql)

    return result
  }
}
