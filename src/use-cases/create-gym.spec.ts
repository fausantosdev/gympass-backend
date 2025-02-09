import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGym } from './create-gym'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'

let inMemoryGymRepository: InMemoryGymRepository
let sut: CreateGym

describe('Register use case', () => {
  beforeEach(() => {
    inMemoryGymRepository = new InMemoryGymRepository()
    sut = new CreateGym(inMemoryGymRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      user_id: 'gymId3',
      title: 'Javascript Gym',
      latitude: -8.0623634,
      longitude: -34.8859246
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
