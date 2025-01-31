type GymType = {
  id: string
  title: string
  description?: string
  phone?: string
  latitude: number
  longitude: number
}

type CreateGymType = {
  title: string
  description?: string
  phone?: string
  latitude: number
  longitude: number
}

interface GymsRepository {
  findById(id: string): Promise<GymType | null>
}

export {
  GymsRepository,
  GymType,
  CreateGymType
}
