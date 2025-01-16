
import { randomUUID } from 'node:crypto'

import { CheckInsRepository, CheckInType, CreateCheckInType } from '../check-ins-repository'

class InMemoryCheckInRepository implements CheckInsRepository {
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

  async findByUserIdOnDate(userId: string, date: Date) {
    const checkInOnSameDate = this.checkIns.find((checkIn: CheckInType) => checkIn.user_id === userId)

    if (!checkInOnSameDate) return null

    return checkInOnSameDate
  }
}

export { InMemoryCheckInRepository }
