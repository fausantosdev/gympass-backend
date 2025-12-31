import { FastifyInstance } from 'fastify'

import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { refreshToken } from './refresh-token'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refreshToken)

  // Authenticated
  app.get('/me', { onRequest: [ verifyJwt ] }, profile)
}
