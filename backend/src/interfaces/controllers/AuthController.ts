import { Request, Response } from 'express'
import { LoginUseCase } from '../../application/use-cases/auth/login'
import { UserLoginEntity } from '../../domain/entities/Auth/UserLoginEntity'

export class AuthController {
  private readonly loginUseCase: LoginUseCase
  constructor (loginUseCase: LoginUseCase) {
    this.loginUseCase = loginUseCase
  }

  Login = async (req: Request, res: Response) => {
    const loginData: UserLoginEntity = req.body
    const response = await this.loginUseCase.executeAsync(loginData)
    res.json(response)
  }
}
