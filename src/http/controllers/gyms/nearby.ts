import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const queryParamsSchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    })
  })

  const { latitude, longitude } = queryParamsSchema.parse(request.body)

  const fetchNearbyGyms = makeFetchNearbyGymsUseCase()

  const nearbyGyms = await fetchNearbyGyms.execute({
    userLatitude: latitude,
    userLongitude: longitude
  })

  return reply.status(201).send({
    nearbyGyms
  })
}
