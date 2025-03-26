import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { GetUserMetrics } from './get-user-metrics'

let inMemoryCheckInRepository: InMemoryCheckInRepository
let sut: GetUserMetrics

const userCoordinates = {
  userLatitude: -8.0610064,
  userLongitude: -34.8820621
}

describe('Get user metrics use case', () => {
  beforeEach(async () => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository()
    sut = new GetUserMetrics(inMemoryCheckInRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await inMemoryCheckInRepository.create({
      userId: 'userId',
      gymId: 'gymId',
      ...userCoordinates
    })

    await inMemoryCheckInRepository.create({
      userId: 'userId',
      gymId: 'gymId2',
      ...userCoordinates
    })

    const { checkInsCount } = await sut.execute({
      userId: 'userId'
    })

    expect(checkInsCount).toEqual(2)
  })
})
