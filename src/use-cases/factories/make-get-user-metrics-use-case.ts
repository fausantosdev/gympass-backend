import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { GetUserMetrics } from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetrics(checkInsRepository)

  return useCase
}
