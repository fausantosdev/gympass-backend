import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { ValidateCheckIn } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckIn(checkInsRepository)

  return useCase
}
