import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gym-repository'
import { FetchNearbyGyms } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const gymRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGyms(gymRepository)

  return useCase
}
