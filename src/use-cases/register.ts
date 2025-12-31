import * as bcrypt from 'bcryptjs'

import { UsersRepository, UserType } from '@/repositories/users-repository'
import { UserEmailAlreadyExistsError } from './errors/user-email-already-exists-error'

type Params = {
  name: string
  email: string
  password: string
  role?: string
}

type RegisterUserResponse = {
  user: UserType
}

export class RegisterUser {
  constructor(
    private usersRepository: UsersRepository
  ) {}

  async execute({ name, email, password, role }: Params): Promise<RegisterUserResponse> {
    const emailAlreadyRegistered = await this.usersRepository.findByEmail(email)

    if(emailAlreadyRegistered) {
      throw new UserEmailAlreadyExistsError()
    }

    const password_hash = await bcrypt.hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      role
    })

    return { user }
  }
}

