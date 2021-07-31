import { Router } from 'express'
import { UserController } from '../../controllers/UserController'
import { ensureAdmin, ensureAuthenticated } from '../../middlewares'

export const userRoutes = Router()

const userController = new UserController()

// Create
userRoutes.post('/contact', ensureAuthenticated, userController.sendContactMessage)

// Update
userRoutes.put('/user-name', ensureAuthenticated, userController.updateUserName)
