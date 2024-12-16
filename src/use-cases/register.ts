import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'

type Params = {
  name: string
  email: string
  password: string
}

export async function registerUser({ name, email, password }: Params) {
  const emailAlreadyRegistered = await prisma.user.findUnique({
    where: { email }
  })

  if(emailAlreadyRegistered) {
    throw new Error('E-mail already exists.')
  }

  const password_hash = await hash(password, 6)

  const prismaUsersRepository = new PrismaUsersRepository()

  await prismaUsersRepository.creste({
    name,
    email,
    password_hash
  })
}
