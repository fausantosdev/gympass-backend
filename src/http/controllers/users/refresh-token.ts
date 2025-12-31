import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function refreshToken (request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify({
      onlyCookie: true// verifica o token apenas nos cookies, justamente porque o refresh token está lá
    })

    const token = await reply.jwtSign(
      {}, {
      sign: {
        sub: String(request.user.sub),
      }
    })

    const refreshToken = await reply.jwtSign(
      {}, {
      sign: {
        sub: String(request.user.sub),
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
