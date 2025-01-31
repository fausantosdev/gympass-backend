import { randomUUID } from 'node:crypto'

import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'

import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { CheckIn } from './check-in'

let inMemoryCheckInRepository: InMemoryCheckInRepository
let sut: CheckIn

describe('Check-in use case', () => {
  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository()
    sut = new CheckIn(inMemoryCheckInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: randomUUID(),
      gymId: randomUUID()
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    const a = await sut.execute({
      userId: 'userId',
      gymId: 'gymId'
    })
    console.log('A: ', a.checkIn.created_at)

    await expect(() => sut.execute({
      userId: 'userId',
      gymId: 'gymId'
    })).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))
    const a = await sut.execute({
      userId: 'userId',
      gymId: 'gymId'
    })

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'userId',
      gymId: 'gymId'
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
