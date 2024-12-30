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

interface CheckInRepository {
  create(data: CreateCheckInType): Promise<CheckInType>
  findById(id: string): Promise<CheckInType | null>
}

export {
  CheckInRepository,
  CheckInType,
  CreateCheckInType
}
