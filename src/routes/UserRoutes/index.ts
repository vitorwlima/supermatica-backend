import { Router } from 'express'
import { UserController } from '../../controllers/UserController.ts'
import { ensureAdmin, ensureAuthenticated } from '../../middlewares'

export const userRoutes = Router()

const userController = new UserController()

// Create
userRoutes.post('/user', userController.createUser)
userRoutes.post('/authenticate', userController.authenticate)

// Read
userRoutes.get('/users', userController.getUsers)
userRoutes.get('/users/:id', userController.getUsers)