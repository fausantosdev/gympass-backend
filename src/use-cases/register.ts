import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users-repository'
import { UserEmailAlreadyExistsError } from './errors/user-email-already-exists-error'
import { User } from '@prisma/client'

type Params = {
  name: string
  email: string
  password: string
}

type RegisterUserResponse = {
  user: User
}

export class RegisterUser {
  constructor(
    private usersRepository: UsersRepository
  ) {}

  async execute({ name, email, password }: Params): Promise<RegisterUserResponse> {
    const emailAlreadyRegistered = await this.usersRepository.findByEmail(email)

    if(emailAlreadyRegistered) {
      throw new UserEmailAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash
    })

    return { user }
  }
}

