import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-checkins-history-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const queryParamsSchema = z.object({
    page: z
      .coerce
      .number()
      .min(1)
      .default(1)
  })

  const { page } = queryParamsSchema.parse(request.query)

  const fetchUserCheckInsHistory = makeFetchUserCheckInsHistoryUseCase()

  const { checkIns } = await fetchUserCheckInsHistory.execute({
    userId: String(request.user.sub),
    page
  })

  return reply.status(200).send({
    checkIns
  })
}
