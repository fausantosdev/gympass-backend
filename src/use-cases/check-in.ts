import { CheckIn as CheckInModel } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

type Params = {
  userId: string
  gymId: string
}

type CheckInResponse = {
  checkIn: CheckInModel
}

export class CheckIn {
  constructor(
    private checkInsRepository: CheckInsRepository
  ) {}

  async execute({ userId, gymId }: Params): Promise<CheckInResponse> {
    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

    if(checkInOnSameDay) throw new Error()

    const checkIn = await this.checkInsRepository.create({
      userId,
      gymId
    })

    return { checkIn }
  }
}

