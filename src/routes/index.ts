import { Router } from 'express';
import { userRoutes } from './UserRoutes';

export const router = Router()

router.use(userRoutes)