import { randomUUID } from 'node:crypto'

import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'

import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { CheckIn } from './check-in'

let inMemoryUserRepository: InMemoryCheckInRepository
let sut: CheckIn

describe('Check-in use case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryCheckInRepository()
    sut = new CheckIn(inMemoryUserRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: randomUUID(),
      gymId: randomUUID()
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    const userId = randomUUID()
    const gymId = randomUUID()

    await sut.execute({
      userId,
      gymId
    })

    await expect(() => sut.execute({
      userId,
      gymId
    })).rejects.toBeInstanceOf(Error)
  })
})
