import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users-repository'

type Params = {
  name: string
  email: string
  password: string
}

export class RegisterUser {
  constructor(
    private usersRepository: UsersRepository
  ) {}

  async execute({ name, email, password }: Params) {
    const emailAlreadyRegistered = await this.usersRepository.findByEmail(email)

    if(emailAlreadyRegistered) {
      throw new Error('E-mail already exists.')
    }

    const password_hash = await hash(password, 6)

    await this.usersRepository.create({
      name,
      email,
      password_hash
    })
  }
}

