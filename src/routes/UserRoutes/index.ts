import { Router } from 'express'
import { UserController } from '../../controllers/UserController'
import { ensureAdmin, ensureAuthenticated } from '../../middlewares'

export const userRoutes = Router()

const userController = new UserController()

// Read
userRoutes.get('/users', userController.getUsers)
userRoutes.get('/users/:id', userController.getUsers)
userRoutes.get('/admin', ensureAdmin, userController.getAdmin)

// Update
userRoutes.put('/user-name', ensureAuthenticated, userController.updateUserName)

// Delete
userRoutes.delete('/user/:id', userController.deleteUser)
