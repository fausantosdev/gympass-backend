import dayjs from 'dayjs'
import { prisma } from '@/lib/prisma'
import { CheckInsRepository, CheckInType, CreateCheckInType } from '../check-ins-repository'

class PrismaCheckInsRepository implements CheckInsRepository{
  async create(data: CreateCheckInType) {
    const checkIn = await prisma.checkIn.create({
      data: {
        user_id: data.userId,
        gym_id: data.gymId
      }
    })

    return checkIn
  }

  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: { id }
    })

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate()
        }
      }
    })

    return checkIn
  }

  async findManyByUserId(id: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: id
      },
      take: 20,
      skip: (page - 1) * 20
    })

    return checkIns
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId
      }
    })

    return count
  }

  async save(data: CheckInType) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id
      },
      data
    })

    return checkIn
  }
}

export { PrismaCheckInsRepository }
