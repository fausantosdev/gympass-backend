import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserEmailAlreadyExistsError } from '@/use-cases/errors/user-email-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register (request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = bodySchema.parse(request.body)

  try {
    const registerUser = makeRegisterUseCase()

    await registerUser.execute({ name, email, password })
  } catch (error: any) {
    if (error instanceof UserEmailAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message
      })
    }

    throw error
  }

  return reply.status(201).send()
}
