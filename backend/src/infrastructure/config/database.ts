import sql from 'mssql'
import { config } from '../../config/env'

interface DbConfig {
  user: string;
  password: string;
  server: string;
  database: string;
  options: {
    encrypt: boolean;
    trustServerCertificate: boolean;
  };
}

class Database {
  // eslint-disable-next-line no-use-before-define
  private static instance: Database
  private poolPromise: Promise<sql.ConnectionPool>

  private constructor () {
    const conf: DbConfig = {
      user: config.db.user,
      password: config.db.password,
      server: config.db.host,
      database: config.db.name,
      options: {
        encrypt: true,
        trustServerCertificate: true
      }
    }

    // Establecer la conexión a la base de datos
    this.poolPromise = sql.connect(conf)
  }

  // Patrón Singleton: devolver la misma instancia de la clase
  public static getInstance (): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  // Método para obtener el pool de conexiones
  public async getPool (): Promise<sql.ConnectionPool> {
    const pool = await this.poolPromise
    return pool
  }

  // Método para ejecutar una consulta
  public async query<T> (query: string): Promise<T[]> {
    const pool = await this.getPool()
    const result = await pool.request().query<T>(query)
    return result.recordset
  }
}

export default Database
