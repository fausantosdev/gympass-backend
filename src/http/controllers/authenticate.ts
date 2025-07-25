import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate (request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = bodySchema.parse(request.body)

  try {
    const authenticate = makeAuthenticateUseCase()

    const { user } = await authenticate.execute({ email, password })

    const token = await reply.jwtSign(
      {}, {
      sign: {
        sub: user.id
      }
    })

    return reply.status(200).send({ token })

  } catch (error: any) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: error.message
      })
    }

    throw error
  }
}
