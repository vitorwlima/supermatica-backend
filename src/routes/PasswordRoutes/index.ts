import { Router } from 'express'
import { PasswordController } from '../../controllers/PasswordController'
import { ensureAuthenticated } from '../../middlewares'

export const passwordRoutes = Router()

const passwordController = new PasswordController()

// Create
passwordRoutes.post('/password-change', ensureAuthenticated, passwordController.sendChangePassword)
passwordRoutes.post('/password-forgot', passwordController.sendForgotPassword)

// Update
passwordRoutes.put('/password-change', ensureAuthenticated, passwordController.changePassword)
passwordRoutes.put('/password-forgot', passwordController.changeForgottenPassword)
