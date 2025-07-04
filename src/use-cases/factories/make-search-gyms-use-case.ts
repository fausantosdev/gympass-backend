import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gym-repository'
import { SearchGyms } from '../search-gyms'

export function makeSearchGymsUseCase() {
  const gymRepository = new PrismaGymsRepository()
  const useCase = new SearchGyms(gymRepository)

  return useCase
}
