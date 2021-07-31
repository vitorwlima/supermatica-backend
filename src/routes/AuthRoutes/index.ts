import { Router } from 'express'
import { AuthController } from '../../controllers/AuthController'
import { ensureAuthenticated } from '../../middlewares'

export const authRoutes = Router()

const authController = new AuthController()

// Create
authRoutes.post('/register', authController.register)
authRoutes.post('/authenticate', authController.authenticate)

// Read
authRoutes.get('/refresh-token', authController.getTokenByRefresh)
authRoutes.get('/logout', authController.logout)

// Update
authRoutes.put('/confirm', ensureAuthenticated, authController.confirmAccount)
