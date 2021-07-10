import { Router } from 'express'
import { SubjectController } from '../../controllers/SubjectController'

export const subjectRoutes = Router()

const subjectController = new SubjectController()

// Create
subjectRoutes.post('/subject', subjectController.createSubject)

// Read
subjectRoutes.get('/subjects/:id', subjectController.getSubject)
subjectRoutes.get('/subjects', subjectController.getSubject)
