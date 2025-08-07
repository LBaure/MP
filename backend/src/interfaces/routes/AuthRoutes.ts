import { Router } from 'express'
import LoginRepository from '../../infrastructure/repositories/Auth/LoginRepository'
import { LoginUseCase } from '../../application/use-cases/auth/login'
import { AuthController } from '../controllers/AuthController'

const authRoutes = Router()
const loginRepository = new LoginRepository()
const loginUseCase = new LoginUseCase(loginRepository)
const authController = new AuthController(loginUseCase)

authRoutes.post('/login', authController.Login)

export default authRoutes
