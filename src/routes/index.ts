import { Router } from 'express'
import { alternativeRoutes } from './AlternativeRoutes'
import { authRoutes } from './AuthRoutes'
import { questionRoutes } from './QuestionRoutes'
import { subjectRoutes } from './SubjectRoutes'
import { userRoutes } from './UserRoutes'

export const router = Router()

router.use(userRoutes)
router.use(subjectRoutes)
router.use(questionRoutes)
router.use(alternativeRoutes)
router.use(authRoutes)
