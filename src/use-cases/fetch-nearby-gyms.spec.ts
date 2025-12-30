import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { FetchNearbyGyms } from './fetch-nearby-gyms'

let inMemoryGymRepository: InMemoryGymRepository
let sut: FetchNearbyGyms

const userCoordinates = {
  userLatitude: -8.0610064,
  userLongitude: -34.8820621
}

const nearbyGymCoordinates = {
  latitude: -8.060762,
  longitude: -34.881666
}

const distantGymCoordinates = {
  latitude:-7.964660,
  longitude: -34.916624
}

describe('Fetch nearby gyms use case', () => {
  beforeEach(async () => {
    inMemoryGymRepository = new InMemoryGymRepository()
    sut = new FetchNearbyGyms(inMemoryGymRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await inMemoryGymRepository.create({
      title: 'Nearby Gym',
      ...nearbyGymCoordinates
    })

    await inMemoryGymRepository.create({
      title: 'Distant Gym',
      ...distantGymCoordinates
    })

    const { gyms } = await sut.execute(userCoordinates)

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Nearby Gym' }),
    ])
  })
})
