import { RowDataPacket } from 'mysql2'
import { UserLoginEntity } from '../../../domain/entities/Auth/UserLoginEntity'
import UserProfileTokenEntity from '../../../domain/entities/Auth/UserProfileTokenEntity'
import ILoginRepository from '../../../domain/repositories/Auth/ILoginRepository'
import { Database } from '../../config/Database'

interface UserProfileRow extends RowDataPacket {
  username: string;
  email: string;
  token: string;
}

export default class LoginRepository implements ILoginRepository {
  async validateUser (userProfile: UserLoginEntity): Promise<boolean> {
    const userName = userProfile.userName
    const password = userProfile.password
    const db = await Database.getInstance()
    const sqlCmd = `SELECT Count(1) count FROM usuarios WHERE username = '${userName}' AND password = '${password}' AND is_active = 1`
    const [rows] = await db.getConnection().query(sqlCmd, [userName, password])
    const response = JSON.parse(JSON.stringify(rows))
    return response[0].count > 0
  }

  async getUserProfile (userProfile: UserLoginEntity): Promise<UserProfileTokenEntity> {
    const userName = userProfile.userName
    const password = userProfile.password
    const db = await Database.getInstance()
    const sqlCmd = `SELECT username, email FROM usuarios WHERE username = '${userName}' AND password = '${password}' AND is_active = 1`
    const [rows] = await db
      .getConnection()
      .execute<UserProfileRow[]>(sqlCmd, [userName, password])
    const response: UserProfileTokenEntity = {
      userName: rows[0].username,
      email: rows[0].email
    }
    return response
  }
}
