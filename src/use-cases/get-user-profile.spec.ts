import { expect, describe, it, beforeEach } from 'vitest'
import { hashSync } from 'bcryptjs'
import { GetUserProfile } from './get-user-profile'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryUserRepository: InMemoryUserRepository
let sut: GetUserProfile

describe('Get user profile use case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new GetUserProfile(inMemoryUserRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hashSync('123456', 6)
    })

    const { user } = await sut.execute({ userId: createdUser.id })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(
      sut.execute({
        userId: 'non-existing-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
