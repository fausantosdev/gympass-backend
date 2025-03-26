import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { Authenticate } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository = new InMemoryUserRepository()
let sut = new Authenticate(usersRepository)

describe('Authenticate use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new Authenticate(usersRepository)
  })

  it('should to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() => sut.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    await expect(() => sut.execute({
      email: 'johndoe@example.com',
      password: 'another_password'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
