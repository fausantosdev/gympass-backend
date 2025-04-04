import { CheckIn as CheckInModel } from '@prisma/client'

import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { MaxNumbersOfCkeckInsError } from './errors/max-numbers-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

type Params = {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

type CheckInResponse = {
  checkIn: CheckInModel
}

export class CheckIn {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({ userId, gymId, userLatitude, userLongitude }: Params): Promise<CheckInResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if(!gym) throw new ResourceNotFoundError()

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude
      },
      {
        latitude: gym.latitude,
        longitude: gym.longitude
      }
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if(distance > MAX_DISTANCE_IN_KILOMETERS) throw new MaxDistanceError()

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

    if(checkInOnSameDay) throw new MaxNumbersOfCkeckInsError()

    const checkIn = await this.checkInsRepository.create({
      userId,
      gymId
    })

    return { checkIn }
  }
}

