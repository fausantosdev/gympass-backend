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
      {
        role: user.role
      }, {
      sign: {
        sub: user.id
      }
    })

    const refreshToken = await reply.jwtSign(
      {
        role: user.role
      }, {
      sign: {
        sub: user.id,
        expiresIn: '7d'
      }
    })

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true, // TODO: mudar para true quando for para produção (https)
        httpOnly: true,// não pode ser acessado via JavaScript
        sameSite: true,// evita ataques CSRF, permite que o cookie seja enviado apenas em requisições do mesmo site
        //maxAge: 7 * 24 * 60 * 60 // 7 dias em segundos
      })
      .status(200)
      .send({ token })

  } catch (error: any) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: error.message
      })
    }

    throw error
  }
}
