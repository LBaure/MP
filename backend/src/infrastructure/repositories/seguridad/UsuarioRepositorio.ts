import UsuarioEntity from '../../../domain/entities/seguridad/UsuarioEntity'
import IUsuarioRepositorio from '../../../domain/repositories/seguridad/IUsuarioRepositorio'
import Database from '../../config/database'

export default class UsuarioRepositorio implements IUsuarioRepositorio {
  async obetenerUsuarios (): Promise<UsuarioEntity[]> {
    const db = Database.getInstance()

    const stringSql = 'SELECT * FROM Usuarios'

    const result = await db.query<UsuarioEntity>(stringSql)
    // const usuarios: UsuarioEntity[] = result.map(row => {
    //   return new UsuarioEntity({
    //     userId: row.user_id,
    //     firstName: row.first_name,
    //     lastName: row.last_name,
    //     userName: row.username,
    //     email: row.email,
    //     phoneNumber: row.phone_number,
    //     accountPicture: row.account_picture,
    //     accountCreated: row.account_created,
    //     accountUpdated: row.account_updated,
    //     idAccountStatus: row.id_account_status
    //   })
    // })
    return result
  }
}
