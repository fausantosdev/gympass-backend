import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

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

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash
    }
  })
}
