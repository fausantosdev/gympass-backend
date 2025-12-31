import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type Params = {
  userId: string
}

type GetUserProfileResponse = {
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

export class GetUserProfile {
  constructor(
    private usersRepository: UsersRepository
  ) {}

  async execute({ userId }: Params): Promise<GetUserProfileResponse> {
    const user = await this.usersRepository.findById(userId)

    if(!user) throw new ResourceNotFoundError()

    return { user }
  }
}
