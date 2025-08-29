import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90// Precisa ser menor ou igual a 90, tanto positivo quanto negativo
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, description, phone, latitude, longitude } = bodySchema.parse(request.body)

  const createGym = makeCreateGymUseCase()

  await createGym.execute({
    title,
    phone: phone!,
    description: description!,
    latitude,
    longitude
  })

  return reply.status(201).send()
}
