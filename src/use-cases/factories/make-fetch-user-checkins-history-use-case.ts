import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { FetchUserCheckInsHistory } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsHistory(checkInsRepository)

  return useCase
}
