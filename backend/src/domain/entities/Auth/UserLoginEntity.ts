export class UserLoginEntity {
  public userName?: string
  public password?: string
  constructor (data: {
    userName: number;
    password: string;
  }) {
    Object.assign(this, data)
  }
}
