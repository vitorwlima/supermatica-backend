import express from 'express'
import './database'
import { handleError } from './middlewares/handleError'

const app = express()

app.use(express.json())
app.use(handleError)

app.listen(3333, () => console.log('SERVER IS RUNNING'))