import express from 'express'
import cors from 'cors'
import { rateLimit } from 'express-rate-limit'

import { config } from './config/env'
import authRoutes from './interfaces/routes/AuthRoutes'
import UsuarioRouter from './interfaces/routes/seguridad/UsuarioRouter'
import expedienteRouter from './interfaces/routes/expedientes/ExpedienteRouter'

const BASE_PREFIX = config.base_prefix
const app = express()
app.use(
  cors({
    origin: '*', // URL del frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Permitir cookies
    allowedHeaders: ['Content-Type', 'Authorization'] // Permitir estos headers
  })
)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 250, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: 'draft-8', // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*`
})
app.use(limiter)
app.use(express.json())
app.get('/', (_req, res) => {
  res.send('Connected to server!')
})
app.use(`/${BASE_PREFIX}/auth`, authRoutes)
app.use(`/${BASE_PREFIX}/seguridad`, UsuarioRouter)
app.use(`/${BASE_PREFIX}/expediente`, expedienteRouter)

app.listen(config.port, () => {
  console.log(
    `Server running on port ${config.port} in ${config.env} mode, version ${config.version}`
  )
})
