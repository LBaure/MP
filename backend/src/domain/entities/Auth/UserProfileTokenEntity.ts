export default class UserProfileTokenEntity {
  public userName?: string
  public email?: string
  public token?: string

  constructor (data: {
    userName: string ;
    email: string;
    token: string;
  }) {
    // Usando Object.assign para asignar las propiedades del objeto de datos
    Object.assign(this, data)
  }
}
