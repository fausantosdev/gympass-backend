import * as bcrypt from 'bcryptjs'

import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

type Params = {
  email: string
  password: string
}

type AuthenticateResponse = {
  user: {
    id: string
    name: string
    email: string
    password_hash: string
    role: string
    created_at: Date
    updated_at: Date
  }
}

export class Authenticate {
  constructor(
    private usersRepository: UsersRepository
  ) {}

  async execute({ email, password }: Params): Promise<AuthenticateResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if(!user) throw new InvalidCredentialsError()

    const doesPasswordMatches = await bcrypt.compare(password, user.password_hash)

    if(!doesPasswordMatches) throw new InvalidCredentialsError()

    return { user }
  }
}
