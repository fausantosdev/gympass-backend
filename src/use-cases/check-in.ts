import { CheckIn as CheckInModel } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-in-repository'

type Params = {
  userId: string
  gymId: string
}

type CheckInResponse = {
  checkIn: CheckInModel
}

export class CheckIn {
  constructor(
    private checkInRepository: CheckInRepository
  ) {}

  async execute({ userId, gymId }: Params): Promise<CheckInResponse> {
    const checkIn = await this.checkInRepository.create({
      userId,
      gymId
    })

    return { checkIn }
  }
}

