import { Router } from 'express'
import { UserController } from '../../controllers/UserController'
import { ensureAdmin } from '../../middlewares'

export const userRoutes = Router()

const userController = new UserController()

// Create
userRoutes.post('/user', userController.createUser)
userRoutes.post('/authenticate', userController.authenticate)
userRoutes.post('/authenticateAdmin', userController.authenticateAdmin)

// Read
userRoutes.get('/users', userController.getUsers)
userRoutes.get('/users/:id', userController.getUsers)
userRoutes.get('/admin', ensureAdmin, userController.getAdmin)

// Delete
userRoutes.delete('/user/:id', userController.deleteUser)
