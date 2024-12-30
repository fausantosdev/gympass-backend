
import { randomUUID } from 'node:crypto'

import { CheckInRepository, CheckInType, CreateCheckInType } from '../check-in-repository'

class InMemoryCheckInRepository implements CheckInRepository {
  public checkIns: CheckInType[] = []

  async create(data: CreateCheckInType) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.userId,
      gym_id: data.gymId,
      created_at: new Date(),
      validated_at: data.validatedAt ?? null
    }

    this.checkIns.push(checkIn)

    return checkIn
  }

  async findById(id: string) {
    const checkIn = this.checkIns.find((checkIn: CheckInType) => checkIn.id === id)

    return checkIn || null
  }
}

export { InMemoryCheckInRepository }
