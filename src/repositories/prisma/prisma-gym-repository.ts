import { prisma } from '@/lib/prisma';
import { CreateGymType, FindManyNearbyParams, GymsRepository, GymType } from '../gyms-repository'

class PrismaGymsRepository implements GymsRepository {
  async create(data: CreateGymType): Promise<GymType> {
    const gym = await prisma.gym.create({
      data
    })

    return gym
  }

  async findById(id: string): Promise<GymType | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id
      }
    })

    return gym
  }

  async searchMany(query: string, page: number): Promise<GymType[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query
        },
      },
      take: 20,
      skip: (page - 1) * 20
    })

    return gyms
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams): Promise<GymType[]> {
    console.log('Fetching nearby gyms for coordinates:', latitude, longitude)
    const gyms = await prisma.$queryRaw<GymType[]>`
      SELECT * FROM gyms g
        WHERE ( 6371 * acos(
          cos(radians(${latitude}))
          * cos(radians(g.latitude))
          * cos(radians(g.longitude) - radians(${longitude}))
          + sin(radians(${latitude})) * sin(radians(g.latitude))
        )) <= 10
    `

    return gyms
  }
}

export { PrismaGymsRepository }
