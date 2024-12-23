import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { UsersRepository } from '../users-repository'

class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    return user
  }
}

export { PrismaUsersRepository }
