import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'

import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { CheckIn } from './check-in'
import { MaxNumbersOfCkeckInsError } from './errors/max-numbers-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let inMemoryCheckInRepository: InMemoryCheckInRepository
let inMemoryGymRepository: InMemoryGymRepository
let sut: CheckIn

const userCoordinates = {
  userLatitude: -8.0610064,
  userLongitude: -34.8820621
}

const distantGymCoordinates = {
  latitude: -8.0623634,
  longitude: -34.8859246
}

describe('Check-in use case', () => {
  beforeEach(async () => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository()
    inMemoryGymRepository = new InMemoryGymRepository()

    sut = new CheckIn(
        inMemoryCheckInRepository,
        inMemoryGymRepository
      )

    await inMemoryGymRepository.create({
      id: 'gymId',
      user_id: 'userId',
      title: 'Academia Corpo Vivo',
      description: 'Academia mais famosa da cidade',
      phone: '88888888888',
      latitude: -8.0610064,
      longitude: -34.8820621
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'userId',
      gymId: 'gymId',
      ...userCoordinates
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'userId',
      gymId: 'gymId',
      ...userCoordinates
    })

    await expect(() => sut.execute({
      userId: 'userId',
      gymId: 'gymId',
      ...userCoordinates
    })).rejects.toBeInstanceOf(MaxNumbersOfCkeckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'userId',
      gymId: 'gymId',
      ...userCoordinates
    })

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'userId',
      gymId: 'gymId',
      ...userCoordinates
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    await inMemoryGymRepository.create({
      id: 'gymId2',
      user_id: 'userID2',
      title: 'Academia Corpo Vivo',
      description: 'Academia mais famosa da cidade',
      phone: '88888888888',
      ...distantGymCoordinates
    })

    await expect(() => sut.execute({
      userId: 'userId',
      gymId: 'gymId2',
      ...userCoordinates
    })).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
