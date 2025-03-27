import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { SearchGyms } from './search-gyms'

let inMemoryGymRepository: InMemoryGymRepository
let sut: SearchGyms

const userCoordinates = {
  userLatitude: -8.0610064,
  userLongitude: -34.8820621
}

describe('Search gyms use case', () => {
  beforeEach(async () => {
    inMemoryGymRepository = new InMemoryGymRepository()
    sut = new SearchGyms(inMemoryGymRepository)
  })

  it('should be able to search for gyms', async () => {
    await inMemoryGymRepository.create({
      user_id: 'gymId3',
      title: 'Javascript Gym',
      latitude: -8.0623634,
      longitude: -34.8859246
    })

    await inMemoryGymRepository.create({
      user_id: 'gymId3',
      title: 'Typescript Gym',
      latitude: -8.0623634,
      longitude: -34.8859246
    })

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 1
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym' }),
    ])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymRepository.create({
        user_id: `userId${i}`,
        title: `Gym - ${i}`,
        latitude: -8.0623634,
        longitude: -34.8859246
      })
    }

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym - 21' }),
      expect.objectContaining({ title: 'Gym - 22' })
    ])
  })
})
