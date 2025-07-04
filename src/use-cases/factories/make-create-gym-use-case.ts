import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gym-repository'
import { CreateGym } from '../create-gym'

export function makeCreateGymUseCase() {
  const gymRepository = new PrismaGymsRepository()
  const useCase = new CreateGym(gymRepository)

  return useCase
}
