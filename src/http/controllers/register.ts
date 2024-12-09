import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { registerUser } from '@/use-cases/register'

export async function register (request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = bodySchema.parse(request.body)

  try {
    await registerUser({ name, email, password })
  } catch (error: any) {
    return reply.status(409).send({
      message: error.message
    })
  }

  return reply.status(201).send()
}
