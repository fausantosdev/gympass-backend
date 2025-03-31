
import { randomUUID } from 'node:crypto'

import { CheckInsRepository, CheckInType, CreateCheckInType } from '../check-ins-repository'
import dayjs from 'dayjs'

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
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.checkIns.find((checkIn: CheckInType) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) return null

    return checkInOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    return this.checkIns
      .filter((checkIn: CheckInType) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async countByUserId(userId: string) {
    return this.checkIns.filter((checkIn: CheckInType) => checkIn.user_id === userId).length
  }

  async save(checkIn: CheckInType) {
    const checkInIndex = this.checkIns.findIndex((item: CheckInType) => item.id === checkIn.id)

    if(checkInIndex >= 0) {
      this.checkIns[checkInIndex] = checkIn
    }

    return checkIn
  }
}

export { InMemoryCheckInRepository }
