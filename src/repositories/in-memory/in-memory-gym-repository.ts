import { randomUUID } from 'node:crypto'

import { CreateGymType, GymsRepository, GymType } from '../gyms-repository'

class InMemoryGymRepository implements GymsRepository {
  public gyms: GymType[] = []

  async create(data: CreateGymType) {
    const gym = {
      id: data.id || randomUUID(),
      user_id: data.user_id,
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
    const gyms = this.gyms.find((user:GymType) => user.id === id)

    return gyms || null
  }
}

export { InMemoryGymRepository }
