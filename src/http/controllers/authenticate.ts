import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Authenticate } from '@/use-cases/authenticate'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

export async function authenticate (request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = bodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const authenticate = new Authenticate(usersRepository)

    await authenticate.execute({ email, password })
  } catch (error: any) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: error.message
      })
    }

    throw error
  }

  return reply.status(200).send()
}
