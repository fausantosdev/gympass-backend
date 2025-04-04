import { CheckInsRepository, CheckInType } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { MaxNumbersOfCkeckInsError } from './errors/max-numbers-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

type ValidateCheckInRequest = {
  checkInId: string
}

type ValidateCheckInResponse = {
  checkIn: CheckInType
}

export class ValidateCheckIn {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) {}

  async execute({ checkInId }: ValidateCheckInRequest): Promise<ValidateCheckInResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if(!checkIn) throw new ResourceNotFoundError()

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes'
    )

    if(distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    const validatedCheckIn = await this.checkInsRepository.save(checkIn)

    return { checkIn: validatedCheckIn }
  }
}
