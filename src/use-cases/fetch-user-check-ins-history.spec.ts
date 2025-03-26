import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'

import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { FetchUserCheckInsHistory } from './fetch-user-check-ins-history'

let inMemoryCheckInRepository: InMemoryCheckInRepository
let sut: FetchUserCheckInsHistory

const userCoordinates = {
  userLatitude: -8.0610064,
  userLongitude: -34.8820621
}

describe('Fetch user check-ins history use case', () => {
  beforeEach(async () => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository()
    sut = new FetchUserCheckInsHistory(inMemoryCheckInRepository)
  })

  it('should be able to fetch check-in history', async () => {
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

    const { checkIns } = await sut.execute({
      userId: 'userId',
      page: 1
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gymId' }),
      expect.objectContaining({ gym_id: 'gymId2' })
    ])
  })

  it('should be able to fetch paginated check-ins history', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCheckInRepository.create({
        userId: 'userId',
        gymId: `gymId${i}`,
        ...userCoordinates
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'userId',
      page: 2
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gymId21' }),
      expect.objectContaining({ gym_id: 'gymId22' })
    ])
  })
})
