import dotenv from 'dotenv'
dotenv.config()

import 'reflect-metadata'
import express from 'express'
import 'express-async-errors'

import { handleError } from './middlewares'

import './database'
import { router } from './routes'


const app = express()

app.use(express.json())
app.use(router)
app.use(handleError)

app.listen(3333, () => console.log('SERVER IS RUNNING'))