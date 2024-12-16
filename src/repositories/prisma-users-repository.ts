import { Prisma } from '@prisma/client'
import { prisma } from '../lib/prisma'

class PrismaUsersRepository {
  async creste(data: Prisma.UserCreateInput)  {
    const user = await prisma.user.create({
      data
    })

    return user
  }
}

export { PrismaUsersRepository }