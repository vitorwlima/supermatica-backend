import { Router } from 'express'
import { UserController } from '../../controllers/UserController.ts'

export const userRoutes = Router()

const userController = new UserController()

userRoutes.post('/user', userController.createUser)