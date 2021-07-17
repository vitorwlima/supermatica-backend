import { Router } from 'express'
import { AuthController } from '../../controllers/AuthController'

export const authRoutes = Router()

const authController = new AuthController()

// Create
authRoutes.post('/authenticate', authController.authenticate)
authRoutes.post('/authenticateAdmin', authController.authenticateAdmin)

// Read
authRoutes.get('/refresh-token/:refreshTokenId', authController.getTokenByRefresh)
