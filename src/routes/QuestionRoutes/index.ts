import { Router } from 'express'
import { QuestionController } from '../../controllers/QuestionController'
import { ensureAdmin, ensureAuthenticated } from '../../middlewares'

export const questionRoutes = Router()

const questionController = new QuestionController()

// Create
questionRoutes.post('/question', ensureAdmin, questionController.createQuestion)
questionRoutes.post('/question-answer', ensureAuthenticated, questionController.answerQuestion)

// Read
questionRoutes.get('/question/:id', questionController.getQuestion)
questionRoutes.get('/questions/:subjectId', questionController.getQuestions)

// Update
questionRoutes.put('/question/:id', ensureAdmin, questionController.updateQuestion)

// Delete
questionRoutes.delete('/question/:id', ensureAdmin, questionController.deleteQuestion)
