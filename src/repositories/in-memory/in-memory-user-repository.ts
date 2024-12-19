
import { CreateUserType, UsersRepository, UserType } from '../users-repository'

class InMemoryUserRepository implements UsersRepository {
  public users: UserType[] = []

  async create(data: CreateUserType) {
    const user = {
      id: 'id',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      updated_at: new Date()
    }

    this.users.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.users.find((user: UserType) => user.email === email)

    return user || null
  }
}

export { InMemoryUserRepository }
