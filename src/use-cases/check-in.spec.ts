import { randomUUID } from 'node:crypto'

import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { CheckIn } from './check-in'

let inMemoryUserRepository: InMemoryCheckInRepository
let sut: CheckIn

describe('Check-in use case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryCheckInRepository()
    sut = new CheckIn(inMemoryUserRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: randomUUID(),
      gymId: randomUUID()
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
