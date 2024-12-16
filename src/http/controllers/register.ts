import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { RegisterUser } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserEmailAlreadyExistsError } from '@/use-cases/errors/user-email-already-exists-error'

export async function register (request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = bodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUser = new RegisterUser(usersRepository)

    await registerUser.execute({ name, email, password })
  } catch (error: any) {
    if (error instanceof UserEmailAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message
      })
    }

    return reply.status(500).send({
      message: error.message
    })
  }

  return reply.status(201).send()
}
