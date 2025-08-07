import sql from 'mssql'
import Database from '../../config/Database'
import ListaExpedienteDTO from '../../../domain/entities/expedientes/ListaExpedienteDTO'
import IIndicioRepositorio from '../../../domain/repositories/expedientes/IIndicioRepositorio'
import ListaIndicioDTO from '../../../domain/entities/expedientes/ListaIndicioDTO'
import IndicioEntity from '../../../domain/entities/expedientes/IndicioEntity'
// import handleError from '../../../utils/handleError'

export default class IndicioRepositorio implements IIndicioRepositorio {
  private db: Database

  constructor () {
    this.db = Database.getInstance()
  }

  async eliminarIndicio (idIndicio: number, idExpediente: number): Promise<boolean> {
    try {
      const pool = await this.db.getPool()
      const resultado = await pool
        .request()
        .input('p_idIndicio', sql.Int, idIndicio)
        .input('p_idExpediente', sql.Int, idExpediente)
        .execute('spr_eliminar_indicio')

      const resultadoProcesado = resultado.recordset
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

  async actualizarIndicio (indicio: IndicioEntity): Promise<boolean> {
    try {
      const pool = await this.db.getPool()
      const resultado = await pool
        .request()
        .input('p_idIndicio', sql.Int, indicio.idIndicio)
        .input('p_idExpediente', sql.Int, indicio.idExpediente)
        .input('p_descripcion', sql.NVarChar(500), indicio.descripcion)
        .input('p_color', sql.NVarChar(500), indicio.color)
        .input('p_tamanio', sql.Decimal(10, 2), indicio.tamanio)
        .input('p_peso', sql.Decimal(10, 2), indicio.peso)
        .input('p_ubicacion', sql.NVarChar(500), indicio.ubicacion)
        .input(
          'p_tecnicoRegistra',
          sql.NVarChar(40),
          '0d585756-0363-40a7-80c0-b82e6a21b3e2'
        )
        .execute('spr_actualizar_indicio')

      const resultadoProcesado = resultado.recordset
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

  async obtenerIndicios (idExpediente: number): Promise<ListaIndicioDTO[]> {
    const pool = await this.db.getPool()

    const resultado = await pool
      .request()
      .input('p_idExpediente', sql.Int, idExpediente)
      .execute('spr_obtener_indicios_expediente')

    const resultadoProcesado = resultado.recordset
    return resultadoProcesado
  }

  async registrarIndicio (indicio: IndicioEntity): Promise<boolean> {
    try {
      const pool = await this.db.getPool()

      const resultado = await pool
        .request()
        .input('p_idExpediente', sql.Int, indicio.idExpediente)
        .input('p_descripcion', sql.NVarChar(500), indicio.descripcion)
        .input('p_color', sql.NVarChar(500), indicio.color)
        .input('p_tamanio', sql.Decimal(10, 2), indicio.tamanio)
        .input('p_peso', sql.Decimal(10, 2), indicio.peso)
        .input('p_ubicacion', sql.NVarChar(500), indicio.ubicacion)
        .input(
          'p_tecnicoRegistra',
          sql.NVarChar(40),
          '0d585756-0363-40a7-80c0-b82e6a21b3e2'
        )
        .execute('spr_crear_indicio')

      const resultadoProcesado = resultado.recordset
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
