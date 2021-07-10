import { Router } from 'express'
import { UserController } from '../../controllers/UserController'

export const userRoutes = Router()

const userController = new UserController()

// Create
userRoutes.post('/user', userController.createUser)
userRoutes.post('/authenticate', userController.authenticate)

// Read
userRoutes.get('/users', userController.getUsers)
userRoutes.get('/users/:id', userController.getUsers)

// Delete
userRoutes.delete('/user/:id', userController.deleteUser)