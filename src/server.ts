import 'reflect-metadata'
import express from 'express'
import 'express-async-errors'

import { handleError } from './middlewares/handleError'

import './database'
import { userRoutes } from './routes'

const app = express()

app.use(express.json())
app.use(userRoutes)
app.use(handleError)

app.listen(3333, () => console.log('SERVER IS RUNNING'))