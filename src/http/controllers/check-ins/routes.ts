import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { validate } from './validate'
import { history } from './history'
import { metrics } from './metrics'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/check-ins/:gymId', create)
  app.patch('/check-ins/history', history)
  app.patch('/check-ins/metrics', metrics)
  app.patch('/check-ins/:checkInId/validate', validate)
}
