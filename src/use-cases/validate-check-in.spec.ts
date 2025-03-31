import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'

import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { ValidateCheckIn } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryCheckInRepository: InMemoryCheckInRepository

let sut: ValidateCheckIn

const userCoordinates = {
  userLatitude: -8.0610064,
  userLongitude: -34.8820621
}

const distantGymCoordinates = {
  latitude: -8.0623634,
  longitude: -34.8859246
}

describe('Validate check-in use case', () => {
  beforeEach(async () => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository()
    sut = new ValidateCheckIn(inMemoryCheckInRepository)

    // vi.useFakeTimers()
  })

  afterEach(() => {
    // vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await inMemoryCheckInRepository.create({
      userId: 'userId',
      gymId: 'gymId',
      ...userCoordinates
    })

    const { checkIn } = await sut.execute({ checkInId: createdCheckIn.id })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(inMemoryCheckInRepository.checkIns[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(
      sut.execute(
        { checkInId: 'inexistent-check-in-id' }
      )
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
