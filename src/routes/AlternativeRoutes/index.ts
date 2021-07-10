import { Router } from 'express'
import { AlternativeController } from '../../controllers/AlternativeController'
import { ensureAdmin } from '../../middlewares'

export const alternativeRoutes = Router()

const alternativeController = new AlternativeController()

// Create
alternativeRoutes.post('/alternative', ensureAdmin, alternativeController.createAlternative)

// Delete
alternativeRoutes.delete('/alternative/:id', ensureAdmin, alternativeController.deleteAlternative)
