import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUser } from '../register'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUser = new RegisterUser(usersRepository)

  return registerUser
}
