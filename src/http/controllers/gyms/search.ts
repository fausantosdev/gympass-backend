import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const queryParamsSchema = z.object({
    q: z.string(),
    page: z
      .coerce
      .number()
      .min(1)
      .default(1)
  })

  const { q, page } = queryParamsSchema.parse(request.query)

  const searchGyms = makeSearchGymsUseCase()

  const gym = await searchGyms.execute({
    query: q,
    page
  })

  return reply.status(201).send({
    gym
  })
}
