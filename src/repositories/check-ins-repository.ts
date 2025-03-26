type CheckInType = {
  id: string
  created_at: Date
  validated_at: Date | null
  user_id: string
  gym_id: string
}

type CreateCheckInType = {
  userId: string
  gymId: string
  validatedAt?: Date
}

interface CheckInsRepository {
  create(data: CreateCheckInType): Promise<CheckInType>
  findById(id: string): Promise<CheckInType | null>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckInType | null>
  findManyByUserId(id: string, page: number): Promise<CheckInType[]>
  countByUserId(userId: string): Promise<number>
}

export {
  CheckInsRepository,
  CheckInType,
  CreateCheckInType
}
