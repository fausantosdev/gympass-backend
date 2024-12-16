import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users-repository'
import { UserEmailAlreadyExistsError } from './errors/user-email-already-exists-error'

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
      throw new UserEmailAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    await this.usersRepository.create({
      name,
      email,
      password_hash
    })
  }
}

