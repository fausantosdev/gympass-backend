import { GymsRepository, GymType } from '../gyms-repository'

class InMemoryGymRepository implements GymsRepository {
  public users: GymType[] = []

  async findById(id: string) {
    const user = this.users.find((user:GymType) => user.id === id)

    return user || null
  }
}

export { InMemoryGymRepository }
