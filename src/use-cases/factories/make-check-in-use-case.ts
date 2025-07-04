import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfile } from '../get-user-profile'
import { CheckIn } from '../check-in'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gym-repository'

export function makeCheckInUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  const gymRepository = new PrismaGymsRepository()

  const useCase = new CheckIn(checkInRepository, gymRepository)

  return useCase
}
