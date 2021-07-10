import { Router } from 'express'
import { QuestionController } from '../../controllers/QuestionController'

export const questionRoutes = Router()

const questionController = new QuestionController()

// Create
questionRoutes.post('/question', questionController.createQuestion)

// Read
questionRoutes.get('/questions', questionController.getQuestions)

// Delete
questionRoutes.delete('/question/:id', questionController.deleteQuestion)
