import { randomUUID } from 'node:crypto'

import { CreateGymType, FindManyNearbyParams, GymsRepository, GymType } from '../gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

class InMemoryGymRepository implements GymsRepository {
  public gyms: GymType[] = []

  async create(data: CreateGymType & { id?: string }) {
    const gym = {
      id: data.id || randomUUID(),
      title: data.title,
      description: data.description,
      phone: data.phone,
      latitude: data.latitude,
      longitude: data.longitude,
      created_at: new Date(),
      updated_at: new Date()
    }

    this.gyms.push(gym)

    return gym
  }


  async findById(id: string) {
    const gyms = this.gyms.find((gym:GymType) => gym.id === id)

    return gyms || null
  }

  async searchMany(query: string, page: number) {
    return this.gyms
      .filter((gym: GymType) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams): Promise<GymType[]> {
    return this.gyms.filter(( gym ) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        { latitude: gym.latitude, longitude: gym.longitude}
      )

      return distance < 10
    })
  }
}

export { InMemoryGymRepository }
