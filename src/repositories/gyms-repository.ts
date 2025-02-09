type GymType = {
  id: string
  user_id: string
  title: string
  description?: string
  phone?: string
  latitude: number
  longitude: number
  created_at?: Date
  updated_at?: Date
}

type CreateGymType = {
  id?: string
  user_id: string
  title: string
  description?: string
  phone?: string
  latitude: number
  longitude: number
}

interface GymsRepository {
  create(data: CreateGymType): Promise<GymType>
  findById(id: string): Promise<GymType | null>
}

export {
  GymsRepository,
  GymType,
  CreateGymType
}
