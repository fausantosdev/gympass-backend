import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { search } from './search'
import { nearby } from './nearby'
import { create } from 'domain'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('gyms', create)
  app.get('gyms/search', search)
  app.get('gyms/nearby', nearby)
}
