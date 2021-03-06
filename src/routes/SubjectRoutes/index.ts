import { Router } from 'express'
import { SubjectController } from '../../controllers/SubjectController'
import { ensureAdmin, ensureAuthenticated } from '../../middlewares'

export const subjectRoutes = Router()

const subjectController = new SubjectController()

// Create
subjectRoutes.post('/subject', ensureAdmin, subjectController.createSubject)

// Read
subjectRoutes.get('/subjects/:slug', ensureAuthenticated, subjectController.getSubject)
subjectRoutes.get('/subjects', ensureAuthenticated, subjectController.getSubject)

// Update
subjectRoutes.put('/subject/:id', ensureAdmin, subjectController.updateSubject)

// Delete
subjectRoutes.delete('/subject/:id', ensureAdmin, subjectController.deleteSubject)
