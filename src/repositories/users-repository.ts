type UserType = {
  id: string
  name: string
  email: string
  password_hash: string
  created_at: Date
  updated_at: Date
}

type CreateUserType = {
  name: string
  email: string
  password_hash: string
}

interface UsersRepository {
  create(data: CreateUserType): Promise<UserType>
  findByEmail(email: string): Promise<UserType | null>
  findById(id: string): Promise<UserType | null>
}

export {
  UsersRepository,
  UserType,
  CreateUserType
}
